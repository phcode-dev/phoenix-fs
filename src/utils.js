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
/*global globalObject*/
// jshint ignore: start
/*eslint no-console: 0*/
/*eslint strict: ["error", "global"]*/

import {Errors} from "./errno";

const {Constants} = require('./constants');
import * as iconv from 'iconv-lite';

const TAURI_PATH_PREFIX = Constants.TAURI_ROOT+ '/';
const IS_WINDOWS = navigator.userAgent.includes('Windows');

function _dateFromMs(ms) {
    if(ms === null || ms === undefined){
        return null;
    }
    return new Date(Number(ms));
}

function Stats(path, fileNode, devName) {
    this.dev = devName;
    this.node = fileNode.id;
    this.type = fileNode.type;
    this.size = fileNode.size;
    this.nlinks = fileNode.nlinks;
    this.nlink = fileNode.nlinks;
    // Date objects
    this.atime = _dateFromMs(fileNode.atime);
    this.mtime = _dateFromMs(fileNode.mtime);
    this.ctime = _dateFromMs(fileNode.ctime);
    // Unix timestamp MS Numbers
    this.atimeMs = fileNode.atime;
    this.mtimeMs = fileNode.mtime;
    this.ctimeMs = fileNode.ctime;
    this.version = fileNode.version;
    this.mode = fileNode.mode;
    this.readonly = fileNode.readonly;
    this.name = globalObject.path.basename(path);
}

Stats.prototype.isFile = function() {
    return this.type === Constants.NODE_TYPE_FILE;
};

Stats.prototype.isDirectory = function() {
    return this.type === Constants.NODE_TYPE_DIRECTORY;
};

Stats.prototype.isSymbolicLink = function() {
    return this.type === Constants.NODE_TYPE_SYMBOLIC_LINK;
};

// These will always be false in Filer.
Stats.prototype.isSocket          =
    Stats.prototype.isFIFO            =
        Stats.prototype.isCharacterDevice =
            Stats.prototype.isBlockDevice     =
                function() {
                    return false;
                };

function _getType(handle) {
    switch (handle.kind) {
    case Constants.KIND_FILE: return Constants.NODE_TYPE_FILE;
    case Constants.KIND_DIRECTORY: return Constants.NODE_TYPE_DIRECTORY;
    default: return null;
    }
}

async function _getDetails(nativeFsHandle) {
    let file = null;
    let details = {};
    switch (nativeFsHandle.kind) {
    case Constants.KIND_FILE:
        file = await nativeFsHandle.getFile();
        details.size = file.size;
        details.mtime = file.lastModified;
        return details;
    case Constants.KIND_DIRECTORY:
    default:
        return details;
    }
}

const createStatObject = async function (path, handle) {
    let details = await _getDetails(handle);
    let fileDetails = {
        type: _getType(handle),
        size: details.size,
        mtime: details.mtime
    };
    return new Stats(path, fileDetails, Constants.MOUNT_DEVICE_NAME);
};

const createDummyStatObject = function (path, isDir, deviceName) {
    let fileDetails = {
        type: isDir ? Constants.NODE_TYPE_DIRECTORY: Constants.NODE_TYPE_FILE,
        size: 0
    };
    return new Stats(path, fileDetails, deviceName);
};

const createFromTauriStat = function (vfsPath, stats) {
    let type = Constants.NODE_TYPE_DIRECTORY;
    if(stats.isFile){
        type = Constants.NODE_TYPE_FILE;
    } else if(stats.isSymlink){
        type = Constants.NODE_TYPE_SYMBOLIC_LINK;
    }
    stats.permissions = stats.permissions || {};
    let fileDetails = {
        type: type,
        size: stats.size,
        mode: stats.mode || stats.permissions.mode,
        readonly: stats.permissions.readonly,
        ctime: stats.createdAtMs,
        atime: stats.accessedAtMs,
        mtime: stats.modifiedAtMs,
        nlinks: stats.nlink
    };
    return new Stats(vfsPath, fileDetails, `${Constants.TAURI_DEVICE_NAME}_${stats.dev}`);
};

