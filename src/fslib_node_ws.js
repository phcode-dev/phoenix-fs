/*
 * GNU AGPL-3.0 License
 *
 * Copyright (c) 2021 - present core.ai . All rights reserved.
 *
 * This program is free software: you can redistribute it and/or modify it under
 * the terms of the GNU Affero General Public License as published by the Free
 * Software Foundation, either version 3 of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY;
 * without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.
 * See the GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License along
 * with this program. If not, see https://opensource.org/licenses/AGPL-3.0.
 *
 */

// jshint ignore: start
/*global */
/*eslint no-console: 0*/
/*eslint strict: ["error", "global"]*/

const {Errors} = require("./errno");
const {Utils} = require("./utils");

const WS_COMMAND = {
    PING: "ping",
    RESPONSE: "response",
    LARGE_DATA_SOCKET_ANNOUNCE: "largeDataSock"
};

// each browser context belongs to a single socket group. So multiple websocket connections can be pooled
// to increase throughput. Note that socketGroupID will be different for each web workers/threads in the window as
// they are separate contexts.
const socketGroupID = Math.floor(Math.random() * 4294967296);
let commandIdCounter = 0;
let wssEndpoint, controlSocket, dataSocket;
const SOCKET_TYPE_DATA = "data",
    SOCKET_TYPE_CONTROL = "control";
const LARGE_DATA_THRESHOLD = 2*1024*1024; // 2MB
const MAX_RECONNECT_BACKOFF_TIME_MS = 1000;

function _getCommand(command, data) {
    return {
        commandCode: command,
        commandId: commandIdCounter ++,
        socketGroupID,
        data
    };
}

function _silentlyCloseSocket(socket) {
    if(!socket) {
        return;
    }
    try{
        socket.autoReconnect = false;
        socket.close();
    } catch (e) {
        console.error(e);
    }
}

function _isSocketOpen(socket) {
    return socket && socket.readyState === WebSocket.OPEN;
}

const _pendingCommandQueue = [],
    commandIdMap = {};

function _execCommandInternal(command, commandData, binaryData, resolve, reject) {
    let socketToUse = _isSocketOpen(controlSocket)? controlSocket : dataSocket;
    if(binaryData && binaryData.byteLength > LARGE_DATA_THRESHOLD && _isSocketOpen(dataSocket)) {
        socketToUse = dataSocket;
    }
    const commandToSend = _getCommand(command, commandData);
    commandIdMap[commandToSend.commandId] = {resolve, reject};
    socketToUse.send(Utils.mergeMetadataAndArrayBuffer(commandToSend, binaryData));
}

/**
 *
 * @param command {string}
 * @param commandData {Object}
 * @param binaryData {ArrayBuffer}
 */
function _execCommand(command, commandData, binaryData) {
    return new Promise((resolve, reject)=>{
        if(!_isSocketOpen(controlSocket) && !_isSocketOpen(dataSocket)) {
            _pendingCommandQueue.push({command, commandData, binaryData, resolve, reject});
            return;
        }
        _execCommandInternal(command, commandData, binaryData, resolve, reject);
    });
}

function _execPendingCommands() {
    if(!_isSocketOpen(controlSocket) && !_isSocketOpen(dataSocket)) {
        return;
    }
    let cmd = _pendingCommandQueue.pop();
    while (cmd) {
        _execCommandInternal(cmd.command, cmd.commandData, cmd.binaryData, cmd.resolve, cmd.reject);
        cmd = _pendingCommandQueue.pop();
    }
}

function _processMessage(data) {
    const {metadata, bufferData} = Utils.splitMetadataAndBuffer(data);
    if(!metadata.commandId || !commandIdMap[metadata.commandId]){
        throw new Error("CommandID not found in ws response! " + JSON.parse(metadata));
    }
    const {resolve, reject} = commandIdMap[metadata.commandId];
    if(metadata.error){
        reject(metadata.error);
    } else {
        resolve({metadata, bufferData});
    }
    delete commandIdMap[metadata.commandId];
}

function _wait(timeMS) {
    return new Promise((resolve)=>{
        setTimeout(resolve, timeMS);
    });
}

