const WebSocket = require('ws');
const fs = require("fs/promises");
const path = require("path");
const os = require('os');
const { exec } = require('child_process');
const chokidar = require('chokidar');
const anymatch = require('anymatch');
const ignore = require('ignore');
const crypto = require('crypto');

const IS_MACOS = os.platform() === 'darwin';
let debugMode = false;

/**
 * Converts a buffer to an `ArrayBuffer`.
 *
 * @param {Buffer} buf The buffer to convert
 * @return {ArrayBuffer} Converted buffer
 * @public
 */
function toArrayBuffer(buf) {
    if (buf.length === buf.buffer.byteLength) {
        return buf.buffer;
    }

    return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.length);
}

function generateRandomId(length = 20) {
    return crypto.randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length);
}

function getWindowsDrives(callback) {
    exec('wmic logicaldisk get name', (error, stdout) => {
        if (error) {
            callback(error, null);
            return;
        }

        // Parse the result
        const drives = stdout.split('\n')
            .filter(value => /^[A-Z]:/.test(value.trim()))
            .map(value => value.trim()[0]);

        callback(null, drives);
    });
}

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
    UNLINK: "unlink",
    WATCH: "watch",
    UNWATCH: "unwatch"
};

const LARGE_DATA_THRESHOLD = 2*1024*1024; // 2MB
// A map from socketGroupID to the actual data socket that is used for transporting large data only.
// binary data larger than 2MB is considered large data and we will try to send it through a large data web socket if present.
// a client typically makes 2 websockets, one for small data and another for large data transport.
// so large file transfers wont put pressure on the websocket.
const largeDataSocketMap = {},
    controlSocketMap = {};