const createFromNodeStat = function (vfsPath, stats) {
    let type = Constants.NODE_TYPE_DIRECTORY;
    if(stats.isFile){
        type = Constants.NODE_TYPE_FILE;
    } else if(stats.isSymbolicLink){
        type = Constants.NODE_TYPE_SYMBOLIC_LINK;
    }
    stats.permissions = stats.permissions || {};
    let fileDetails = {
        type: type,
        size: stats.size,
        mode: stats.mode,
        readonly: stats.readonly,
        ctime: stats.ctimeMs,
        atime: stats.atimeMs,
        mtime: stats.mtimeMs,
        nlinks: stats.nlink
    };
    return new Stats(vfsPath, fileDetails, `${Constants.TAURI_WS_DEVICE_NAME}_${stats.dev}`);
};

function validateFileOptions(options, enc, fileMode){
    if(!options || typeof options === 'function') {
        options = { encoding: enc, flag: fileMode };
    } else if(typeof options === 'string') {
        options = { encoding: options, flag: fileMode };
    }
    options.encoding = options.encoding || enc;
    options.flag = options.flag || fileMode;
    return options;
}

const NATIVE_ENCODINGS = [
    'utf8',
    'UTF8',
    'utf-8',
    'UTF-8',
];

// ArrayBuffer to string
function getDecodedString(arrayBuffer, encoding) {
    if(!(arrayBuffer instanceof ArrayBuffer)){
        throw new Errors.EINVAL(`ArrayBuffer expected to decode ${encoding}`);
    }
    if(encoding === Constants.BYTE_ARRAY_ENCODING) {
        encoding = Constants.BINARY_ENCODING;
    }
    try {
        if(NATIVE_ENCODINGS[encoding]) {
            // for utf8 we use the browser native decoder.
            // The browser encoder does only utf-8, so we only use the native encoder/decoder for utf8.
            return new TextDecoder(encoding).decode(arrayBuffer);
        } else {
            return iconv.decode(Buffer.from(arrayBuffer), encoding);
        }
    } catch (e) {
        throw new Errors.ECHARSET(`${encoding} not supported ${e.message}`);
    }
}

function getDecodedStringFromBuffer(buf, encoding) {
    if(!(Buffer.isBuffer(buf))){
        throw new Errors.EINVAL(`Buffer expected to decode ${encoding}`);
    }
    if(encoding === Constants.BYTE_ARRAY_ENCODING) {
        encoding = Constants.BINARY_ENCODING;
    }
    try {
        // for buffer, we directly use iconv for even utf 8 to prevent large file array copys
        return iconv.decode(buf, encoding);
    } catch (e) {
        throw new Errors.ECHARSET(`${encoding} not supported ${e.message}`);
    }
}


// getEncodedArrayBuffer and getEncodedBuffer for performance. filer natively uses Buffer and tauri/fs access
// uses array buffer. So we have both to prevent unnecessary large data buffer<>arrayBuffer conversions.
function getEncodedArrayBuffer(str, encoding) {
    if(typeof str !== "string"){
        throw new Errors.EINVAL(`String expected to Encode ${encoding} but got ${typeof str}`);
    }
    if(encoding === Constants.BYTE_ARRAY_ENCODING) {
        encoding = Constants.BINARY_ENCODING;
    }
    try {
        if(NATIVE_ENCODINGS[encoding]) {
            // for utf8 we use the browser native decoder.
            // The browser encoder does only utf-8, so we only use the native encoder/decoder for utf8.
            let encoder = new TextEncoder(encoding);
            return encoder.encode(str).buffer;
        } else {
            let buf = iconv.encode(str, encoding);
            return buf.buffer.slice(buf.byteOffset, buf.byteOffset + buf.byteLength);
        }
    } catch (e) {
        throw new Errors.ECHARSET(`${encoding} not supported ${e.message}`);
    }
}

// getEncodedArrayBuffer and getEncodedBuffer for performance. filer natively uses Buffer and tauri/fs access
// uses array buffer. So we have both to prevent unnecessary large data buffer<>arrayBuffer conversions.
function getEncodedBuffer(str, encoding) {
    if(typeof str !== "string"){
        throw new Errors.EINVAL(`String expected to Encode ${encoding} but got ${typeof str}`);
    }
    if(encoding === Constants.BYTE_ARRAY_ENCODING) {
        encoding = Constants.BINARY_ENCODING;
    }
    try {
        if(NATIVE_ENCODINGS[encoding]) {
            // for utf8 we use the browser native decoder.
            // The browser encoder does only utf-8, so we only use the native encoder/decoder for utf8.
            let encoder = new TextEncoder(encoding);
            return Buffer.from(encoder.encode(str).buffer);
        } else {
            return iconv.encode(str, encoding);
        }
    } catch (e) {
        throw new Errors.ECHARSET(`${encoding} not supported ${e.message}`);
    }
}

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

