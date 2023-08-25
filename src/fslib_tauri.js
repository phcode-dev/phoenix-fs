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
const {Mounts} = require("./fslib_mounts");
const {Errors} = require("./errno");

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
 * @throws {Error} If the provided path doesn't start with `/tauri/` or cannot resolve to system path.
 *
 * @example
 * // On a Windows system
 * getTauriPlatformPath('/tauri/c/users/user/a.txt');  // Returns: 'c:\users\user\a.txt'
 *
 * // On a *nix system
 * getTauriPlatformPath('/tauri/home/user/a.txt');  // Returns: '/home/user/a.txt'
 */
function getTauriPlatformPath(phoenixFSPath) {
    if (!phoenixFSPath.startsWith(TAURI_PATH_PREFIX)) {
        console.error("noop", phoenixFSPath);
        throw new Error('Invalid Phoenix FS path- tauri path prefix expected: ' + phoenixFSPath);
    }

    if (IS_WINDOWS) {
        let parts = phoenixFSPath.split('/').slice(2);
        if(!parts[0].length){
            // maps to just ":\", no drive prefix available
            throw new Error('Invalid Phoenix FS path for windows: ' + phoenixFSPath);
        }
        return `${parts[0]}:\\${parts.slice(1).join('\\')}`;
    } else {
        return phoenixFSPath.slice(Constants.TAURI_ROOT.length);
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

function readdir(path, options, callback) {
    path = globalObject.path.normalize(path);
    if (typeof options === 'function') {
        callback = options;
        options = {};
    }

    Mounts.getHandleFromPath(path, (err, handle) => {
        if(err){
            callback(err);
        } else if (handle.kind === Constants.KIND_FILE) {
            callback(new Errors.ENOTDIR('Path is not a directory.'));
        }
    });
}


const TauriFS = {
    isTauriPath,
    isTauriSubPath,
    getTauriPlatformPath,
    openTauriFilePickerAsync,
    openTauriFileSaveDialogueAsync,
    readdir
};

module.exports ={
    TauriFS
};
