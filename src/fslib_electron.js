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

// Ensure globalObject is available in both browser and web worker contexts
if (typeof globalObject === 'undefined') {
    if (typeof window !== 'undefined') {
        window.globalObject = window;
    } else if (typeof self !== 'undefined') {
        self.globalObject = self;
    }
}

const {Constants} = require('./constants');
const {Errors, ERR_CODES} = require("./errno");
const {Utils} = require("./utils");
const {NodeTauriFS} = require("./fslib_node_ws");

const IS_WINDOWS = navigator.userAgent.includes('Windows');
let preferNodeWs = false,
    forceNodeWs = false;

/**
 * Electron IPC strips Error.code during serialization (both main→preload and preload→renderer
 * via contextBridge). FS handlers in main.js return {__fsError, code, message} plain objects
 * on failure instead of throwing. This helper unwraps those into rejected promises.
 */
function unwrapFsResult(promise) {
    return promise.then(result => {
        if (result && result.__fsError) {
            const err = new Error(result.message);
            err.code = result.code;
            throw err;
        }
        return result;
    });
}

/**
 * Maps Node.js error codes to Phoenix FS errors.
 * @param {Error} err - The Node.js error
 * @param {string} path - The path that caused the error
 * @param {string} userMessage - Additional context message
 * @returns {Error} Phoenix FS error
 */
function mapNodeErrorMessage(err, path, userMessage = '') {
    const code = err.code || '';
    const message = err.message || '';
    switch (code) {
    case 'ENOENT': return new Errors.ENOENT(userMessage + ` No such File or Directory: ${path} ` + message, path);
    case 'EEXIST': return new Errors.EEXIST(userMessage + ` File exists: ${path} ` + message, path);
    case 'ENOTEMPTY': return new Errors.ENOTEMPTY(userMessage + ` Directory not empty: ${path} ` + message, path);
    case 'ENOTDIR': return new Errors.ENOTDIR(userMessage + ` Not a Directory: ${path} ` + message, path);
    case 'EACCES': return new Errors.EACCES(userMessage + ` Permission denied: ${path} ` + message, path);
    case 'EPERM': return new Errors.EPERM(userMessage + ` Operation not permitted: ${path} ` + message, path);
    case 'EISDIR': return new Errors.EISDIR(userMessage + ` Is a directory: ${path} ` + message, path);
    case 'EBADF': return new Errors.EBADF(userMessage + ` Bad file number: ${path} ` + message, path);
    case 'EROFS': return new Errors.EROFS(userMessage + ` Read-only file system: ${path} ` + message, path);
    case 'ENOSPC': return new Errors.ENOSPC(userMessage + ` No space left on device: ${path} ` + message, path);
    case 'EBUSY': return new Errors.EBUSY(userMessage + ` Device or resource busy: ${path} ` + message, path);
    case 'EINVAL': return new Errors.EINVAL(userMessage + ` Invalid argument: ${path} ` + message, path);
    default: return new Errors.EIO(userMessage + ` IO error on path: ${path} ` + message, path);
    }
}

/**
 * Opens the Electron file picker asynchronously with given options.
 *
 * @param {Object} [options] - Configuration options for the file picker.
 * @param {boolean} [options.directory=false] - Whether it is directory or file to be picked.
 * @param {boolean} [options.multiple=false] - Whether to allow picking multiple files.
 * @param {string} [options.defaultPath] - Default directory to open in the file picker.
 * @param {string} [options.title] - The title of the dialog window.
 * @param {Array<{name: string, extensions: string[]}>} [options.filters] - Extension filters.
 *
 * @returns {Promise<null|string|Array<string>>} A promise that resolves to null if user dismissed,
 *          a string (selected filepath), or an array of strings (multiple selected filepaths).
 */
async function openElectronFilePickerAsync(options) {
    options = options || { multiple: false };

    if (!options.defaultPath) {
        options.defaultPath = await globalObject.electronFSAPI.documentDir();
    }

    const dialogOptions = {
        defaultPath: options.defaultPath,
        title: options.title,
        properties: []
    };

    if (options.directory) {
        dialogOptions.properties.push('openDirectory');
    } else {
        dialogOptions.properties.push('openFile');
    }

    if (options.multiple) {
        dialogOptions.properties.push('multiSelections');
    }

    if (options.filters) {
        dialogOptions.filters = options.filters;
    }

    try {
        const filePaths = await globalObject.electronFSAPI.showOpenDialog(dialogOptions);
        if (!filePaths || filePaths.length === 0) {
            return null;
        }
        if (options.multiple) {
            return filePaths.map(p => Utils.getTauriVirtualPath(p));
        }
        return Utils.getTauriVirtualPath(filePaths[0]);
    } catch (err) {
        throw mapNodeErrorMessage(err, options.defaultPath, 'Failed to open file picker');
    }
}

