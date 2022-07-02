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
/*global buffer, globalObject*/
/*eslint no-console: 0*/
/*eslint strict: ["error", "global"]*/

const {Mounts} = require('./fslib_mounts');
const {Errors} = require('./errno');
const {Constants} = require('./constants');
const {Utils} =require('./utils');


async function _listDir(path, handle, options, callback) {
    let dirEntryNames = [];
    try {
        for await (const [key, value] of handle.entries()) {
            let entry = key;
            if(options['withFileTypes']){
                entry = await Utils.createStatObject(globalObject.path.join(path, key), value);
            }
            dirEntryNames.push(entry);
        }
        if(callback){
            callback(null, dirEntryNames);
        }
        return dirEntryNames;
    } catch (e) {
        if(e.code === e.NOT_FOUND_ERR){
            callback(new Errors.ENOENT(`Dir does not exist ${handle.name}`, e));
        } else {
            callback(new Errors.EIO(`Phoenix fs could not read directory ${handle.name}`, e));
        }
    }
}

// never throws
async function _subDirectoryExists(parentDirHandle, dirName) {
    try {
        await parentDirHandle.getDirectoryHandle(dirName);
        return true;
    } catch (e) {
        return false;
    }
}

async function _mkdir(parentDirHandle, dirName, callback) {
    try {
        let alreadyExists = await _subDirectoryExists(parentDirHandle, dirName);
        if(alreadyExists){
            callback(new Errors.EEXIST(`Folder ${dirName} already exists`));
            return ;
        }
        let childDirHandle = await parentDirHandle.getDirectoryHandle(dirName, { create: true });
        if(callback){
            callback(null);
        }
        return childDirHandle;
    } catch (e) {
        if(callback){
            callback(new Errors.EIO('Filer native fs function not yet supported.', e));
        }
        throw new Errors.EIO('Filer native fs function not yet supported.', e);
    }
}


function mkdir(path, mode, callback) {
    if (arguments.length < 3) {
        callback = mode;
    }

    path = globalObject.path.normalize(path);
    let dirname= globalObject.path.dirname(path);
    let subdirName= globalObject.path.basename(path);
    Mounts.getHandleFromPath(dirname, (err, handle) => {
        if(err){
            callback(err);
        } else if (handle.kind === Constants.KIND_FILE) {
            callback(new Errors.ENOTDIR('Parent path is not a directory.'));
        }else {
            _mkdir(handle, subdirName, callback);
        }
    });
}


function readdir(path, options, callback) {
    path = globalObject.path.normalize(path);
    if (typeof options === 'function') {
        callback = options;
        options = {};
    }

    if(path === Constants.MOUNT_POINT_ROOT ) {
        let mountedFolders = Object.keys(Mounts.getMountPoints());
        callback(null, mountedFolders);
    } else {
        Mounts.getHandleFromPath(path, (err, handle) => {
            if(err){
                callback(err);
            } else if (handle.kind === Constants.KIND_FILE) {
                callback(new Errors.ENOTDIR('Path is not a directory.'));
            }else {
                _listDir(path, handle, options, callback);
            }
        });
    }
}

function _getDecodedString(buffer, encoding) {
    try {
        return new TextDecoder(encoding).decode(buffer);
    } catch (e) {
        return null;
    }
}

async function _getFileContents(fileHandle, encoding, callback) {
    encoding = encoding || 'utf-8';
    try {
        let file = await fileHandle.getFile();
        let buffer = await file.arrayBuffer();
        if(encoding === BYTE_ARRAY_ENCODING) {
            callback(null, buffer, encoding);
            return;
        }
        let decodedString = _getDecodedString(buffer, encoding);
        if(decodedString !== null){
            callback(null, decodedString, encoding);
        } else {
            callback(new Errors.EIO(`Encoding ${encoding} no supported`));
        }
    } catch (e) {
        callback(e);
    }
}

function _validateFileOptions(options, enc, fileMode){
    if(!options) {
        options = { encoding: enc, flag: fileMode };
    } else if(typeof options === 'function') {
        options = { encoding: enc, flag: fileMode };
    } else if(typeof options === 'string') {
        options = { encoding: options, flag: fileMode };
    }
    return options;
}

