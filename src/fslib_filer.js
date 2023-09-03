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
/*global globalObject*/
/*eslint no-console: 0*/
/*eslint strict: ["error", "global"]*/

const {Constants} = require('./constants');
const {Errors, ERR_CODES} = require("./errno");
const {Utils} = require("./utils");

let filerLib = null;

/**
 *
 * @param contentsBuffer {Buffer}
 * @param encoding {string}
 * @param callback {function}
 * @param path {string}
 * @private
 */
function _processContents(contentsBuffer, encoding, callback, path) {
    try {
        if(encoding === Constants.BYTE_ARRAY_ENCODING) {
            let arrayBuffer = contentsBuffer.buffer.slice(contentsBuffer.byteOffset,
                contentsBuffer.byteOffset + contentsBuffer.byteLength);
            callback(null, arrayBuffer, encoding);
            return;
        } else if(encoding === Constants.BINARY_ENCODING) {
            callback(null, contentsBuffer, encoding);
            return;
        }
        let decodedString = Utils.getDecodedStringFromBuffer(contentsBuffer, encoding);
        callback(null, decodedString, encoding);
    } catch (e) {
        if(ERR_CODES.ERROR_CODES[e.code]){
            callback(e);
        } else {
            callback(new Errors.EIO(`IO error while processing data read from file on path: ${path}`, path));
        }
    }
}

function readFile(path, options, callback) {
    path = globalObject.path.normalize(path);

    callback = arguments[arguments.length - 1];
    options = Utils.validateFileOptions(options, Constants.BINARY_ENCODING, 'r');
    const originalEncoding = options.encoding;

    // always read as binary
    options.encoding = Constants.BINARY_ENCODING;
    filerLib.fs.readFile(path, options, (err, contents)=>{
        if(err){
            callback(err);
            return;
        }
        _processContents(contents, originalEncoding, callback, path);
    });
}

function writeFile (path, data, options, callback) {
    callback = arguments[arguments.length - 1];
    options = Utils.validateFileOptions(options, Constants.BINARY_ENCODING, 'w');

    let bufferData;
    try{
        if(data instanceof ArrayBuffer){
            bufferData = Buffer.from(data);
        } else if(Buffer.isBuffer(data)) {
            bufferData = data;
        } else {
            if(typeof data === 'number') {
                data = '' + data;
            }
            data = data || ''; // this should be after number check as if data = 0, things break
            if(typeof data !== 'string') {
                data = data.toString();
            }
            bufferData = Utils.getEncodedBuffer(data, options.encoding);
        }
    } catch (e) {
        if(ERR_CODES.ERROR_CODES[e.code]){
            callback(e);
        } else {
            callback(new Errors.EIO(`IO error while processing data read from file on path: ${path}`, path));
        }
        return;
    }

    path = globalObject.path.normalize(path);

    // always write as binary
    options.encoding = Constants.BINARY_ENCODING;
    filerLib.fs.writeFile(path, bufferData, options, (err)=>{
        if(err){
            callback(err);
        } else {
            callback(null);
        }
    });
}

function initFilerLib(FilerLib) {
    filerLib = FilerLib;
}


const FilerFSModified = {
    initFilerLib,
    readFile,
    writeFile
};

module.exports ={
    FilerFSModified
};