/**
 * Opens the Electron file save dialogue asynchronously using the provided options.
 *
 * @param {Object} [options] - Configuration options for the file save dialogue.
 * @param {string} [options.defaultPath] - Initial directory or file path.
 * @param {string} [options.title] - The title of the dialog window.
 * @param {Array<{name: string, extensions: string[]}>} [options.filters] - Extension filters.
 *
 * @returns {Promise<string|null>} A promise that resolves to the selected file path or null.
 */
async function openElectronFileSaveDialogueAsync(options) {
    options = options || {};

    if (!options.defaultPath) {
        options.defaultPath = await globalObject.electronFSAPI.documentDir();
    }

    const dialogOptions = {
        defaultPath: options.defaultPath,
        title: options.title
    };

    if (options.filters) {
        dialogOptions.filters = options.filters;
    }

    try {
        const filePath = await globalObject.electronFSAPI.showSaveDialog(dialogOptions);
        if (typeof filePath === 'string' && filePath) {
            return Utils.getTauriVirtualPath(filePath);
        }
        return null;
    } catch (err) {
        throw mapNodeErrorMessage(err, options.defaultPath, 'Failed to open save dialog');
    }
}

async function _getElectronStat(vfsPath) {
    const platformPath = globalObject.fs.getTauriPlatformPath(vfsPath);
    const stats = await unwrapFsResult(globalObject.electronFSAPI.fsStat(platformPath));
    return Utils.createFromNodeStat(vfsPath, stats, Constants.ELECTRON_DEVICE_NAME);
}

function _readDirHelper(entries, path, options, callback, useDummyStats) {
    let children = [];
    for (const entry of entries) {
        if (!options.withFileTypes) {
            children.push(entry.name);
        } else if (useDummyStats) {
            children.push(Utils.createDummyStatObject(`${path}/${entry.name}`, true, Constants.TAURI_DEVICE_NAME));
        } else {
            children.push(_getElectronStat(`${path}/${entry.name}`));
        }
    }
    if (!options.withFileTypes || useDummyStats) {
        callback(null, children);
    } else {
        Promise.all(children)
            .then((results) => {
                callback(null, results);
            })
            .catch((err) => {
                callback(mapNodeErrorMessage(err, path, 'Failed to read directory: '));
            });
    }
}

/**
 * Reads the contents of a directory.
 */
function readdir(path, options, callback) {
    path = globalObject.path.normalize(path);
    if (typeof options === 'function') {
        callback = options;
        options = {};
    }

    if (!globalObject.__ELECTRON__ || forceNodeWs || (preferNodeWs && NodeTauriFS.isNodeWSReady())) {
        return NodeTauriFS.readdir(path, options, callback);
    }

    if (IS_WINDOWS && path === Constants.TAURI_ROOT) {
        // Windows drive listing not supported via Electron IPC fallback
        // NodeTauriFS should handle this
        callback(new Errors.ENOSYS('Windows drive listing requires NodeTauriFS'));
        return;
    }

    const platformPath = Utils.getTauriPlatformPath(path);
    unwrapFsResult(globalObject.electronFSAPI.fsReaddir(platformPath))
        .then((entries) => {
            _readDirHelper(entries, path, options, callback);
        })
        .catch((err) => {
            callback(mapNodeErrorMessage(err, path, 'Failed to read directory: '));
        });
}

/**
 * Creates a directory with optional mode and recursion.
 */
function mkdirs(path, mode, recursive, callback) {
    if (typeof mode !== 'number') {
        callback = recursive;
        recursive = mode;
        mode = 0o777;
    }

    if (typeof recursive !== 'boolean') {
        callback = recursive;
        recursive = false;
    }

    if (typeof callback !== 'function') {
        callback = function () {};
    }

    if (!globalObject.__ELECTRON__ || forceNodeWs || (preferNodeWs && NodeTauriFS.isNodeWSReady())) {
        NodeTauriFS.mkdirs(path, mode, recursive, callback);
        return;
    }

    const platformPath = Utils.getTauriPlatformPath(path);
    unwrapFsResult(globalObject.electronFSAPI.fsMkdir(platformPath, { recursive, mode }))
        .then(() => {
            callback(null);
        })
        .catch((err) => {
            callback(mapNodeErrorMessage(err, path, 'Failed to create directory: '));
        });
}

