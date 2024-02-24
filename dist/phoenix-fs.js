const WebSocket = require('ws');
const fs = require("fs/promises");
const fsNormal = require("fs");
const path = require("path");
const os = require('os');
const { exec } = require('child_process');
const chokidar = require('chokidar');
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

function isSubpath(parent, subPathToCheck) {
    const relative = path.relative(parent, subPathToCheck);
    const isSubdir = !!relative && !relative.startsWith('..') && !path.isAbsolute(relative);
    return isSubdir;
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
    COPY: "copy",
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

/**
 * A stat that never rejects
 * @param fullPath
 * @return {Promise<unknown>}
 * @private
 */
function _resolvingStat(fullPath) {
    return new Promise((resolve, reject) => {
        fs.stat(fullPath)
            .then(resolve)
            .catch( (err) => {
                if(err && err.code === "ENOENT"){
                    resolve(null);
                    return;
                }
                reject(err);
            });
    });
}

async function _copyFile(srcFile, dst) {
    let dstStat = await _resolvingStat(dst);
    if(!dstStat){
        let parentDir= path.dirname(dst);
        let dstFileName= path.basename(dst);
        dstStat = await _resolvingStat(parentDir);
        if(dstStat && dstStat.isDirectory()){
            let dstFilePath = path.join(parentDir, dstFileName);
            await fs.copyFile(srcFile, dstFilePath);
            return dstFilePath;
        } else {
            const error = new Error(`_copyFile Cannot create file: ${dst} as parent dir ${parentDir} is file`);
            error.code = 'ENOTDIR';
            throw error;
        }
    }

    let srcFileName= path.basename(srcFile);
    if(dstStat && dstStat.isDirectory()){
        let dstFilePath = path.join(dst, srcFileName);
        await fs.copyFile(srcFile, dstFilePath);
        return dstFilePath;
    } else if(dstStat && dstStat.isFile()){
        const error = new Error(`_copyFile Destination file already exists: ${dst}`);
        error.code = 'EEXIST';
        throw error;
    } else {
        const error = new Error(`_copyFile Cannot copy file, unknown destination: ${srcFile} to ${dst}`);
        error.code = 'EIO';
        throw error;
    }
}

async function _copyFolder(srcFolder, dst) {
    let dstStat = await _resolvingStat(dst);
    if(dstStat && dstStat.isFile()){
        const error = new Error(`Destination file already exists: ${dst}`);
        error.code = 'EEXIST';
        throw error;
    } else if(dstStat && dstStat.isDirectory()){
        let destSubFolderPath= path.join(dst, path.basename(srcFolder));
        dstStat = await _resolvingStat(destSubFolderPath);
        if(dstStat){
            const error = new Error(`Destination folder already exists: ${destSubFolderPath}`);
            error.code = 'EEXIST';
            throw error;
        }
        await fs.cp(srcFolder, destSubFolderPath, { recursive: true });
        return destSubFolderPath;
    } else {
        await fs.cp(srcFolder, dst, { recursive: true });
        return dst;
    }
}

async function _copy(ws, metadata) {
    const src = metadata.data.src,
        dst = metadata.data.dst;
    try {
        let srcStat = await _resolvingStat(src);
        if(!srcStat){
            const error = new Error(`Failed to copy ${src} to ${dst}, src does not exist.`);
            error.code = 'ENOENT';
            _reportError(ws, metadata, error)
            return;
        }
        if (srcStat.isFile()) {
            let copiedPath = await _copyFile(src, dst);
            _sendResponse(ws, metadata, {copiedPath});
        } else if (srcStat.isDirectory()) {
            let copiedPath = await _copyFolder(src, dst);
            _sendResponse(ws, metadata, {copiedPath});
        }
    } catch (err) {
        _reportError(ws, metadata, err, `Failed to copy file at path ${src} to ${dst}`);
    }
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
    // fs.promises.readFile is 40% slower than fs.readFile Though we noted only minor variations is our test
    // but fsNormal.readFile was faster most of the time though only by 10's of MS.
    // Leaving no quick fix performance on the table, so we moved to this impl.
    // https://github.com/nodejs/node/issues/37583
    fsNormal.readFile(fullPath, (err, data)=>{
        if(err) {
            _reportError(ws, metadata, err, `Failed to read file at path ${fullPath}`);
            return;
        }
        _sendResponse(ws, metadata, {}, toArrayBuffer(data));
    });
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
    dataBuffer = dataBuffer || new ArrayBuffer(0);
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
    const fullPathToWatch = metadata.data.path,
        // contents of a gitIgnore file as text. The given path is used as the base path for gitIgnore
        gitIgnorePaths = metadata.data.gitIgnorePaths,
        persistent = metadata.data.persistent || true,
        ignoreInitial = metadata.data.ignoreInitial || true,
        socketGroupID = ws.socketGroupID;
    try{
        const gitignore = ignore().add(gitIgnorePaths);

        // Filter function to integrate with chokidar
        function isIgnored(pathToFilter) {
            pathToFilter = path.normalize(pathToFilter);
            if(fullPathToWatch === pathToFilter) {
                // if we are watching a file directly given file name, we don't run it though gitignore.
                // also we cant get relative path of gitignore with respect to a file as root.
                return false;
            }
            if(!isSubpath(fullPathToWatch, pathToFilter)) {
                // Do not watch if the path given is not a subpath of our watched path.
                // if we are watching a file directly given file name, Then we get an isignored call for the parent
                // dir from chokidar.
                console.log(`PhoenixFS: Watching: ${fullPathToWatch} Filtered path: ${pathToFilter}`);
                return true;
            }
            const relativePath = path.relative(fullPathToWatch, pathToFilter);
            if(relativePath && gitignore.ignores(relativePath)){
                debugMode && console.log("PhoenixFS: gitignore ignored watch gitIgnore path: ", pathToFilter, "rel: ",relativePath);
                return true;
            } else {
                return false;
            }
        }

        let readySent = false;
        const watcher = chokidar.watch(fullPathToWatch, {
            persistent,
            ignoreInitial,
            depth: 99,
            ignorePermissionErrors: true,
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
            _reportError(ws, metadata, err, `Error while watching path ${fullPathToWatch}`);
        });
        let watchEvents = ['add', 'change', 'unlink', 'addDir', 'unlinkDir'];
        for(let watchEvent of watchEvents){
            watcher.on(watchEvent, (path) => {
                _sendEvent(ws, socketGroupID, eventEmitterID,watchEvent, {path});
            });
        }
    } catch (err) {
        _reportError(ws, metadata, err, `Failed to watch path ${fullPathToWatch}`);
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
        case WS_COMMAND.COPY:
            _copy(ws, metadata);
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
            console.log("PhoenixFS: Large Data Transfer Socket established, socket Group: ", metadata.socketGroupID);
            ws.isLargeData = true;
            ws.socketGroupID = metadata.socketGroupID;
            largeDataSocketMap[metadata.socketGroupID] = ws;
            _sendResponse(ws, metadata, {}, dataBuffer);
            return;
        case WS_COMMAND.CONTROL_SOCKET_ANNOUNCE:
            console.log("PhoenixFS: Control Socket established, socket Group:", metadata.socketGroupID);
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
        console.log('PhoenixFS: Websocket Client connected');
        ws.binaryType = 'arraybuffer';

        // Listen for messages from the client
        ws.on('message', (message) => {
            debugMode && console.log(`PhoenixFS: Received message ${message} of size: ${message.byteLength}, type: ${typeof message}, isArrayBuffer: ${message instanceof ArrayBuffer}, isBuffer: ${Buffer.isBuffer(message)}`);
            processWebSocketMessage(ws, message);
        });

        ws.on('error', console.error);

        // Handle disconnection
        ws.on('close', () => {
            if(ws.isLargeData && ws.socketGroupID && largeDataSocketMap[ws.socketGroupID] === ws){
                delete largeDataSocketMap[ws.socketGroupID];
                console.log('PhoenixFS: Websocket Client disconnected: Large data Socket');
            } else if(!ws.isLargeData && ws.socketGroupID && controlSocketMap[ws.socketGroupID] === ws){
                delete controlSocketMap[ws.socketGroupID];
                console.log('PhoenixFS: Websocket Client disconnected: control Socket');
            }
        });
    });
}

function setDebugMode(isDebug) {
    debugMode = isDebug;
}

exports.setDebugMode = setDebugMode;
exports.CreatePhoenixFsServer = CreatePhoenixFsServer;
