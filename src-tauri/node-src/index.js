const readline = require('readline');
const http = require('http');
const WebSocket = require('ws');
const net = require('net');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let serverPortResolve;
const serverPortPromise = new Promise((resolve) => {serverPortResolve = resolve;});

let orphanExitTimer = setTimeout(()=>{
    process.exit(1);
}, 60000);
async function processCommand(line) {
    try{
        let jsonCmd = JSON.parse(line);
        switch (jsonCmd.commandCode) {
        case "terminate": process.exit(0); return;
        case "heartBeat":
            clearTimeout(orphanExitTimer);
            orphanExitTimer = setTimeout(()=>{
                process.exit(1);
            }, 60000);
            return;
        case "ping": console.log(JSON.stringify({message: "pong", commandId: jsonCmd.commandId}) + "\n"); return;
        case "getPort": console.log(JSON.stringify({message: {port: await serverPortPromise}, commandId: jsonCmd.commandId}) + "\n"); return;
        default: console.error("unknown command: "+ line);
        }
    } catch (e) {
        console.error(e);
    }
}

rl.on('line', (line) => {
    processCommand(line);
});

/**
 *
 * @param metadata {Object} Max size can be 4GB
 * @param bufferData {ArrayBuffer} [optional]
 * @return {ArrayBuffer}
 * @private
 */
function mergeMetadataAndArrayBuffer(metadata, bufferData = new ArrayBuffer(0)) {
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
    RESPONSE: "response"
};

function _getResponse(originalCommand, data = null) {
    return {
        commandCode: WS_COMMAND.RESPONSE,
        commandId: originalCommand.commandId,
        socketGroupID: originalCommand.socketGroupID,
        data
    }
}

function processWSCommand(ws, metadata, dataBuffer) {
    try{
        switch (metadata.commandCode) {
        case WS_COMMAND.PING: ws.send(mergeMetadataAndArrayBuffer(_getResponse(metadata, metadata.data), dataBuffer)); return;
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

function getFreePort() {
    return new Promise((resolve)=>{
        const server = net.createServer();

        server.listen(0, () => {
            const port = server.address().port;
            server.close(() => {
                resolve(port);
            });
        });
    });
}

// Create an HTTP server
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('WebSocket server running');
});


// Create a WebSocket server by passing the HTTP server instance to WebSocket.Server
const wss = new WebSocket.Server({
    server,
    maxPayload: 2048 * 1024 * 1024 // 2GB Max message payload size
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
        console.log('Websocket Client disconnected');
    });
});

getFreePort().then((port) => {
    serverPortResolve(port);
    console.log('Server Opened on port: ', port);

    // Start the HTTP server on port 3000
    server.listen(port, () => {
        console.log('Server running on http://localhost:3000');
    });

});
