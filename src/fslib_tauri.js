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
/*global __TAURI__*/
/*eslint no-console: 0*/
/*eslint strict: ["error", "global"]*/

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

const TauriFS = {
    openTauriFilePickerAsync,
    openTauriFileSaveDialogueAsync
};

module.exports ={
    TauriFS
};