function readFile(path, options, callback) {
    path = globalObject.path.normalize(path);

    callback = arguments[arguments.length - 1];
    options = _validateFileOptions(options, null, 'r');

    Mounts.getHandleFromPath(path, (err, handle) => {
        if(err){
            callback(err);
        } else if (handle.kind === Constants.KIND_DIRECTORY) {
            callback(new Errors.EISDIR('Path is a directory.'));
        }else {
            _getFileContents(handle, options.encoding, callback);
        }
    });
}


function stat(path, callback) {
    path = globalObject.path.normalize(path);
    Mounts.getHandleFromPath(path, (err, handle) => {
        if(err){
            callback(err);
        } else {
            Utils.createStatObject(path, handle).then(pathStat => {
                callback(null, pathStat);
            }).catch( error => {
                callback(error);
            });
        }
    });
}


async function _writeFileWithName(paretDirHandle, fileName, encoding, data, callback) {
    try {
        const newFileHandle = await paretDirHandle.getFileHandle(fileName, { create: true });
        const writable = await newFileHandle.createWritable();
        await writable.write(data);
        await writable.close();
        callback(null);
    } catch (e) {
        callback(e);
    }
}

function writeFile (path, data, options, callback) {
    callback = arguments[arguments.length - 1];
    options = _validateFileOptions(options, 'utf8', 'w');
    if(!buffer.Buffer.isBuffer(data)) {
        if(typeof data === 'number') {
            data = '' + data;
        }
        data = data || '';
        if(typeof data !== 'string') {
            data = buffer.Buffer.from(data.toString());
        } else {
            data = buffer.Buffer.from(data || '', options.encoding || 'utf8');
        }
    }

    path = globalObject.path.normalize(path);
    let dirname= globalObject.path.dirname(path);
    let fileName= globalObject.path.basename(path);
    Mounts.getHandleFromPath(dirname, (err, handle) => {
        if(err){
            callback(err);
        } else if (handle.kind === Constants.KIND_FILE) {
            callback(new Errors.ENOTDIR('Parent path is not a directory.'));
        }else {
            _writeFileWithName(handle, fileName, options.encoding, data, callback);
        }
    });
}

async function _deleteEntry(dirHandle, entryNameToDelete, callback, recursive=true){
    try {
        await dirHandle.removeEntry(entryNameToDelete, { recursive: recursive });
        callback(null);
    } catch (err) {
        callback(err);
    }
}

async function unlink(path, callback) {
    path = globalObject.path.normalize(path);
    let dirPath= globalObject.path.dirname(path);
    let baseName= globalObject.path.basename(path);
    Mounts.getHandleFromPath(dirPath, async (err, dirHandle) => {
        if(err){
            callback(err);
        } else {
            _deleteEntry(dirHandle, baseName, callback);
        }
    });
}

async function _getDestinationHandleForCopy(dst, srcBaseName, handleKindToCreate) {
    return new Promise(async (resolve, reject) => { // eslint-disable-line
        // eslint async executors are needed here. we explicitly catch so it's fine.
        try{
            dst = globalObject.path.normalize(dst);
            let dirPath= globalObject.path.dirname(dst);
            let dstBaseName= globalObject.path.basename(dst);
            let dstHandle = await Mounts.getHandleFromPathIfPresent(dst);
            let dstParentHandle = await Mounts.getHandleFromPathIfPresent(dirPath);
            if (dstHandle && dstHandle.kind === Constants.KIND_FILE) {
                reject(new Errors.EEXIST(`Destination file already exists: ${dst}`));
            } else if (dstHandle && dstHandle.kind === Constants.KIND_DIRECTORY
                && handleKindToCreate === Constants.KIND_FILE) {
                const fileHandle = await dstHandle.getFileHandle(srcBaseName, {create: true});
                const dstPath = `${dst}/${srcBaseName}`;
                resolve({handle: fileHandle, path:dstPath});
            } else if (dstHandle && dstHandle.kind === Constants.KIND_DIRECTORY
                && handleKindToCreate === Constants.KIND_DIRECTORY) {
                let dstChildHandle = await Mounts.getHandleFromPathIfPresent(`${dst}/${srcBaseName}`);
                if(dstChildHandle){
                    reject(new Errors.EEXIST(`Copy destination already exists: ${dst}/${srcBaseName}`));
                    return;
                }
                const directoryHandle = await dstHandle.getDirectoryHandle(srcBaseName, {create: true});
                const dstPath = `${dst}/${srcBaseName}`;
                resolve({handle: directoryHandle, path: dstPath});
            } else if (!dstHandle && dstParentHandle && dstParentHandle.kind === Constants.KIND_DIRECTORY
                && handleKindToCreate === Constants.KIND_FILE) {
                const fileHandle = await dstParentHandle.getFileHandle(dstBaseName, {create: true});
                const dstPath = `${dirPath}/${dstBaseName}`;
                resolve({handle: fileHandle, path: dstPath});
            } else if (!dstHandle && dstParentHandle && dstParentHandle.kind === Constants.KIND_DIRECTORY
                && handleKindToCreate === Constants.KIND_DIRECTORY) {
                const fileHandle = await dstParentHandle.getDirectoryHandle(dstBaseName, {create: true});
                const dstPath = `${dirPath}/${dstBaseName}`;
                resolve({handle: fileHandle, path: dstPath});
            } else {
                reject(new Errors.ENOENT(`Copy destination doesnt exist: ${dst}`));
            }
        } catch (e) {
            reject(e);
        }
    });
}