async function _establishAndMaintainConnection(socketType, firstConnectCB) {
    let ws = new WebSocket(wssEndpoint);
    ws.binaryType = 'arraybuffer';
    ws.autoReconnect = true;
    const resolved = false;
    while(ws.autoReconnect) {
        let wsClosePromiseResolve;
        const wsClosePromise = new Promise((resolve) => {wsClosePromiseResolve = resolve;});
        if(socketType === SOCKET_TYPE_CONTROL) {
            controlSocket = ws;
        } else {
            ws.isLargeDataWS = true;
            dataSocket = ws;
        }
        ws.addEventListener("open", () =>{
            ws.backoffTime = 0;
            if(!resolved) {
                firstConnectCB();
            }
            if(ws.isLargeDataWS){
                _execCommand(WS_COMMAND.LARGE_DATA_SOCKET_ANNOUNCE)
                    .catch(console.error);
            }
            _execPendingCommands();
        });

        ws.addEventListener('message', function (event) {
            _processMessage(event.data);
        });

        ws.addEventListener('error', function (event) {
            console.error(event);
        });

        ws.addEventListener('close', function () {
            wsClosePromiseResolve();
        });
        await wsClosePromise;
        ws.backoffTime = Math.min(ws.backoffTime * 2, MAX_RECONNECT_BACKOFF_TIME_MS) || 1;
        await _wait(ws.backoffTime);
        if(ws.autoReconnect) {
            ws = new WebSocket(wssEndpoint);
            ws.binaryType = 'arraybuffer';
            ws.autoReconnect = true;
        }
    }
}

/**
 * Sets the websocket endpoint and returns a promise that resolves when the tauri node fs is open. It keeps the socket
 * open across failures and auto-reconnects as needed.
 * @param websocketEndpoint
 * @return {Promise<void>}
 */
async function setNodeWSEndpoint(websocketEndpoint) {
    return new Promise((resolve, reject)=>{
        if(websocketEndpoint === wssEndpoint) {
            reject(new Errors.EEXIST("A connection on the same websocket address is in progress: ", websocketEndpoint));
        }
        _silentlyCloseSocket(controlSocket);
        controlSocket = null;
        _silentlyCloseSocket(dataSocket);
        dataSocket = null;
        wssEndpoint = websocketEndpoint;
        let resolved = false;
        function firstConnectCB() {
            if(!resolved){
                resolve();
                resolved = true;
            }
        }
        _establishAndMaintainConnection(SOCKET_TYPE_CONTROL, firstConnectCB);
        _establishAndMaintainConnection(SOCKET_TYPE_DATA, firstConnectCB);
    });
}

function testNodeWsEndpoint(wsEndPoint, echoData, echoBuffer) {
    return new Promise((resolve, reject)=>{
        const ws = new WebSocket(wsEndPoint);
        ws.binaryType = 'arraybuffer';
        let commandSent, opened = false;
        ws.addEventListener("open", () =>{
            console.log("testNodeWsPort: Ws connected");
            opened = true;
            commandSent = _getCommand(WS_COMMAND.PING, echoData);
            commandSent.socketGroupID = Math.floor(Math.random() * 4294967296); // use different for tests
            ws.send(Utils.mergeMetadataAndArrayBuffer(commandSent, echoBuffer));
        });

        ws.addEventListener('message', function (event) {
            console.log("testNodeWsPort: received ws data", event.data);
            const {metadata, bufferData} = Utils.splitMetadataAndBuffer(event.data);
            console.log("testNodeWsPort: received ws data", metadata, bufferData);
            ws.close();
            if(metadata.commandCode !== WS_COMMAND.RESPONSE){
                reject(new Errors.EIO(`Expected commandCode ${metadata.commandCode} to be ${WS_COMMAND.RESPONSE}`, wsEndPoint));
            } else if(metadata.commandId !== commandSent.commandId){
                reject(new Errors.EIO(`Mismatched commandId ${metadata.commandId} to be ${commandSent.commandId}`, wsEndPoint));
            } else if(metadata.socketGroupID !== commandSent.socketGroupID){
                reject(new Errors.EIO(`Mismatched socketGroupID ${metadata.socketGroupID} to be ${commandSent.socketGroupID}`, wsEndPoint));
            } else {
                resolve({echoData: metadata.data, echoBuffer: bufferData});
            }
        });

        ws.addEventListener('error', function (event) {
            console.error(event);
            reject(new Errors.EIO("Websocket error", wsEndPoint));
            ws.close();
        });

        ws.addEventListener('close', function(event) {
            console.log('WebSocket connection closed:', event.code, event.reason);
            if(!opened){
                reject(new Errors.EIO("Socket not opened: "+ event.reason, wsEndPoint));
            }
        });
    });
}

const NodeTauriFS = {
    testNodeWsEndpoint,
    setNodeWSEndpoint
};

module.exports = {
    NodeTauriFS: NodeTauriFS
};
