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
const {Constants} = require('./constants');
const {Mounts} = require('./fslib_mounts');
const {FsWatch} = require('./fslib_watch');
const {globalCopy} = require('./filerlib_copy.js');

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
    readdir: function (...args) { // (path, options, callback)
        let path = args[0];
        if(Mounts.isMountPath(path) || Mounts.isMountSubPath(path)) {
            return NativeFS.readdir(...args);
        }
        return filerLib.fs.readdir(...args);
    },
    stat: function (...args) { // (path, callback)
        let path = args[0];
        if(Mounts.isMountSubPath(path)) {
            return NativeFS.stat(...args);
        }
        return filerLib.fs.stat(...args);
    },
    readFile: function (...args) { // (path, options, callback)
        let path = args[0];
        if(Mounts.isMountSubPath(path)) {
            return NativeFS.readFile(...args);
        }
        return filerLib.fs.readFile(...args);
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

        if(Mounts.isMountSubPath(path)) {
            return NativeFS.writeFile(...args);
        }
        return filerLib.fs.writeFile(...args);
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
        if (_isSubPathOf(oldPath, newPath)){
            callbackInterceptor(new Errors.EINVAL(`Error renaming: ${newPath} cannot be a subpath of ${oldPath}`));
            return ;
        }
        if(Mounts.isMountPath(oldPath) || Mounts.isMountPath(newPath)) {
            throw new Errors.EPERM('Mount root directory cannot be deleted.');
        } else if(Mounts.isMountSubPath(oldPath) && Mounts.isMountSubPath(newPath)) {
            return NativeFS.rename(oldPath, newPath, callbackInterceptor);
        }
        return filerLib.fs.rename(oldPath, newPath, callbackInterceptor);
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

        if(Mounts.isMountPath(path)) {
            callbackInterceptor(new Errors.EPERM('Mount root directory cannot be deleted.'));
            return ;
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
        if(Mounts.isMountSubPath(src) && Mounts.isMountSubPath(dst)) {
            return NativeFS.copy(src, dst, callbackInterceptor);
        } else {
            return globalCopy(src, dst, callbackInterceptor);
        }
    },
    showSaveDialog: function () {
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
        if (typeof recursive !== 'boolean') {
            callback = recursive;
            recursive = false;
        }

        if (typeof callback !== 'function') {
            callback = function () {
                // Do Nothing
            };
        }

        if (!recursive) {
            fileSystemLib.mkdir(path, mode, callback);
        } else {
            _mkdir_p(fileSystemLib, path, mode, callback);
        }
    },
    BYTE_ARRAY_ENCODING: NativeFS.BYTE_ARRAY_ENCODING,
    ERR_NOT_FOUND: ERR_CODES.ERROR_CODES.ENOENT,
    ERR_EISDIR: ERR_CODES.ERROR_CODES.EISDIR,
    ERR_EINVAL: ERR_CODES.ERROR_CODES.EINVAL,
    ERR_FILE_EXISTS: ERR_CODES.ERROR_CODES.EEXIST
};

fileSystemLib.copyFile = fileSystemLib.copy;
fileSystemLib.name = 'phoenixFS';

function initFsLib(FilerLib) {
    filerLib = FilerLib;
    filerShell = new filerLib.fs.Shell();
    globalObject.path = FilerLib.path;
    globalObject.fs = fileSystemLib;

    _ensure_mount_directory();
}

module.exports ={
    initFsLib
};
