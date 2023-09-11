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

const {ERR_CODES, Errors} = require('./errno');
const {NativeFS} = require('./fslib_native');
const {TauriFS} = require('./fslib_tauri');
const {NodeTauriFS} = require('./fslib_node_ws');
const {FilerFSModified} = require('./fslib_filer');
const {Constants} = require('./constants');
const {Mounts} = require('./fslib_mounts');
const {FsWatch} = require('./fslib_watch');
const {globalCopy} = require('./filerlib_copy.js');
import * as iconv from 'iconv-lite';

let filerLib = null;
let filerShell = null;

/**
 * Offers functionality similar to mkdir -p
 *
 * Asynchronous operation. No arguments other than a possible exception
 * are given to the completion callback.
 */
function _mkdir_p (fsLib, path, mode, callback, _position) {
    const osSep = '/';
    const parts = filerLib.path.normalize(path).split(osSep);

    mode = mode || process.umask();
    _position = _position || 0;

    if (_position >= parts.length) {
        return callback(null);
    }

    var directory = parts.slice(0, _position + 1).join(osSep) || osSep;
    fsLib.stat(directory, function(err) {
        if (err === null) {
            _mkdir_p(fsLib, path, mode, callback, _position + 1);
        } else {
            fsLib.mkdir(directory, mode, function (error) {
                if (error && error.code !== 'EEXIST') {
                    return callback(error);
                } else {
                    _mkdir_p(fsLib, path, mode, callback, _position + 1);
                }
            });
        }
    });
}

function _ensure_mount_directory() {
    fileSystemLib.mkdirs(Constants.MOUNT_POINT_ROOT);
    fileSystemLib.mkdirs(Constants.TAURI_ROOT);
    NativeFS.refreshMountPoints();
}

function _getFirstFunctionIndex(argsArray) {
    for(let i=0; i<argsArray.length; i++){
        if (typeof argsArray[i] === 'function') {
            return i;
        }
    }
    return -1;
}

function _isSubPathOf(dir, subDir) {
    const relative = filerLib.path.relative(dir, subDir);
    return relative && !relative.startsWith('..') && !filerLib.path.isAbsolute(relative);
}

