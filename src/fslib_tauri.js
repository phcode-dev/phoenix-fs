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
/*global __TAURI__, globalObject*/
/*eslint no-console: 0*/
/*eslint strict: ["error", "global"]*/

const {Constants} = require('./constants');
const {Errors, ERR_CODES} = require("./errno");
const {Utils} = require("./utils");
const {NodeTauriFS} = require("./fslib_node_ws");

const TAURI_PATH_PREFIX = Constants.TAURI_ROOT+ '/';
const IS_WINDOWS = navigator.userAgent.includes('Windows');
let preferNodeWs = false;

/**
 * Check if the given path is a subpath of the '/tauri' folder.
 * @param path
 */
function isTauriSubPath(path) {
    if (typeof path !== 'string') {
        return false;
    }
    if (path) {
        path = globalObject.path.normalize(path);
        if (path.startsWith(TAURI_PATH_PREFIX) && path.length > TAURI_PATH_PREFIX.length) {
            return true;
        }
    }
    return false;
}

/**
 * Check if the given path is '/tauri' folder.
 * @param path
 */
function isTauriPath(path) {
    if (typeof path !== 'string') {
        return false;
    }
    if (path) {
        path = globalObject.path.normalize(path);
        if (path === Constants.TAURI_ROOT) {
            return true;
        }
    }
    return false;
}


/**
 * Opens the Tauri file picker asynchronously with given options. If options aren't provided, defaults to picking a single file.
 * If the `defaultPath` option isn't provided, it will default to the user's document directory.
 *
 * @param {Object} [options] - Configuration options for the Tauri file picker.
 * @param {boolean} [options.directory=false] - Whether it is directory or file to be picked.
 * @param {boolean} [options.multiple=false] - Whether to allow picking multiple files.
 * @param {string} [options.defaultPath] - Default directory to open in the file picker. Defaults to document directory if not provided.
 * @param {string} [options.title] - The title of the dialog window.
 * @param {Array<{name: string, extensions: string[]}>} [options.filters] - Extension filters for the file dialog.
 *   filters: [{
 *     name: 'Image',
 *     extensions: ['png', 'jpeg']
 *   }]
 *
 * @returns {Promise<null|string|Array<string>>} A promise that resolves to null if user dismissed the dialogue, a string (selected filepath), or an array of strings (multiple selected filepaths).
 */
async function openTauriFilePickerAsync(options) {
    options = options || {
        multiple: false
    };
    if(!options.defaultPath){
        options.defaultPath = await __TAURI__.path.documentDir();
    }
    return new Promise((resolve, reject)=>{
        __TAURI__.dialog.open(options)
            .then(filePaths => {
                if(typeof filePaths === 'string'){
                    resolve(Utils.getTauriVirtualPath(filePaths));
                } else if(Array.isArray(filePaths)){
                    let virtualPaths = [];
                    for(let platformPath of filePaths){
                        virtualPaths.push(Utils.getTauriVirtualPath(platformPath));
                    }
                    resolve(virtualPaths);
                } else {
                    resolve(null);
                }
            }).catch(reject);
    });
}

/**
 * Opens the Tauri file save dialogue asynchronously using the provided options.
 * If `defaultPath` option isn't provided, it defaults to the user's document directory.
 *
 * @async
 * @param {Object} [options] - Configuration options for the Tauri file save dialogue.
 * @param {string} [options.defaultPath] - Initial directory or file path. If it's a directory path, the dialog interface will change to that folder. If it's not an existing directory, the file name will be set to the dialog's file name input and the dialog will be set to the parent folder. If not provided, defaults to the user's document directory.
 * @param {string} [options.title] - The title of the dialog window.
 * @param {Array<{name: string, extensions: string[]}>} [options.filters] - Extension filters for the file dialog.
 *   filters: [{
 *     name: 'Image',
 *     extensions: ['png', 'jpeg']
 *   }]
 *
 * @returns {Promise<string|null>} A promise that resolves to the selected file path if a location was chosen, or null if the dialogue was cancelled.
 *
 * @example
 * openTauriFileSaveDialogueAsync({
 *     defaultPath: '/path/to/example.txt',
 *     filters: [{ name: 'Text Files', extensions: ['txt'] }]
 * }).then(savePath => {
 *     if (savePath) {
 *         console.log("File will be saved at:", savePath);
 *     } else {
 *         console.log("Save dialogue was cancelled");
 *     }
 * });
 */