function _getResponse(originalMetadata, data = null) {
    return {
        originalCommand: originalMetadata.commandCode,
        commandCode: WS_COMMAND.RESPONSE,
        commandId: originalMetadata.commandId,
        socketGroupID: originalMetadata.socketGroupID,
        error: originalMetadata.error,
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

function _sendEvent(defaultWS, socketGroupID, eventEmitterID, eventName, dataObjectToSend = null, dataBuffer = new ArrayBuffer(0)) {
    const response = {
        eventEmitterID,
        eventName,
        commandCode: WS_COMMAND.EVENT,
        socketGroupID,
        data: dataObjectToSend
    };
    let socketToUse = controlSocketMap[socketGroupID], largeDataSocket = largeDataSocketMap[socketGroupID];
    if(dataBuffer && dataBuffer.byteLength > LARGE_DATA_THRESHOLD && largeDataSocket) {
        socketToUse = largeDataSocket;
    }
    if(!socketToUse){
        socketToUse = defaultWS;
    }
    socketToUse.send(mergeMetadataAndArrayBuffer(response, dataBuffer));
}

function _getStat(fullPath) {
    return new Promise((resolve, reject) => {
        fs.stat(fullPath)
            .then((stat)=>{
                const isOwnerReadOnly = (stat.mode & fs.constants.S_IWUSR) === 0;
                resolve({
                    dev: stat.dev,
                    isFile: stat.isFile(),
                    isDirectory: stat.isDirectory(),
                    isSymbolicLink: stat.isSymbolicLink(),
                    size: stat.size,
                    nlink: stat.nlink,
                    // Unix timestamp MS Numbers
                    atimeMs: stat.atimeMs,
                    mtimeMs: stat.mtimeMs,
                    ctimeMs: stat.ctimeMs,
                    mode: stat.mode,
                    readonly: isOwnerReadOnly,
                    name: path.basename(fullPath)
                });
            })
            .catch(reject);
    });
}

function _reportError(ws, metadata, err= { }, defaultMessage = "Operation failed! ") {
    metadata.error = {
        message: err.message || defaultMessage,
        code: err.code || "EIO",
        nodeStack: err.stack
    };
    _sendResponse(ws, metadata);
}

function _readDir(ws, metadata) {
    const fullPath = metadata.data.path,
        options = metadata.data.options || {};
    const withFileTypes = options.withFileTypes;
    options.withFileTypes = null;

    fs.readdir(fullPath, options)
        .then(contents=>{
            if(withFileTypes){
                let statPromises = [];
                for(let name of contents) {
                    const contentPath = path.join(fullPath, name);
                    if(!IS_MACOS || (IS_MACOS && contentPath !== '/.VolumeIcon.icns')) { // in mac, this file in the root fs is not accessible.
                        statPromises.push(_getStat(contentPath));
                    }
                }
                Promise.all(statPromises)
                    .then(contentStats =>{
                        _sendResponse(ws, metadata, {contentStats});
                    })
                    .catch((err)=>_reportError(ws, metadata, err, `Cannot readdir ${fullPath}`));
            } else {
                _sendResponse(ws, metadata, {contents});
            }
        }).catch((err)=>_reportError(ws, metadata, err, `Cannot readdir ${fullPath}`));
}

function _stat(ws, metadata) {
    const fullPath = metadata.data.path;
    _getStat(fullPath)
        .then(stat=>{
            _sendResponse(ws, metadata, {stat});
        }).catch((err)=>_reportError(ws, metadata, err, `Failed to get stat for ${fullPath}`));
}

function _readBinaryFile(ws, metadata) {
    const fullPath = metadata.data.path;
    fs.readFile(fullPath)
        .then(data => {
            _sendResponse(ws, metadata, {}, toArrayBuffer(data));
        }).catch((err)=>_reportError(ws, metadata, err, `Failed to read file at path ${fullPath}`));
}

/**
 *
 * @param ws
 * @param metadata
 * @param dataBuffer {ArrayBuffer}
 * @private
 */
function _writeBinaryFile(ws, metadata, dataBuffer) {
    const fullPath = metadata.data.path,
        mode = metadata.data.mode,
        flag = metadata.data.flag;
    fs.writeFile(fullPath, Buffer.from(dataBuffer), {mode, flag})
        .then( ()=> {
            _sendResponse(ws, metadata);
        }).catch((err)=>_reportError(ws, metadata, err, `Failed to write file at path ${fullPath}`));
}

function _mkdir(ws, metadata) {
    const fullPath = metadata.data.path,
        recursive = metadata.data.recursive,
        mode = metadata.data.mode;
    fs.mkdir(fullPath, {recursive, mode})
        .then( ()=> {
            _sendResponse(ws, metadata);
        }).catch((err)=>_reportError(ws, metadata, err, `Failed to mkdir at path ${fullPath}`));
}

function _rename(ws, metadata) {
    const oldPath = metadata.data.oldPath,
        newPath = metadata.data.newPath;
    fs.rename(oldPath, newPath)
        .then( ()=> {
            _sendResponse(ws, metadata);
        }).catch((err)=>_reportError(ws, metadata, err, `Failed to rename file at path ${oldPath} to ${newPath}`));
}

function _unlink(ws, metadata) {
    const fullPath = metadata.data.path;
    fs.rm(fullPath, {recursive: true})
        .then( ()=> {
            _sendResponse(ws, metadata);
        }).catch((err)=>_reportError(ws, metadata, err, `Failed to unlink path ${fullPath}`));
}

// eventEmitterID to watcher
const watchersMap = {};
function _watch(ws, metadata) {
    const fullPath = metadata.data.path,
        // array of anymatch compatible path definition. Eg. ["**/{node_modules,bower_components}/**"]. full path is checked
        ignoredPaths = metadata.data.ignoredPaths,
        // contents of a gitIgnore file as text. The given path is used as the base path for gitIgnore
        gitIgnorePaths = metadata.data.gitIgnorePaths,
        persistent = metadata.data.persistent || true,
        ignoreInitial = metadata.data.ignoreInitial || true,
        socketGroupID = ws.socketGroupID;
    try{
        const gitignore = ignore().add(gitIgnorePaths);

        // Filter function to integrate with chokidar
        function isIgnored(pathToFilter) {
            if(anymatch(ignoredPaths, pathToFilter)){
                debugMode && console.log("ignored watch path: ", pathToFilter, "rel: ",relativePath);
                return true;
            }
            const relativePath = path.relative(fullPath, pathToFilter);
            if(relativePath && gitignore.ignores(relativePath)){
                debugMode && console.log("ignored watch gitIgnore path: ", pathToFilter, "rel: ",relativePath);
                return true;
            } else {
                return false;
            }
        }

        let readySent = false;
        const watcher = chokidar.watch(fullPath, {
            persistent,
            ignoreInitial,
            ignored: path => isIgnored(path)
        });
        const eventEmitterID = generateRandomId();
        watcher.eventEmitterID = eventEmitterID;
        watchersMap[eventEmitterID] = watcher;
        watcher.on('ready', () => {
            if(readySent){
                return;
            }
            readySent = true;
            _sendResponse(ws, metadata, {eventEmitterID});
        });
        watcher.on('error', (err) => {
            if(readySent){
                console.error(err);
                return;
            }
            readySent = true;
            _reportError(ws, metadata, err, `Error while watching path ${fullPath}`);
        });
        let watchEvents = ['add', 'change', 'unlink', 'addDir', 'unlinkDir'];
        for(let watchEvent of watchEvents){
            watcher.on(watchEvent, (path) => {
                _sendEvent(ws, socketGroupID, eventEmitterID,watchEvent, {path});
            });
        }
    } catch (err) {
        _reportError(ws, metadata, err, `Failed to watch path ${fullPath}`);
    }
}

function _unwatch(ws, metadata) {
    const eventEmitterID = metadata.data.eventEmitterID;
    const watcher = watchersMap[eventEmitterID];
    if(!watcher) {
        _reportError(ws, metadata, new Error("Couldnt unwatch, no such watcher for eventEmitterID: "+ eventEmitterID));
        return;
    }
    delete watchersMap[eventEmitterID];
    watcher.close()
        .then(() => {
            _sendResponse(ws, metadata, {eventEmitterID});
        }).catch(err=>{
            _reportError(ws, metadata, err, `Failed to unwatch watcher for eventEmitterID ${eventEmitterID}`);
        });
}

function processWSCommand(ws, metadata, dataBuffer) {
    try{
        switch (metadata.commandCode) {
        case WS_COMMAND.PING: _sendResponse(ws, metadata, metadata.data, dataBuffer); return;
        case WS_COMMAND.GET_WINDOWS_DRIVES:
            getWindowsDrives((error, drives)=>{
                if(error) {
                    metadata.error = error.message || "Cannot read windows drive letters.";
                }
                _sendResponse(ws, metadata, {drives}, dataBuffer);
            });
            return;
        case WS_COMMAND.READ_DIR:
            _readDir(ws, metadata);
            return;
        case WS_COMMAND.STAT:
            _stat(ws, metadata);
            return;
        case WS_COMMAND.READ_BIN_FILE:
            _readBinaryFile(ws, metadata);
            return;
        case WS_COMMAND.WRITE_BIN_FILE:
            _writeBinaryFile(ws, metadata, dataBuffer);
            return;
        case WS_COMMAND.MKDIR:
            _mkdir(ws, metadata);
            return;
        case WS_COMMAND.RENAME:
            _rename(ws, metadata);
            return;
        case WS_COMMAND.UNLINK:
            _unlink(ws, metadata);
            return;
        case WS_COMMAND.WATCH:
            _watch(ws, metadata);
            return;
        case WS_COMMAND.UNWATCH:
            _unwatch(ws, metadata);
            return;
        case WS_COMMAND.LARGE_DATA_SOCKET_ANNOUNCE:
            console.log("Large Data Transfer Socket established, socket Group: ", metadata.socketGroupID);
            ws.isLargeData = true;
            ws.socketGroupID = metadata.socketGroupID;
            largeDataSocketMap[metadata.socketGroupID] = ws;
            _sendResponse(ws, metadata, {}, dataBuffer);
            return;
        case WS_COMMAND.CONTROL_SOCKET_ANNOUNCE:
            console.log("Control Socket established, socket Group:", metadata.socketGroupID);
            ws.isLargeData = false;
            ws.socketGroupID = metadata.socketGroupID;
            controlSocketMap[metadata.socketGroupID] = ws;
            _sendResponse(ws, metadata, {}, dataBuffer);
            return;
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
            debugMode && console.log(`Received message ${message} of size: ${message.byteLength}, type: ${typeof message}, isArrayBuffer: ${message instanceof ArrayBuffer}, isBuffer: ${Buffer.isBuffer(message)}`);
            processWebSocketMessage(ws, message);
        });

        ws.on('error', console.error);

        // Handle disconnection
        ws.on('close', () => {
            if(ws.isLargeData && ws.socketGroupID && largeDataSocketMap[ws.socketGroupID] === ws){
                delete largeDataSocketMap[ws.socketGroupID];
                console.log('Websocket Client disconnected: Large data Socket');
            } else if(!ws.isLargeData && ws.socketGroupID && controlSocketMap[ws.socketGroupID] === ws){
                delete controlSocketMap[ws.socketGroupID];
                console.log('Websocket Client disconnected: control Socket');
            }
        });
    });
}

function setDebugMode(isDebug) {
    debugMode = isDebug;
}

exports.setDebugMode = setDebugMode;
exports.CreatePhoenixFsServer = CreatePhoenixFsServer;