const fileSystemLib = {
    mountNativeFolder: async function (...args) {
        return NativeFS.mountNativeFolder(...args);
    },
    openTauriFilePickerAsync: function (options) {
        return TauriFS.openTauriFilePickerAsync(options);
    },
    openTauriFileSaveDialogueAsync: function (options) {
        return TauriFS.openTauriFileSaveDialogueAsync(options);
    },
    getTauriPlatformPath: function (virtualPath) {
        if(TauriFS.isTauriPath(virtualPath) || TauriFS.isTauriSubPath(virtualPath)) {
            return TauriFS.getTauriPlatformPath(virtualPath);
        }
        return null;
    },
    getTauriVirtualPath: function (platformPath) {
        return TauriFS.getTauriVirtualPath(platformPath);
    },
    readdir: function (...args) { // (path, options, callback)
        let path = args[0];
        if(TauriFS.isTauriPath(path) || TauriFS.isTauriSubPath(path)) {
            return TauriFS.readdir(...args);
        }
        if(Mounts.isMountPath(path) || Mounts.isMountSubPath(path)) {
            return NativeFS.readdir(...args);
        }
        return filerLib.fs.readdir(...args);
    },
    stat: function (...args) { // (path, callback)
        let path = args[0];
        if(TauriFS.isTauriSubPath(path)) {
            return TauriFS.stat(...args);
        }
        if(Mounts.isMountSubPath(path)) {
            return NativeFS.stat(...args);
        }
        return filerLib.fs.stat(...args);
    },
    readFile: function (...args) { // (path, options, callback)
        let path = args[0];
        if(TauriFS.isTauriSubPath(path)) {
            return TauriFS.readFile(...args);
        } else if(Mounts.isMountSubPath(path)) {
            return NativeFS.readFile(...args);
        }
        return FilerFSModified.readFile(...args);
    },
    writeFile: function (...args) { // (path, data, options, callback)
        let path = args[0];
        function callbackInterceptor(...interceptedArgs) {
            let err = interceptedArgs.length >= 1 ? interceptedArgs[0] : null;
            if(!err){
                FsWatch.reportChangeEvent(path);
            }
            if(args.originalCallback){
                args.originalCallback(...interceptedArgs);
            }
        }
        let callbackIndex = _getFirstFunctionIndex(args);
        if(callbackIndex !== -1) {
            args.originalCallback = args[callbackIndex];
            args[callbackIndex] = callbackInterceptor;
        }

        if(TauriFS.isTauriSubPath(path)) {
            return TauriFS.writeFile(...args);
        } else if(Mounts.isMountSubPath(path)) {
            return NativeFS.writeFile(...args);
        }
        return FilerFSModified.writeFile(...args);
    },
    mkdir: function (...args) { // (path, mode, callback)
        let path = args[0];
        function callbackInterceptor(...interceptedArgs) {
            let err = interceptedArgs.length >= 1 ? interceptedArgs[0] : null;
            if(!err){
                FsWatch.reportCreateEvent(path);
            }
            if(args.originalCallback){
                args.originalCallback(...interceptedArgs);
            }
        }
        let callbackIndex = _getFirstFunctionIndex(args);
        if(callbackIndex !== -1) {
            args.originalCallback = args[callbackIndex];
            args[callbackIndex] = callbackInterceptor;
        }

        if(TauriFS.isTauriSubPath(path)) {
            return TauriFS.mkdirs(...args);
        }
        if(Mounts.isMountSubPath(path)) {
            return NativeFS.mkdir(...args);
        }
        return filerLib.fs.mkdir(...args);
    },
    rename: function (oldPath, newPath, cb) {
        function callbackInterceptor(...args) {
            let err = args.length >= 1 ? args[0] : null;
            if(!err){
                FsWatch.reportUnlinkEvent(oldPath);
                FsWatch.reportCreateEvent(newPath);
            }
            if(cb){
                cb(...args);
            }
        }
        if (_isSubPathOf(oldPath, newPath) || _isSubPathOf(newPath, oldPath)){
            callbackInterceptor(new Errors.EINVAL(`Error renaming as one is a sub-path of other: ${newPath}, ${oldPath}`));
            return ;
        }
        if(Mounts.isMountPath(oldPath) || Mounts.isMountPath(newPath)) {
            cb(new Errors.EPERM('Mount root directory cannot be renamed.'));
            return;
        } else if(TauriFS.isTauriPath(oldPath) || TauriFS.isTauriPath(newPath)) {
            cb(new Errors.EPERM('Tauri root directory cannot be renamed.'));
            return;
        }
        fileSystemLib.stat(newPath, (err)=>{
            if(!err){
                // the destination folder/file exists and we should not rename
                cb(new Errors.EEXIST('Cannot rename, The destination path exists: ' + newPath));
                return ;
            }
            if(TauriFS.isTauriSubPath(oldPath) && TauriFS.isTauriSubPath(newPath)) {
                return TauriFS.rename(oldPath, newPath, callbackInterceptor);
            } else if(Mounts.isMountSubPath(oldPath) && Mounts.isMountSubPath(newPath)) {
                return NativeFS.rename(oldPath, newPath, callbackInterceptor);
            }
            return filerLib.fs.rename(oldPath, newPath, callbackInterceptor);
        });
    },
    unlink: function (path, cb) {
        function callbackInterceptor(...args) {
            let err = args.length >= 1 ? args[0] : null;
            if(!err){
                FsWatch.reportUnlinkEvent(path);
            }
            if(cb){
                cb(...args);
            }
        }

        if(Mounts.isMountPath(path) || TauriFS.isTauriPath(path)) {
            callbackInterceptor(new Errors.EPERM('Mount root directory cannot be deleted.'));
            return ;
        } else if(TauriFS.isTauriSubPath(path)) {
            return TauriFS.unlink(path, callbackInterceptor);
        } else if(Mounts.isMountSubPath(path)) {
            return NativeFS.unlink(path, callbackInterceptor);
        }
        if (typeof path !== 'string') {
            callbackInterceptor(new Errors.EINVAL('Invalid arguments.'));
            return;
        }
        return filerShell.rm(path, { recursive: true }, callbackInterceptor);
    },
    copy: function (src, dst, cb) {
        function callbackInterceptor(...args) {
            let err = args.length >= 1 ? args[0] : null;
            if(!err){
                FsWatch.reportCreateEvent(dst);
            }
            if(cb){
                cb(...args);
            }
        }
        if (_isSubPathOf(src, dst)){
            callbackInterceptor(new Errors.EINVAL(`Error copying: ${dst} cannot be a subpath of ${src}`));
            return ;
        }
        // we have two implementation here even though the globalCopy fn is capable of copying anywhere. Native has its
        // own impl to prevent large number of file node io in fs access impl.
        // Ideally we should have a tauri copy impl too, but to unblock main thread while copy, we need to
        // spawn different threads in rust and write tauri handlers which is pretty complex atm. so instead we will
        // fall back to global copy here and will use node Tauri web socket fs adapter as and when it becomes available.
        if(Mounts.isMountSubPath(src) && Mounts.isMountSubPath(dst)) {
            return NativeFS.copy(src, dst, callbackInterceptor);
        } else {
            return globalCopy(src, dst, callbackInterceptor);
        }
    },
    showSaveDialog: function (options) {
        if(window.__TAURI__){
            return fileSystemLib.openTauriFileSaveDialogueAsync(options);
        }
        throw new Errors.ENOSYS('Phoenix fs showSaveDialog function not yet supported.');
    },
    watch: function (...args) {
        return FsWatch.watch(...args);
    },
    unwatch: function (...args) {
        return FsWatch.unwatch(...args);
    },
    unwatchAll: function (...args) {
        return FsWatch.unwatchAll(...args);
    },
    moveToTrash: function () {
        throw new Errors.ENOSYS('Phoenix fs moveToTrash function not yet supported.');
    },
    mkdirs: function (path, mode, recursive, callback) {
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

        if (!recursive) {
            fileSystemLib.mkdir(path, mode, callback);
        } else if(TauriFS.isTauriSubPath(path)) {
            return TauriFS.mkdirs(path, mode, true, callback);
        } else {
            _mkdir_p(fileSystemLib, path, mode, callback);
        }
    },
    testNodeWsEndpoint: function (wsEndPoint, echoData, echoBuffer) {
        return NodeTauriFS.testNodeWsEndpoint(wsEndPoint, echoData, echoBuffer);
    },
    setNodeWSEndpoint: function (wsEndPoint) {
        return NodeTauriFS.setNodeWSEndpoint(wsEndPoint);
    },
    BYTE_ARRAY_ENCODING: Constants.BYTE_ARRAY_ENCODING,
    MOUNT_POINT_ROOT: Constants.MOUNT_POINT_ROOT,
    TAURI_ROOT: Constants.TAURI_ROOT,
    ERR_CODES: {},
    iconv,
    isEncodingSupported: function (encoding) {
        if(encoding.toLowerCase() === Constants.BYTE_ARRAY_ENCODING){
            return true;
        }
        return iconv.encodingExists(encoding);
    }
};