async function openTauriFileSaveDialogueAsync(options) {
    options = options || {};
    if(!options.defaultPath){
        options.defaultPath = await __TAURI__.path.documentDir();
    }

    return new Promise((resolve, reject)=>{
        __TAURI__.dialog.save(options)
            .then(filePath => {
                if(typeof filePath === 'string'){
                    resolve(Utils.getTauriVirtualPath(filePath));
                } else {
                    resolve(null);
                }
            }).catch(reject);
    });
}

function extractErrorNumber(str) {
    const regex = /\(os error (\d+)\)/;
    const match = str.match(regex);

    if (match && match[1]) {
        return match[1];
    } else {
        return null;
    }
}

function mapOSTauriErrorMessage(tauriErrorMessage, path, userMessage= '') {
    let errorNumber = extractErrorNumber(tauriErrorMessage);
    switch (errorNumber) {
    case '2': return new Errors.ENOENT(userMessage + ` No such File or Directory: ` + path + tauriErrorMessage, path);
    case '3': return new Errors.ENOENT(userMessage + ` System cannot find the path specified: ` + path + tauriErrorMessage, path); // windows
    case '17': return new Errors.EEXIST(userMessage + ` File exists: ` + path + tauriErrorMessage, path);
    case '183': return new Errors.EEXIST(userMessage + ` File exists: ` + path + tauriErrorMessage, path); // windows
    case '39': return new Errors.ENOTEMPTY(userMessage + ` Directory not empty: ` + path + tauriErrorMessage, path);
    case '20': return new Errors.ENOTDIR(userMessage + ` Not a Directory: ` + path + tauriErrorMessage, path);
    case '13': return new Errors.EACCES(userMessage + ` Permission denied: ` + path + tauriErrorMessage, path);
    case '21': return new Errors.EISDIR(userMessage + ` Is a directory: ` + path + tauriErrorMessage, path);
    case '9': return new Errors.EBADF(userMessage + ` Bad file number: ` + path + tauriErrorMessage, path);
    case '30': return new Errors.EROFS(userMessage + ` Read-only file system: ` + path + tauriErrorMessage, path);
    case '28': return new Errors.ENOSPC(userMessage + ` No space left on device: ` + path + tauriErrorMessage, path);
    case '16': return new Errors.EBUSY(userMessage + ` Device or resource busy: ` + path + tauriErrorMessage, path);
    case '22': return new Errors.EINVAL(userMessage + ` Invalid argument: ` + path + tauriErrorMessage, path);
    default: return new Errors.EIO(userMessage + ` IO error on path: ` + path + tauriErrorMessage, path);
    }
}

async function _getTauriStat(vfsPath) {
    let stats = await window.__TAURI__.invoke("plugin:fs-extra|metadata", {
        path: globalObject.fs.getTauriPlatformPath(vfsPath)
    });
    return Utils.createFromTauriStat(vfsPath, stats);
}

function _readDirHelper(entries, path, options, callback, useDummyStats) {
    let children = [];
    for (const entry of entries) {
        if(!options.withFileTypes){
            children.push(entry.name);
        } else if(useDummyStats){
            children.push(Utils.createDummyStatObject(`${path}/${entry.name}`, true, Constants.TAURI_DEVICE_NAME));
        } else {
            children.push(_getTauriStat(`${path}/${entry.name}`));
        }
    }
    if(!options.withFileTypes || useDummyStats){
        callback(null, children);
    } else {
        Promise.all(children)
            .then((results) => {
                callback(null, results);
            })
            .catch((err) => {
                callback(mapOSTauriErrorMessage(err, path, 'Failed to read directory: '));
            });
    }
}

/**
 * Reads the contents of a directory. This method will list all the entries of a directory
 * as an array of strings(filenames , directory names, or symbolic link names).
 * If the `withFileTypes` option is set to `true`, it will return file stat objects array instead of strings.
 *
 * @param {string} path - The path to the directory that needs to be read.
 * @param {Object} [options] - Options for reading the directory.
 * @param {boolean} [options.withFileTypes=false] - Set to `true` to return stats of each content file/dir. Defaults to `false`.
 * @param {function} callback - A callback function to execute once the directory is read.
 *                              This function gets two arguments: (err, entries).
 *                              `err` will be set if an error occurred during reading. `entries` is an array of file names or fs stat objects.
 *
 * @example
 * // Using withFileTypes option
 * fs.readdir("/tauri/some/path", { withFileTypes: true }, function(err, entries) {
 *   if (err) throw err;
 *   console.log(entries); // Outputs file stats
 * });
 *
 * @example
 * // Without specifying withFileTypes option
 * fs.readdir("/tauri/some/path", function(err, entries) {
 *   if (err) throw err;
 *   console.log(entries); // Outputs an array of file/dir names
 * });
 *
 * @returns {void}
 */

