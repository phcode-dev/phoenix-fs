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
const {Errors} = require("./errno");
const {Utils} = require("./utils");

const TAURI_PATH_PREFIX = Constants.TAURI_ROOT+ '/';
const IS_WINDOWS = navigator.userAgent.includes('Windows');

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
        console.error("noop", phoenixFSPath);
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
    return __TAURI__.dialog.open(options);
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
    return __TAURI__.dialog.save(options);
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

function mapErrorMessage(tauriErrorMessage, path, userMessage= '') {
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

function _readDirHelper(entries, path, options, callback, useDummyStats) {
    let children = [];
    for (const entry of entries) {
        if(!options.withFileTypes){
            children.push(entry.name);
        } else if(useDummyStats){
            children.push(Utils.createDummyStatObject(`${path}/${entry.name}`, true, Constants.TAURI_DEVICE_NAME));
        } else {
            children.push(Utils.getTauriStat(`${path}/${entry.name}`));
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
                callback(mapErrorMessage(err, path, 'Failed to read directory: '));
            });
    }
}

function readdir(path, options, callback) {
    path = globalObject.path.normalize(path);
    if (typeof options === 'function') {
        callback = options;
        options = {};
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
                callback(mapErrorMessage(err, path, 'Failed to get drives: '));
            });
        return;
    }

    let platformPath = getTauriPlatformPath(path);
    __TAURI__.fs.readDir(platformPath)
        .then((entries)=>{
            _readDirHelper(entries, path, options, callback);
        })
        .catch((err)=>{
            callback(mapErrorMessage(err, path, 'Failed to read directory: '));
        });
}

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

    let platformPath = getTauriPlatformPath(path);
    __TAURI__.fs.createDir(platformPath,  {recursive})
        .then(()=>{
            callback(null);
        })
        .catch((err)=>{
            callback(mapErrorMessage(err, path, 'Failed to create directory: '));
        });
}

function stat(path, callback) {
    path = globalObject.path.normalize(path);
    Utils.getTauriStat(path)
        .then(stat =>{
            callback(null, stat);
        })
        .catch((err)=>{
            callback(mapErrorMessage(err, path, 'Failed to get stat'));
        });
}

function unlink(path, callback) {
    path = globalObject.path.normalize(path);
    function errCallback(err) {
        callback(mapErrorMessage(err, path, 'Failed to unlink'));
    }
    Utils.getTauriStat(path)
        .then(stat =>{
            let platformPath = getTauriPlatformPath(path);
            if(stat.isDirectory()){
                __TAURI__.fs.removeDir(platformPath, {recursive: true})
                    .then(callback)
                    .catch(errCallback);
            } else {
                __TAURI__.fs.removeFile(platformPath)
                    .then(callback)
                    .catch(errCallback);
            }
        })
        .catch(errCallback);
}


const TauriFS = {
    isTauriPath,
    isTauriSubPath,
    getTauriPlatformPath,
    getTauriVirtualPath,
    openTauriFilePickerAsync,
    openTauriFileSaveDialogueAsync,
    stat,
    readdir,
    mkdirs,
    unlink
};

module.exports ={
    TauriFS
};