/**
 * Retrieves the status of a file or directory.
 */
function stat(path, callback, options = {}) {
    path = globalObject.path.normalize(path);
    if (!globalObject.__ELECTRON__ || forceNodeWs || (preferNodeWs && NodeTauriFS.isNodeWSReady())) {
        return NodeTauriFS.stat(path, callback, options);
    }
    _getElectronStat(path)
        .then(stat => {
            callback(null, stat);
        })
        .catch((err) => {
            callback(mapNodeErrorMessage(err, path, 'Failed to get stat'));
        });
}

function unlink(path, callback) {
    path = globalObject.path.normalize(path);

    if (!globalObject.__ELECTRON__ || forceNodeWs || (preferNodeWs && NodeTauriFS.isNodeWSReady())) {
        return NodeTauriFS.unlink(path, callback);
    }

    function errCallback(err) {
        callback(mapNodeErrorMessage(err, path, 'Failed to unlink'));
    }

    _getElectronStat(path)
        .then(stat => {
            const platformPath = Utils.getTauriPlatformPath(path);
            if (stat.isDirectory()) {
                unwrapFsResult(globalObject.electronFSAPI.fsRmdir(platformPath, { recursive: true }))
                    .then(() => { callback(null); })
                    .catch(errCallback);
            } else {
                unwrapFsResult(globalObject.electronFSAPI.fsUnlink(platformPath))
                    .then(() => { callback(null); })
                    .catch(errCallback);
            }
        })
        .catch(errCallback);
}

function rename(oldPath, newPath, callback) {
    oldPath = globalObject.path.normalize(oldPath);
    newPath = globalObject.path.normalize(newPath);

    if (!globalObject.__ELECTRON__ || forceNodeWs || (preferNodeWs && NodeTauriFS.isNodeWSReady())) {
        NodeTauriFS.rename(oldPath, newPath, callback);
        return;
    }

    const oldPlatformPath = Utils.getTauriPlatformPath(oldPath);
    const newPlatformPath = Utils.getTauriPlatformPath(newPath);
    unwrapFsResult(globalObject.electronFSAPI.fsRename(oldPlatformPath, newPlatformPath))
        .then(() => { callback(null); })
        .catch(err => {
            callback(mapNodeErrorMessage(err, oldPath, `Failed to rename ${oldPath} to ${newPath}`));
        });
}

/**
 * Processes file contents for different encodings.
 */
function _processContents(contents, encoding, callback, path) {
    try {
        let arrayBuffer = contents;
        if (contents.buffer instanceof ArrayBuffer) {
            arrayBuffer = contents.buffer;
        }
        if (encoding === Constants.BYTE_ARRAY_ENCODING) {
            callback(null, arrayBuffer, encoding);
            return;
        } else if (encoding === Constants.BINARY_ENCODING) {
            const contentBuffer = Buffer.from(arrayBuffer);
            callback(null, contentBuffer, encoding);
            return;
        }
        let decodedString = Utils.getDecodedString(arrayBuffer, encoding);
        callback(null, decodedString, encoding);
    } catch (e) {
        if (ERR_CODES.ERROR_CODES[e.code]) {
            callback(e);
        } else {
            callback(new Errors.EIO(`IO error while processing data read from file on path: ${path}`, path));
        }
    }
}

/**
 * Reads the contents of a file.
 */
function readFile(path, options, callback) {
    try {
        path = globalObject.path.normalize(path);

        callback = arguments[arguments.length - 1];
        options = Utils.validateFileOptions(options, Constants.BINARY_ENCODING, 'r');

        if (!globalObject.__ELECTRON__ || forceNodeWs || (preferNodeWs && NodeTauriFS.isNodeWSReady())) {
            NodeTauriFS.readBinaryFile(path)
                .then(contents => {
                    contents = contents || new ArrayBuffer(0);
                    _processContents(contents, options.encoding, callback, path);
                })
                .catch(callback);
            return;
        }

        const platformPath = Utils.getTauriPlatformPath(path);
        unwrapFsResult(globalObject.electronFSAPI.fsReadFile(platformPath))
            .then(contents => {
                // Electron returns a Buffer, convert to ArrayBuffer
                let arrayBuffer;
                if (contents instanceof ArrayBuffer) {
                    arrayBuffer = contents;
                } else if (contents && contents.buffer) {
                    arrayBuffer = contents.buffer.slice(
                        contents.byteOffset,
                        contents.byteOffset + contents.byteLength
                    );
                } else if (contents) {
                    // Handle Uint8Array or similar
                    arrayBuffer = new Uint8Array(contents).buffer;
                } else {
                    arrayBuffer = new ArrayBuffer(0);
                }
                _processContents(arrayBuffer, options.encoding, callback, path);
            })
            .catch(err => {
                callback(mapNodeErrorMessage(err, path, `Failed to read File at path ${path}`));
            });
    } catch (e) {
        if (ERR_CODES.ERROR_CODES[e.code]) {
            callback(e);
        } else {
            callback(new Errors.EIO(`IO error while processing data read from file on path: ${path}`, path));
        }
    }
}