function readdir(path, options, callback) {
    path = globalObject.path.normalize(path);
    if (typeof options === 'function') {
        callback = options;
        options = {};
    }

    if(!window.__TAURI__ || preferNodeWs || options.useNodeWSEndpoint) {
        return NodeTauriFS.readdir(path, options, callback);
    }

    if(IS_WINDOWS && path === Constants.TAURI_ROOT){
        window.__TAURI__.invoke('_get_windows_drives')
            .then(drives=>{
                let entries = [];
                for(let drive of drives) {
                    entries.push({name: drive});
                }
                _readDirHelper(entries, path, options, callback, true);
            })
            .catch(err =>{
                callback(mapOSTauriErrorMessage(err, path, 'Failed to get drives: '));
            });
        return;
    }

    let platformPath = Utils.getTauriPlatformPath(path);
    __TAURI__.fs.readDir(platformPath)
        .then((entries)=>{
            _readDirHelper(entries, path, options, callback);
        })
        .catch((err)=>{
            callback(mapOSTauriErrorMessage(err, path, 'Failed to read directory: '));
        });
}

/**
 * Creates a directory with optional mode and recursion(create all intermediate directories if those don't exist).
 *
 * @param {string} path - The path where the directory should be created.
 * @param {(number|function)} [mode=0o777] - The directory permissions. Defaults to `0o777` if not provided.
 * @param {(boolean|function)} [recursive=false] - Whether to create directories recursively. Defaults to `false` if not provided.
 * @param {function} [callback] - Callback to execute once directory creation is done. Called with an error as the first argument on failure, and null on success.
 *
 * @example
 * // Create directory without recursion and with default mode, and a callback.
 * fs.mkdirs("/tauri/some/path", callback);
 *
 * // Create directory with specified mode, without recursion, and a callback.
 * fs.mkdirs("/tauri/some/path", 0o755, callback);
 *
 * // Create directory with specified mode, with recursion, and a callback.
 * fs.mkdirs("/tauri/some/path", 0o755, true, callback);
 *
 * // Create directory without recursion, without mode, and without a callback.
 * fs.mkdirs("/tauri/some/path");
 *
 * @returns {void}
 */
function mkdirs(path, mode, recursive, callback) {
    // Determine if 'mode' is provided
    if (typeof mode !== 'number') {
        callback = recursive;
        recursive = mode;
        mode = 0o777; // Default mode (or any other default you'd like to set)
    }

    // Determine if 'recursive' is provided
    if (typeof recursive !== 'boolean') {
        callback = recursive;
        recursive = false;
    }

    // Determine if 'callback' is provided
    if (typeof callback !== 'function') {
        callback = function () {
            // Do Nothing
        };
    }

    let platformPath = Utils.getTauriPlatformPath(path);
    __TAURI__.fs.createDir(platformPath,  {recursive})
        .then(()=>{
            callback(null);
        })
        .catch((err)=>{
            callback(mapOSTauriErrorMessage(err, path, 'Failed to create directory: '));
        });
}

/**
 * Retrieves the status of a file or directory. The result will be an object with detailed information.
 * The provided callback function will be called with either an error (as the first argument) or the stat object (as the second argument).
 *
 * @param {string} path - The path to the file or directory to retrieve the status for.
 * @param {function} callback - The callback function that is executed when the operation is complete.
 *                              The callback function will receive two arguments:
 *                              1. An error object if an error occurred, otherwise null.
 *                              2. The stat object containing the details about the file or directory.
 *
 * The stat object has the following properties:
 * - 'name' : The base name of the file or directory.
 * - 'isFile()', 'isDirectory()' and 'isSymbolicLink()'- functions that does what its name suggests.
 * - 'type': Indicates the type of the node, which can be a string indicating directory, file, or symbolic link.
 *           Prefer above `isFile()` type check over this.
 * - `size`: The size of the file in bytes.
 * - `mode`: The file's mode. It's an integer that represents the file's permission mode.
 * - `readonly`: A boolean indicating if the file is read-only.
 * - `ctime`: The time the file was created, in milliseconds since the POSIX Epoch.
 * - `atime`: The time the file was last accessed, in milliseconds since the POSIX Epoch.
 * - `mtime`: The time the file was last modified, in milliseconds since the POSIX Epoch.
 * - `nlinks`: The number of hard links.
 *
 * @example
 * fs.stat("/tauri/some/path", function(err, statObj) {
 *   if (err) throw err;
 *   console.log(statObj);
 * });
 *
 * @returns {void}
 */