async function _copyFileFromHandles(srcFileHandle, dstHandle, optionalName) {
    // TODO Add retry mechanisms when copying large folders
    try {
        if(optionalName){
            dstHandle = await dstHandle.getFileHandle(optionalName, {create: true});
        }
        const srcFile = await srcFileHandle.getFile();
        const srcStream = await srcFile.stream();
        const writable = await dstHandle.createWritable();
        await srcStream.pipeTo(writable);
    } catch (e) {
        console.error(`Error while copying ${dstHandle.name}/${optionalName} : ${e}`);
        throw e;
    }
}

async function _copyFileWithHandle(srcFileHandle, dst, srcFileName, callback) {
    try {
        let {handle, path} = await _getDestinationHandleForCopy(dst, srcFileName, Constants.KIND_FILE);
        await _copyFileFromHandles(srcFileHandle, handle);
        callback(null, path);
    } catch (e) {
        callback(e);
    }
}

async function _treeCopy(srcFolderHandle, dstFolderHandle, recursive) {
    let allDonePromises = [];
    for await (const [key, srcHandle] of srcFolderHandle.entries()) {
        if (srcHandle.kind === Constants.KIND_FILE) {
            allDonePromises.push(_copyFileFromHandles(srcHandle, dstFolderHandle, key));
        } else if (srcHandle.kind === Constants.KIND_DIRECTORY) {
            const childDirHandle = await _mkdir(dstFolderHandle, key);
            if(recursive && childDirHandle){
                allDonePromises.push(_treeCopy(srcHandle, childDirHandle, recursive));
            }
        }
    }
    await Promise.all(allDonePromises);
}

async function _copyFolderWithHandle(srcFolderHandle, dst, srcFileName, callback, recursive) {
    try {
        let {handle, path} = await _getDestinationHandleForCopy(dst, srcFileName, Constants.KIND_DIRECTORY);
        await _treeCopy(srcFolderHandle, handle, recursive);
        callback(null, path);
    } catch (e) {
        callback(e);
    }
}

async function copy(src, dst, callback, recursive = true) {
    let srcFile = globalObject.path.normalize(src);
    let srcFileName= globalObject.path.basename(srcFile);
    Mounts.getHandleFromPath(srcFile, async (err, srcHandle) => {
        if(err){
            callback(err);
        } else if (srcHandle.kind === Constants.KIND_FILE) {
            return _copyFileWithHandle(srcHandle, dst, srcFileName, callback);
        } else if (srcHandle.kind === Constants.KIND_DIRECTORY) {
            return _copyFolderWithHandle(srcHandle, dst, srcFileName, callback, recursive);
        } else {
            callback(new Errors.EIO(`Cannot copy src: ${srcFile}`));
        }
    });
}

async function rename(oldPath, newPath, cb) {
    copy(oldPath, newPath, err => {
        if(err) {
            cb(err);
        } else {
            setTimeout(()=>{
                unlink(oldPath, cb);
            }, 0);
        }
    });
}

function mountNativeFolder(...args) {
    Mounts.mountNativeFolder(...args);
}

function refreshMountPoints() {
    Mounts.refreshMountPoints();
}

const BYTE_ARRAY_ENCODING = 'byte-array';

const NativeFS = {
    mountNativeFolder,
    refreshMountPoints,
    mkdir,
    readdir,
    stat,
    readFile,
    writeFile,
    unlink,
    copy,
    rename,
    BYTE_ARRAY_ENCODING
};

module.exports ={
    NativeFS
};
