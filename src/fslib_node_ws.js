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

const {Utils} = require("./utils");

const WS_COMMAND = {
    PING: "ping",
    RESPONSE: "response"
};

// each browser context belongs to a single socket group. So multiple websocket connections can be pooled
// to increase throughput. Note that socketGroupID will be different for each web workers/threads in the window as
// they are separate contexts.
const socketGroupID = Math.floor(Math.random() * 4294967296);
let commandIdCounter = 0;

function _getCommand(command, data) {
    return {
        commandCode: command,
        commandId: commandIdCounter ++,
        socketGroupID,
        data
    };
}

function testNodeWsEndpoint(wsEndPoint, echoData, echoBuffer) {
    return new Promise((resolve, reject)=>{
        const ws = new WebSocket(wsEndPoint);
        ws.binaryType = 'arraybuffer';
        let commandSent;
        ws.addEventListener("open", () =>{
            console.log("testNodeWsPort: Ws connected");
            commandSent = _getCommand(WS_COMMAND.PING, echoData);
            ws.send(Utils.mergeMetadataAndArrayBuffer(commandSent, echoBuffer));
        });

        ws.addEventListener('message', function (event) {
            console.log("testNodeWsPort: received ws data", event.data);
            const {metadata, bufferData} = Utils.splitMetadataAndBuffer(event.data);
            console.log("testNodeWsPort: received ws data", metadata, bufferData);
            ws.close();
            if(metadata.commandCode !== WS_COMMAND.RESPONSE){
                reject(`Expected commandCode ${metadata.commandCode} to be ${WS_COMMAND.RESPONSE}`);
            } else if(metadata.commandId !== commandSent.commandId){
                reject(`Mismatched commandId ${metadata.commandId} to be ${commandSent.commandId}`);
            } else if(metadata.socketGroupID !== commandSent.socketGroupID){
                reject(`Mismatched socketGroupID ${metadata.socketGroupID} to be ${commandSent.socketGroupID}`);
            } else {
                resolve({echoData: metadata.data, echoBuffer: bufferData});
            }
        });

        ws.addEventListener('error', function (event) {
            console.error(event);
            reject("Websocket error");
            ws.close();
        });
    });
}

const NodeTauriFS = {
    testNodeWsEndpoint
};

module.exports = {
    NodeTauriFS: NodeTauriFS
};