function stat(path, callback) {
    path = globalObject.path.normalize(path);
    _getTauriStat(path)
        .then(stat =>{
            callback(null, stat);
        })
        .catch((err)=>{
            callback(mapOSTauriErrorMessage(err, path, 'Failed to get stat'));
        });
}

function unlink(path, callback) {
    path = globalObject.path.normalize(path);
    function errCallback(err) {
        callback(mapOSTauriErrorMessage(err, path, 'Failed to unlink'));
    }
    _getTauriStat(path)
        .then(stat =>{
            let platformPath = Utils.getTauriPlatformPath(path);
            if(stat.isDirectory()){
                __TAURI__.fs.removeDir(platformPath, {recursive: true})
                    .then(()=>{callback(null);})
                    .catch(errCallback);
            } else {
                __TAURI__.fs.removeFile(platformPath)
                    .then(()=>{callback(null);})
                    .catch(errCallback);
            }
        })
        .catch(errCallback);
}

function rename(oldPath, newPath, callback) {
    oldPath = globalObject.path.normalize(oldPath);
    const oldPlatformPath = Utils.getTauriPlatformPath(oldPath);
    newPath = globalObject.path.normalize(newPath);
    const newPlatformPath = Utils.getTauriPlatformPath(newPath);
    __TAURI__
        .invoke('_rename_path', {oldPath: oldPlatformPath, newPath: newPlatformPath})
        .then(()=>{callback(null);})
        .catch(err=>{
            callback(mapOSTauriErrorMessage(err, oldPath, `Failed to rename ${oldPath} to ${newPath}`));
        });
}

/**
 *
 * @param contents {ArrayBuffer}
 * @param encoding {string}
 * @param callback {function}
 * @param path {string}
 * @private
 */
function _processContents(contents, encoding, callback, path) {
    try {
        let arrayBuffer = contents;
        if(contents.buffer instanceof ArrayBuffer) {
            arrayBuffer = contents.buffer;
        }
        if(encoding === Constants.BYTE_ARRAY_ENCODING) {
            callback(null, arrayBuffer, encoding);
            return;
        } else if(encoding === Constants.BINARY_ENCODING) {
            const contentBuffer = Buffer.from(arrayBuffer);
            callback(null, contentBuffer, encoding);
            return;
        }
        let decodedString = Utils.getDecodedString(arrayBuffer, encoding);
        callback(null, decodedString, encoding);
    } catch (e) {
        if(ERR_CODES.ERROR_CODES[e.code]){
            callback(e);
        } else {
            callback(new Errors.EIO(`IO error while processing data read from file on path: ${path}`, path));
        }
    }
}

/**
 * Reads the contents of a file.
 *
 * @param {string} path - The path of the file to read.
 * @param {Object|string} [options] - An object with encoding and flag options or a string representing the encoding.
 *   - If a string is provided, it specifies the encoding. Default is `'binary'` which returns a `'Buffer'`. To return a
 *     `UTF8` string use `utf8`. Get list of all supported encodings from `'fs.SUPPORTED_ENCODINGS'`.
 *      If reading binary files from within `/tauri/` or fsAccess(`/mnt/`) paths, then instead of `'binary'` encoding,
 *      prefer `'fs.BYTE_ARRAY_ENCODING'` for improved binary read performance. This will instead return an `ArrayBuffer`
 *      that is native to the browser environment instead of the 'Buffer' polyfill that we use.
 *   - If an object is provided, it can have the following properties:
 *     - `encoding` (string): The encoding type. Default is `'binary'`. Get list of supported encodings from `'fs.SUPPORTED_ENCODINGS'`.
 *     - `flag` (string): The file system flag. Default is `'r'`.
 * @param {function} callback - The callback function to execute when the file read operation is complete.
 *   - The callback is passed two arguments:
 *     1. An error object or null if no error occurred.
 *     2. The data read from the file (type depends on the encoding option).
 *
 * @example
 * fs.readFile("/path/to/file", { encoding: 'utf8' }, function(err, data) {
 *   if (err) throw err;
 *   console.log(data);
 * });
 * // OR
 * fs.readFile("/path/to/file", 'utf8', function(err, data) {
 *   if (err) throw err;
 *   console.log(data);
 * });
 *
 * @returns {void}
 */