for(let errCode of Object.values(ERR_CODES.FS_ERROR_CODES)){
    fileSystemLib.ERR_CODES[errCode] = errCode;
}

fileSystemLib.copyFile = fileSystemLib.copy;
fileSystemLib.name = 'phoenixFS';

function _populateSupportedEncodings() {
    if(iconv.encodingExists('utf8')) {
        // we do this as iconv bootstraps this
        const SUPPORTED_ENCODINGS = [];
        for(let encoding of Object.keys(iconv.encodings)) {
            // the Object.keys list contains encoding functions and privates. so filter
            if(iconv.encodingExists(encoding)) {
                SUPPORTED_ENCODINGS.push(encoding);
            }
        }
        SUPPORTED_ENCODINGS.push(fileSystemLib.BYTE_ARRAY_ENCODING);
        fileSystemLib.SUPPORTED_ENCODINGS = SUPPORTED_ENCODINGS;
    }
}

function initFsLib(FilerLib) {
    filerLib = FilerLib;
    FilerFSModified.initFilerLib(filerLib);
    filerShell = new filerLib.fs.Shell();
    globalObject.path = FilerLib.path;
    globalObject.Buffer = FilerLib.Buffer;
    globalObject.iconv = iconv;
    globalObject.fs = fileSystemLib;
    globalObject.fs.path = FilerLib.path;
    globalObject.fs.Buffer = FilerLib.Buffer;
    _populateSupportedEncodings();
    _ensure_mount_directory();
}

module.exports ={
    initFsLib
};
