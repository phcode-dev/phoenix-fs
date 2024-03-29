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

const EventEmitter = require('events');
const {Errors} = require("./errno");
const {Utils} = require("./utils");
const {Constants} = require("./constants");

const IS_WINDOWS = navigator.userAgent.includes('Windows');

const WS_COMMAND = {
    PING: "ping",
    RESPONSE: "response",
    EVENT: "event",
    LARGE_DATA_SOCKET_ANNOUNCE: "largeDataSock",
    CONTROL_SOCKET_ANNOUNCE: "controlSock",
    GET_WINDOWS_DRIVES: "getWinDrives",
    READ_DIR: "readDir",
    STAT: "stat",
    READ_BIN_FILE: "readBinFile",
    WRITE_BIN_FILE: "writeBinFile",
    MKDIR: "mkdir",
    RENAME: "rename",
    COPY: "copy",
    UNLINK: "unlink",
    WATCH: "watch",
    UNWATCH: "unwatch"
};

// each browser context belongs to a single socket group. So multiple websocket connections can be pooled
// to increase throughput. Note that socketGroupID will be different for each web workers/threads in the window as
// they are separate contexts.
const socketGroupID = Math.floor(Math.random() * 4294967296);
let commandIdCounter = 1; // should be greater than 0!
let wssEndpoint, controlSocket, dataSocket;
const SOCKET_TYPE_DATA = "data",
    SOCKET_TYPE_CONTROL = "control";
const LARGE_DATA_THRESHOLD = 2*1024*1024; // 2MB
const MAX_RECONNECT_BACKOFF_TIME_MS = 1000;

function mapNodeTauriErrorMessage(nodeError, path, userMessage= '') {
    let error;
    switch (nodeError.code) {
    case 'ENOENT': error = new Errors.ENOENT(userMessage + ` No such File or Directory: ${path} ` + nodeError.message, path); break;
    case 'EEXIST': error =  new Errors.EEXIST(userMessage + ` File exists: ${path} ` + nodeError.message, path);  break;
    case 'ENOTEMPTY': error =  new Errors.ENOTEMPTY(userMessage + ` Directory not empty: ${path} ` + nodeError.message, path);  break;
    case 'ENOTDIR': error =  new Errors.ENOTDIR(userMessage + ` Not a Directory: ${path} ` + nodeError.message, path);  break;
    case 'EACCES': error =  new Errors.EACCES(userMessage + ` Permission denied: ${path} ` + nodeError.message, path);  break;
    case 'EISDIR': error =  new Errors.EISDIR(userMessage + ` Is a directory: ${path} ` + nodeError.message, path);  break;
    case 'EBADF': error =  new Errors.EBADF(userMessage + ` Bad file number: ${path} ` + nodeError.message, path);  break;
    case 'EROFS': error =  new Errors.EROFS(userMessage + ` Read-only file system: ${path} ` + nodeError.message, path);  break;
    case 'ENOSPC': error =  new Errors.ENOSPC(userMessage + ` No space left on device: ${path} ` + nodeError.message, path);  break;
    case 'EBUSY': error =  new Errors.EBUSY(userMessage + ` Device or resource busy: ${path} ` + nodeError.message, path);  break;
    case 'EINVAL': error =  new Errors.EINVAL(userMessage + ` Invalid argument: ${path} ` + nodeError.message, path);  break;
    }
    if(!error && Errors[nodeError.code]) {
        error =  new Errors[nodeError.code](userMessage + ` Error for: ${path} ` + nodeError.message, path);
    } else if(!error) {
        error = new Errors.EIO(userMessage + ` IO error on path: ${path} ` + nodeError.message + "\nNode Error stack: " + nodeError.nodeStack, path);
    }
    error.nodeStack = nodeError.nodeStack;
    return error;
}


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
        console.error("PhoenixFS: ", e);
    }
}

function _isSocketOpen(socket) {
    return socket && socket.readyState === WebSocket.OPEN;
}

let isNodeWsConnected = false;

/**
 * Returns true if the node websocket connection is established and ready to take requests.
 * @returns {boolean}
 */
function isNodeWSReady() {
    return isNodeWsConnected;
}

