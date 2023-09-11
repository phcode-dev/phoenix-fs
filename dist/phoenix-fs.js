const WebSocket = require('ws');

/**
 *
 * @param metadata {Object} Max size can be 4GB
 * @param bufferData {ArrayBuffer} [optional]
 * @return {ArrayBuffer}
 * @private
 */
function mergeMetadataAndArrayBuffer(metadata, bufferData) {
    bufferData = bufferData || new ArrayBuffer(0);
    if (typeof metadata !== 'object') {
        throw new Error("metadata should be an object, but was " + typeof metadata);
    }
    if (!(bufferData instanceof ArrayBuffer)) {
        throw new Error("Expected bufferData to be an instance of ArrayBuffer, but was " + typeof bufferData);
    }

    const metadataString = JSON.stringify(metadata);
    const metadataUint8Array = new TextEncoder().encode(metadataString);
    const metadataBuffer = metadataUint8Array.buffer;
    const sizePrefixLength = 4; // 4 bytes for a 32-bit integer

    if (metadataBuffer.byteLength > 4294000000) {
        throw new Error("metadata too large. Should be below 4,294MB, but was " + metadataBuffer.byteLength);
    }

    const concatenatedBuffer = new ArrayBuffer(sizePrefixLength + metadataBuffer.byteLength + bufferData.byteLength);
    const concatenatedUint8Array = new Uint8Array(concatenatedBuffer);

    // Write the length of metadataBuffer as a 32-bit integer
    new DataView(concatenatedBuffer).setUint32(0, metadataBuffer.byteLength, true);

    // Copy the metadataUint8Array and bufferData (if provided) to the concatenatedUint8Array
    concatenatedUint8Array.set(metadataUint8Array, sizePrefixLength);
    if (bufferData.byteLength > 0) {
        concatenatedUint8Array.set(new Uint8Array(bufferData), sizePrefixLength + metadataBuffer.byteLength);
    }

    return concatenatedBuffer;
}

function splitMetadataAndBuffer(concatenatedBuffer) {
    if(!(concatenatedBuffer instanceof ArrayBuffer)){
        throw new Error("Expected ArrayBuffer message from websocket");
    }
    const sizePrefixLength = 4;
    const buffer1Length = new DataView(concatenatedBuffer).getUint32(0, true); // Little endian

    const buffer1 = concatenatedBuffer.slice(sizePrefixLength, sizePrefixLength + buffer1Length);
    let buffer2;
    if (concatenatedBuffer.byteLength > sizePrefixLength + buffer1Length) {
        buffer2 = concatenatedBuffer.slice(sizePrefixLength + buffer1Length);
    }

    return {
        metadata: JSON.parse(new TextDecoder().decode(buffer1)),
        bufferData: buffer2
    };
}


const WS_COMMAND = {
    PING: "ping",
    RESPONSE: "response",
    LARGE_DATA_SOCKET_ANNOUNCE: "largeDataSock"
};

const LARGE_DATA_THRESHOLD = 2*1024*1024; // 2MB
// A map from dataSocketID to the actual data socket that is used for transporting large data only.
// binary data larger than 2MB is considered large data and we will try to send it through a large data web socket if present.
// a client typically makes 2 websockets, one for small data and another for large data transport.
// so large file transfers wont put pressure on the websocket.
const largeDataSocketMap = {};

function _getResponse(originalMetadata, data = null) {
    return {
        commandCode: WS_COMMAND.RESPONSE,
        commandId: originalMetadata.commandId,
        socketGroupID: originalMetadata.socketGroupID,
        data
    }
}

/**
 *
 * @param ws
 * @param metadata
 * @param dataObjectToSend
 * @param dataBuffer {ArrayBuffer}
 * @private
 */
function _sendResponse(ws, metadata, dataObjectToSend = null, dataBuffer = new ArrayBuffer(0)) {
    const response = _getResponse(metadata, dataObjectToSend);
    let socketToUse = ws, largeDataSocket = largeDataSocketMap[metadata.socketGroupID];
    if(dataBuffer && dataBuffer.byteLength > LARGE_DATA_THRESHOLD && largeDataSocket) {
        socketToUse = largeDataSocket;
    }
    socketToUse.send(mergeMetadataAndArrayBuffer(response, dataBuffer));
}

function processWSCommand(ws, metadata, dataBuffer) {
    try{
        switch (metadata.commandCode) {
        case WS_COMMAND.PING: _sendResponse(ws, metadata, metadata.data, dataBuffer); return;
        case WS_COMMAND.LARGE_DATA_SOCKET_ANNOUNCE:
            ws.isLargeData = true;
            ws.LargeDataSocketGroupID = metadata.socketGroupID;
            largeDataSocketMap[metadata.socketGroupID] = ws;
            _sendResponse(ws, metadata, {}, dataBuffer); return;
        default: console.error("unknown command: "+ metadata);
        }
    } catch (e) {
        console.error(e);
    }
}

function processWebSocketMessage(ws, message) {
    const {metadata, bufferData} = splitMetadataAndBuffer(message);
    processWSCommand(ws, metadata, bufferData);
}

function CreatePhoenixFsServer(server, wssPath = "/phoenixFS") {
    // Create a WebSocket server by passing the HTTP server instance to WebSocket.Server
    const wss = new WebSocket.Server({
        noServer: true,
        perMessageDeflate: false, // dont compress to improve performance and since we are on localhost.
        maxPayload: 2048 * 1024 * 1024 // 2GB Max message payload size
    });

    server.on('upgrade', (request, socket, head) => {
        const pathname = new URL(request.url, `http://${request.headers.host}`).pathname;
        if (pathname === wssPath) {
            wss.handleUpgrade(request, socket, head, (ws) => {
                wss.emit('connection', ws, request);
            });
        } else {
            // Not handling the upgrade here. Let the next listener deal with it.
        }
    });

    // Set up a connection listener
    wss.on('connection', (ws) => {
        console.log('Websocket Client connected');
        ws.binaryType = 'arraybuffer';

        // Listen for messages from the client
        ws.on('message', (message) => {
            console.log(`Received message ${message} of size: ${message.byteLength}, type: ${typeof message}, isArrayBuffer: ${message instanceof ArrayBuffer}, isBuffer: ${Buffer.isBuffer(message)}`);
            processWebSocketMessage(ws, message);
        });

        ws.on('error', console.error);

        // Handle disconnection
        ws.on('close', () => {
            if(ws.isLargeData && ws.socketGroupID && largeDataSocketMap[ws.socketGroupID] === ws){
                delete largeDataSocketMap[ws.socketGroupID];
            }
            console.log('Websocket Client disconnected');
        });
    });
}

exports.CreatePhoenixFsServer = CreatePhoenixFsServer;