/**
 * Writes data to a file, replacing the file if it already exists.
 */
function writeFile(path, data, options, callback) {
    try {
        path = globalObject.path.normalize(path);
        callback = arguments[arguments.length - 1];
        options = Utils.validateFileOptions(options, Constants.BINARY_ENCODING, 'w');
        let arrayBuffer;
        if (data instanceof ArrayBuffer) {
            arrayBuffer = data;
        } else if (Buffer.isBuffer(data)) {
            arrayBuffer = Utils.toArrayBuffer(data);
        } else {
            if (typeof data === 'number') {
                data = '' + data;
            }
            data = data || '';
            if (typeof data !== 'string') {
                data = data.toString();
            }
            arrayBuffer = Utils.getEncodedArrayBuffer(data, options.encoding);
        }

        if (!globalObject.__ELECTRON__ || forceNodeWs || (preferNodeWs && NodeTauriFS.isNodeWSReady())) {
            NodeTauriFS.writeBinaryFile(path, options.mode || 0o666, options.flag, arrayBuffer)
                .then(() => {
                    callback(null);
                })
                .catch(callback);
            return;
        }

        const platformPath = Utils.getTauriPlatformPath(path);
        // Convert ArrayBuffer to Uint8Array for IPC transfer
        const uint8Array = new Uint8Array(arrayBuffer);
        unwrapFsResult(globalObject.electronFSAPI.fsWriteFile(platformPath, Array.from(uint8Array)))
            .then(() => {
                callback(null);
            })
            .catch(err => {
                callback(mapNodeErrorMessage(err, path, `Failed to write File at path ${path}`));
            });
    } catch (e) {
        if (ERR_CODES.ERROR_CODES[e.code]) {
            callback(e);
        } else {
            callback(new Errors.EIO(`IO error while processing data write from file on path: ${path}`, path));
        }
    }
}

/**
 * Forces the usage of the Node WebSocket endpoint.
 */
function forceUseNodeWSEndpoint(use) {
    if (!NodeTauriFS.getNodeWSEndpoint()) {
        throw new Error("Please call fs.setNodeWSEndpoint('ws://your server') before calling this function.");
    }
    forceNodeWs = use;
}

/**
 * Sets the preference to use the Node WebSocket endpoint if available.
 */
function preferNodeWSEndpoint(use) {
    if (!NodeTauriFS.getNodeWSEndpoint()) {
        throw new Error("Please call fs.setNodeWSEndpoint('ws://your server') before calling this function.");
    }
    preferNodeWs = use;
}

function canCopy() {
    // we can only copy if node tari fs is ready as Electron IPC doesn't have folder copy APIs
    return NodeTauriFS.isNodeWSReady();
}

async function copy(src, dst, callback) {
    if (!canCopy()) {
        callback(new Errors.EIO(`IO error while copying: ${src} to ${dst}, node not ready.`, src));
        return;
    }
    src = globalObject.path.normalize(src);
    dst = globalObject.path.normalize(dst);
    return NodeTauriFS.copy(src, dst, callback);
}

const ElectronFS = {
    isTauriPath: Utils.isTauriPath,
    isTauriSubPath: Utils.isTauriSubPath,
    getTauriPlatformPath: Utils.getTauriPlatformPath,
    getTauriVirtualPath: Utils.getTauriVirtualPath,
    openElectronFilePickerAsync,
    openElectronFileSaveDialogueAsync,
    forceUseNodeWSEndpoint,
    preferNodeWSEndpoint,
    stat,
    readdir,
    mkdirs,
    rename,
    unlink,
    readFile,
    writeFile,
    copy,
    canCopy
};

module.exports = {
    ElectronFS
};