function updateConnectionState() {
    isNodeWsConnected = _isSocketOpen(controlSocket) || _isSocketOpen(dataSocket);
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
 * @returns {Promise<{metadata: Object, bufferData: ArrayBuffer}>} A promise that resolves with an object containing `metadata` and `bufferData` or rejects with error.
 */
function _execCommand(command, commandData = null, binaryData = undefined) {
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

const _eventEmitter = {};

/**
 * you can only use this to listen to events emitter from node. Calling the emit function on the returned emitter
 * will not dispatch any events to node, but only within the browser context.
 * @param eventEmitterID - this is supplied in from node, typically from an exec metadata containing the id.
 * @returns {EventEmitter}
 * @private
 */
function getNodeEventListener(eventEmitterID) {
    if(!eventEmitterID){
        throw new Errors.EIO(`No such node event emitter, ${eventEmitterID}`);
    }
    if(_eventEmitter[eventEmitterID]){
        return _eventEmitter[eventEmitterID];
    }
    _eventEmitter[eventEmitterID] = new EventEmitter();
    _eventEmitter[eventEmitterID].eventEmitterID = eventEmitterID;
    return _eventEmitter[eventEmitterID];
}

function removeNodeEventListener(eventEmitter) {
    if(eventEmitter.allreadyClosed) {
        return ;
    }
    eventEmitter.removeAllListeners();
    eventEmitter.on = function () {
        throw new Errors.EIO("The File watcher is closed. Please use `fs.watchAsync` if you want to watch again.");
    };
    eventEmitter.allreadyClosed = true;

    const eventEmitterID = eventEmitter.eventEmitterID;
    if(!eventEmitterID){
        throw new Errors.EIO(`No such node event emitter, ${eventEmitterID}`);
    }
    if(_eventEmitter[eventEmitterID]){
        delete _eventEmitter[eventEmitterID];
    }
}

function _processEvent(metadata, bufferData) {
    const eventEmitter = _eventEmitter[metadata.eventEmitterID];
    if(eventEmitter){
        if(metadata.data.path){
            metadata.data.path = Utils.getTauriVirtualPath(metadata.data.path);
        }
        eventEmitter.emit(metadata.eventName, metadata.data, bufferData);
    } else {
        console.error("PhoenixFS: Received stray event: ", metadata);
    }
}

function _processMessage(data) {
    const {metadata, bufferData} = Utils.splitMetadataAndBuffer(data);
    if(metadata.eventEmitterID) {
        _processEvent(metadata, bufferData);
        return;
    }
    if(!metadata.commandId || !commandIdMap[metadata.commandId]){
        throw new Error("CommandID not found in ws response! " + metadata);
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
                    .catch(err=> console.error("PhoenixFS: ", err));
            } else {
                _execCommand(WS_COMMAND.CONTROL_SOCKET_ANNOUNCE)
                    .catch(err=> console.error("PhoenixFS: ", err));
            }
            _execPendingCommands();
            updateConnectionState();
        });

        ws.addEventListener('message', function (event) {
            _processMessage(event.data);
        });

        ws.addEventListener('error', function (event) {
            console.error("PhoenixFS websocket error event: ", event);
        });

        ws.addEventListener('close', function () {
            wsClosePromiseResolve();
            updateConnectionState();
        });
        await wsClosePromise;
        const backoffTime = Math.min(ws.backoffTime * 2, MAX_RECONNECT_BACKOFF_TIME_MS) || 1;
        ws.backoffTime = backoffTime;
        await _wait(backoffTime);
        if(ws.autoReconnect) {
            ws = new WebSocket(wssEndpoint);
            ws.backoffTime = backoffTime;
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

function stopNodeWSEndpoint() {
    _silentlyCloseSocket(controlSocket);
    controlSocket = null;
    _silentlyCloseSocket(dataSocket);
    dataSocket = null;
    wssEndpoint = null;
}

function getNodeWSEndpoint() {
    return wssEndpoint;
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
            console.error("testNodeWsPort: ", event);
            reject(new Errors.EIO("Websocket error", wsEndPoint));
            ws.close();
        });

        ws.addEventListener('close', function(event) {
            console.log('PhoenixFS: WebSocket connection closed:', event.code, event.reason);
            if(!opened){
                reject(new Errors.EIO("Socket not opened: "+ event.reason, wsEndPoint));
            }
        });
    });
}

function _readDirWindowsDrives(path, options, callback) {
    _execCommand(WS_COMMAND.GET_WINDOWS_DRIVES)
        .then(({metadata})=>{
            const drives = metadata.data.drives;
            if(!options.withFileTypes) {
                callback(null, drives);
                return;
            }
            let entries = [];
            for(let drive of drives) {
                entries.push(Utils.createDummyStatObject(`${path}/${drive}`, true, Constants.TAURI_WS_DEVICE_NAME));
            }
            callback(null, entries);
        })
        .catch((err)=>{
            callback(mapNodeTauriErrorMessage(err, path, 'Failed to get drives: '));
        });
}

function readdir(path, options, callback) {
    if(IS_WINDOWS && path === Constants.TAURI_ROOT){
        _readDirWindowsDrives(path, options, callback);
        return;
    }
    let platformPath = Utils.getTauriPlatformPath(path);
    _execCommand(WS_COMMAND.READ_DIR, {path: platformPath, options})
        .then(({metadata})=>{
            if(metadata.data.contents){
                callback(null, metadata.data.contents);
            } else if(metadata.data.contentStats){
                let stats = [];
                for(let contentStat of metadata.data.contentStats) {
                    stats.push(Utils.createFromNodeStat(`${path}/${contentStat.name}`,contentStat));
                }
                callback(null, stats);
            } else {
                callback(new Errors.EIO("Failed readdir as node ws connector returned empty", path));
            }
        })
        .catch((err)=>{
            callback(mapNodeTauriErrorMessage(err, path, 'Failed to read directory: '));
        });
}