function readFile(path, options, callback) {
    try {
        path = globalObject.path.normalize(path);
        const platformPath = Utils.getTauriPlatformPath(path);

        callback = arguments[arguments.length - 1];
        options = Utils.validateFileOptions(options, Constants.BINARY_ENCODING, 'r');

        __TAURI__.fs.readBinaryFile(platformPath)
            .then(contents => {
                // contents is Uint8Array
                _processContents(contents, options.encoding, callback, path);
            })
            .catch(err=>{
                callback(mapOSTauriErrorMessage(err, path, `Failed to read File at path ${path}`));
            });
    } catch (e) {
        if(ERR_CODES.ERROR_CODES[e.code]){
            callback(e);
        } else {
            callback(new Errors.EIO(`IO error while processing data read from file on path: ${path}`, path));
        }
    }
}

/**
 * Writes data to a file, replacing the file if it already exists.
 *
 * @param {string} path - The path of the file where data should be written.
 * @param {ArrayBuffer|Buffer|string|number} data - The data to write. This can be an ArrayBuffer, Buffer, string, or number.
 * @param {Object|string} [options] - An object with encoding and flag options or a string representing the encoding.
 *   - If a string is provided, it specifies the encoding. Default is `'binary'` which writes the buffer as is.
 *      Get list of all supported encodings from `'fs.SUPPORTED_ENCODINGS'`.
 *      If writing binary files from within `/tauri/` or fsAccess(`/mnt/`) paths, then instead of `'binary'` encoding,
 *      prefer `'fs.BYTE_ARRAY_ENCODING'` and `ArrayBuffer` data.
 *   - If provided as an `object`, it can have the following keys:
 *     - `encoding` (string): The type of encoding. Default is `'binary'`.
 *     - `flag` (string): The file system flag. Default is `'w'`.
 * @param {function} callback - The callback function to execute once the file write operation concludes.
 *   - The callback receives one argument:
 *     1. An error object (or null if there were no errors).
 *
 * @example
 * fs.writeFile("/path/to/file", "Hello World", { encoding: 'utf8' }, function(err) {
 *   if (err) throw err;
 *   console.log("File written successfully!");
 * });
 * // or
 * fs.writeFile("/path/to/file", "Hello World", 'utf8', function(err) {
 *   if (err) throw err;
 *   console.log("File written successfully!");
 * });
 * @returns {void}
 */
function writeFile (path, data, options, callback) {
    try{
        callback = arguments[arguments.length - 1];
        options = Utils.validateFileOptions(options, Constants.BINARY_ENCODING, 'w');
        let arrayBuffer;
        if(data instanceof ArrayBuffer){
            arrayBuffer = data;
        } else if(Buffer.isBuffer(data)) {
            arrayBuffer = Utils.toArrayBuffer(data);
        } else {
            if(typeof data === 'number') {
                data = '' + data;
            }
            data = data || ''; // this should be after number check as if data = 0, things break
            if(typeof data !== 'string') {
                data = data.toString();
            }
            arrayBuffer = Utils.getEncodedArrayBuffer(data, options.encoding);
        }
        path = globalObject.path.normalize(path);
        const platformPath = Utils.getTauriPlatformPath(path);

        __TAURI__.fs.writeBinaryFile(platformPath, arrayBuffer)
            .then(() => {
                callback(null);
            })
            .catch(err=>{
                callback(mapOSTauriErrorMessage(err, path, `Failed to write File at path ${path}`));
            });
    } catch (e) {
        if(ERR_CODES.ERROR_CODES[e.code]){
            callback(e);
        } else {
            callback(new Errors.EIO(`IO error while processing data write from file on path: ${path}`, path));
        }
    }
}

function forceUseNodeWSEndpoint(use) {
    if(!NodeTauriFS.getNodeWSEndpoint()) {
        throw new Error("Please call fs.setNodeWSEndpoint('ws://your server') before calling this function.");
    }
    preferNodeWs = use;
}

const TauriFS = {
    isTauriPath,
    isTauriSubPath,
    getTauriPlatformPath: Utils.getTauriPlatformPath,
    getTauriVirtualPath: Utils.getTauriVirtualPath,
    openTauriFilePickerAsync,
    openTauriFileSaveDialogueAsync,
    stat,
    readdir,
    mkdirs,
    rename,
    unlink,
    readFile,
    writeFile,
    forceUseNodeWSEndpoint
};

module.exports ={
    TauriFS
};
