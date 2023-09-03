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

const getTauriStat = async function (vfsPath) {
    let stats = await window.__TAURI__.invoke("plugin:fs-extra|metadata", {
        path: globalObject.fs.getTauriPlatformPath(vfsPath)
    });
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

// Buffer to string
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
            return iconv.encode(str, encoding).buffer;
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

const Utils = {
    createStatObject,
    createDummyStatObject,
    getTauriStat,
    validateFileOptions,
    getDecodedString,
    getEncodedArrayBuffer,
    getEncodedBuffer
};

module.exports ={
    Utils
};