function stat(path, callback) {
    let platformPath = Utils.getTauriPlatformPath(path);
    _execCommand(WS_COMMAND.STAT, {path: platformPath})
        .then(({metadata})=>{
            callback(null, Utils.createFromNodeStat(`${path}/${metadata.data.stat.name}`,metadata.data.stat));
        })
        .catch((err)=>{
            callback(mapNodeTauriErrorMessage(err, path, 'Failed to get stat: '));
        });
}

function readBinaryFile(path) {
    return new Promise((resolve, reject)=>{
        const platformPath = Utils.getTauriPlatformPath(path);
        _execCommand(WS_COMMAND.READ_BIN_FILE, {path: platformPath})
            .then(({bufferData})=>{
                resolve(bufferData);
            })
            .catch((err)=>{
                reject(mapNodeTauriErrorMessage(err, path, 'Failed to read file: '));
            });
    });
}

function writeBinaryFile(path, mode, flag, dataArrayBuffer) {
    return new Promise((resolve, reject)=>{
        const platformPath = Utils.getTauriPlatformPath(path);
        _execCommand(WS_COMMAND.WRITE_BIN_FILE, {path: platformPath, mode, flag}, dataArrayBuffer)
            .then(()=>{resolve();})
            .catch((err)=>{
                reject(mapNodeTauriErrorMessage(err, path, 'Failed to write file: '));
            });
    });
}

function mkdirs(path, mode, recursive, callback) {
    const platformPath = Utils.getTauriPlatformPath(path);
    _execCommand(WS_COMMAND.MKDIR, {path: platformPath, mode, recursive})
        .then(()=>{
            callback(null);
        })
        .catch((err)=>{
            callback(mapNodeTauriErrorMessage(err, path, 'Failed to mkdir: '));
        });
}

function rename(oldPath, newPath, callback) {
    const oldPlatformPath = Utils.getTauriPlatformPath(oldPath);
    const newPlatformPath = Utils.getTauriPlatformPath(newPath);
    _execCommand(WS_COMMAND.RENAME, {oldPath: oldPlatformPath, newPath: newPlatformPath})
        .then(()=>{
            callback(null);
        })
        .catch((err)=>{
            callback(mapNodeTauriErrorMessage(err, oldPath, `Failed to rename: ${oldPath} to ${newPath}`));
        });
}

function unlink(path, callback) {
    const platformPath = Utils.getTauriPlatformPath(path);
    _execCommand(WS_COMMAND.UNLINK, {path: platformPath})
        .then(()=>{
            callback(null);
        })
        .catch((err)=>{
            callback(mapNodeTauriErrorMessage(err, path, 'Failed to unlink: '));
        });
}

/**
 *
 * @param {string} path
 * @param {string|Array<string>} gitIgnorePaths The contents of the gitIgnore file as text. The watcher will ignore all files matching git ignore.
 * @returns {Promise<EventEmitter>} That will be resolved with a watcher once the watcher is ready.
 */
async function watchAsync(path, gitIgnorePaths="") {
    return new Promise((resolve, reject)=>{
        const platformPath = Utils.getTauriPlatformPath(path);
        _execCommand(WS_COMMAND.WATCH, {path: platformPath, gitIgnorePaths})
            .then(({metadata})=>{
                const eventEmitter = getNodeEventListener(metadata.data.eventEmitterID);
                eventEmitter.watchPath = path;
                resolve(eventEmitter);
            })
            .catch((err)=>{
                reject(mapNodeTauriErrorMessage(err, path, `Failed to watch path: ${path}`));
            });
    });
}

/**
 * Stops the fs watcher given the EventEmitter returned by watchAsync API.
 * @param eventEmitter
 * @returns {Promise<void>} That will be resolved with a watcher stops. The event emitter will no longer work after this call.
 */
function unwatchAsync(eventEmitter) {
    return new Promise((resolve, reject)=>{
        _execCommand(WS_COMMAND.UNWATCH, {eventEmitterID: eventEmitter.eventEmitterID})
            .then(()=>{
                removeNodeEventListener(eventEmitter);
                resolve();
            })
            .catch((err)=>{
                reject(mapNodeTauriErrorMessage(err, eventEmitter.watchPath, `Failed to unwatch path: ${eventEmitter.watchPath}`));
            });
    });
}

async function copy(src, dst, callback) {
    const srcPlatformPath = Utils.getTauriPlatformPath(src);
    const dstPlatformPath = Utils.getTauriPlatformPath(dst);
    _execCommand(WS_COMMAND.COPY, {src: srcPlatformPath, dst: dstPlatformPath})
        .then(({metadata})=>{
            callback(null, Utils.getTauriVirtualPath(metadata.data.copiedPath));
        })
        .catch((err)=>{
            callback(mapNodeTauriErrorMessage(err, src, `Failed to copy: ${src} to ${dst}`));
        });
}


const NodeTauriFS = {
    testNodeWsEndpoint,
    setNodeWSEndpoint,
    stopNodeWSEndpoint,
    getNodeWSEndpoint,
    isNodeWSReady,
    readdir,
    mkdirs,
    stat,
    readBinaryFile,
    writeBinaryFile,
    rename,
    unlink,
    watchAsync,
    unwatchAsync,
    copy
};

module.exports = {
    NodeTauriFS: NodeTauriFS
};