/**
 * Convert Phoenix virtual file system path to platform-specific paths.
 * For Windows, `/tauri/c/d/a.txt` will correspond to `c:\d\a.txt`.
 * For *nix systems (Linux/Mac/Unix), `/tauri/x/y/a.txt` will correspond to `/x/y/a.txt`.
 *
 * @param {string} phoenixFSPath - The Phoenix virtual file system path to be converted.
 * @returns {string} The platform-specific path.
 *
 * @throws {Errors.EINVAL} If the provided path doesn't start with `/tauri/` or cannot resolve to system path.
 *
 * @example
 * // On a Windows system
 * getTauriPlatformPath('/tauri/c/users/user/a.txt');  // Returns: 'c:\users\user\a.txt'
 *
 * // On a *nix system
 * getTauriPlatformPath('/tauri/home/user/a.txt');  // Returns: '/home/user/a.txt'
 */
function getTauriPlatformPath(phoenixFSPath) {
    if(phoenixFSPath === Constants.TAURI_ROOT){
        phoenixFSPath = TAURI_PATH_PREFIX;
    }
    if (!phoenixFSPath.startsWith(TAURI_PATH_PREFIX)) {
        throw new Errors.EINVAL('Invalid Phoenix FS path- tauri path prefix expected: ' + phoenixFSPath);
    }

    if (IS_WINDOWS) {
        let parts = phoenixFSPath.split('/').slice(2);
        if(!parts[0].length){
            // maps to just ":\", no drive prefix available
            throw new Errors.EINVAL('Invalid Phoenix FS path for windows: ' + phoenixFSPath);
        }
        return `${parts[0]}:\\${parts.slice(1).join('\\')}`;
    } else {
        return phoenixFSPath.slice(Constants.TAURI_ROOT.length);
    }
}

/**
 * Convert platform-specific Tauri paths to Phoenix virtual file system path.
 * For Windows, `c:\d\a.txt` will correspond to `/tauri/c/d/a.txt`.
 * For *nix systems (Linux/Mac/Unix), `/x/y/a.txt` will correspond to `/tauri/x/y/a.txt`.
 *
 * @param {string} platformPath - The platform-specific path to be converted.
 * @returns {string} The Phoenix virtual file system path.
 *
 * @throws {Errors.EINVAL} If the provided path cannot be converted to Phoenix FS path.
 *
 * @example
 * // On a Windows system
 * getTauriVirtualPath('c:\users\user\a.txt');  // Returns: '/tauri/c/users/user/a.txt'
 *
 * // On a *nix system
 * getTauriVirtualPath('/home/user/a.txt');  // Returns: '/tauri/home/user/a.txt'
 */
function getTauriVirtualPath(platformPath) {
    if (IS_WINDOWS) {
        // For Windows, we split using both forward and backward slashes because users might use either
        let parts = platformPath.split(/[\\/]/);
        if (!parts[0].endsWith(':') || parts[0].length !== 2) {
            throw new Errors.EINVAL('Invalid Windows path format: ' + platformPath);
        }
        let driveLetter = parts[0].slice(0, -1);  // Remove the ':' from 'c:'
        return `/tauri/${driveLetter}/${parts.slice(1).join('/')}`;
    } else {
        if (!platformPath.startsWith('/')) {
            throw new Errors.EINVAL('Invalid Unix path format: ' + platformPath);
        }
        return Constants.TAURI_ROOT + platformPath;
    }
}

const Utils = {
    createStatObject,
    createDummyStatObject,
    createFromTauriStat,
    createFromNodeStat,
    getTauriPlatformPath,
    getTauriVirtualPath,
    validateFileOptions,
    toArrayBuffer,
    getDecodedString,
    getDecodedStringFromBuffer,
    getEncodedArrayBuffer,
    getEncodedBuffer,
    mergeMetadataAndArrayBuffer,
    splitMetadataAndBuffer
};

module.exports ={
    Utils
};
