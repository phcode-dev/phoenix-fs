var $aE7WH$process = require("process");

function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}
function $parcel$defineInteropFlag(a) {
  Object.defineProperty(a, '__esModule', {value: true, configurable: true});
}
function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}

$parcel$defineInteropFlag(module.exports);

$parcel$export(module.exports, "default", () => $56abb5d3eb174d90$export$2e2bcd8739ae039);
var $9dc8413b1754d208$exports = {};
/*
 * GNU AGPL-3.0 License
 *
 * Copyright (c) 2021 - present core.ai . All rights reserved.
 * Copyright (c) 2012-2015 Rod Vagg (@rvagg)
 * Based on : https://github.com/rvagg/node-errno
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
 */ // jshint ignore: start
/*eslint-env es6*/ /*eslint no-console: 0*/ /*eslint strict: ["error", "global"]*/ /** All phoenix shell errors and their description.
 *
 * This module should be functionally as light weight as possible with minimal deps as it is a shell component.
 * **/ const $9dc8413b1754d208$var$ERROR_CODES = {
    ENOENT: 'ENOENT',
    UNKNOWN: 'UNKNOWN',
    OK: 'OK',
    EOF: 'EOF',
    EADDRINFO: 'EADDRINFO',
    EACCES: 'EACCES',
    EAGAIN: 'EAGAIN',
    EADDRINUSE: 'EADDRINUSE',
    EADDRNOTAVAIL: 'EADDRNOTAVAIL',
    EAFNOSUPPORT: 'EAFNOSUPPORT',
    EALREADY: 'EALREADY',
    EBADF: 'EBADF',
    EBUSY: 'EBUSY',
    ECONNABORTED: 'ECONNABORTED',
    ECONNREFUSED: 'ECONNREFUSED',
    ECONNRESET: 'ECONNRESET',
    EDESTADDRREQ: 'EDESTADDRREQ',
    EFAULT: 'EFAULT',
    EHOSTUNREACH: 'EHOSTUNREACH',
    EINTR: 'EINTR',
    EINVAL: 'EINVAL',
    EISCONN: 'EISCONN',
    EMFILE: 'EMFILE',
    EMSGSIZE: 'EMSGSIZE',
    ENETDOWN: 'ENETDOWN',
    ENETUNREACH: 'ENETUNREACH',
    ENFILE: 'ENFILE',
    ENOBUFS: 'ENOBUFS',
    ENOMEM: 'ENOMEM',
    ENOTDIR: 'ENOTDIR',
    EISDIR: 'EISDIR',
    ENONET: 'ENONET',
    ENOTCONN: 'ENOTCONN',
    ENOTSOCK: 'ENOTSOCK',
    ENOTSUP: 'ENOTSUP',
    ENOSYS: 'ENOSYS',
    EPIPE: 'EPIPE',
    EPROTO: 'EPROTO',
    EPROTONOSUPPORT: 'EPROTONOSUPPORT',
    EPROTOTYPE: 'EPROTOTYPE',
    ETIMEDOUT: 'ETIMEDOUT',
    ECHARSET: 'ECHARSET',
    EAIFAMNOSUPPORT: 'EAIFAMNOSUPPORT',
    EAISERVICE: 'EAISERVICE',
    EAISOCKTYPE: 'EAISOCKTYPE',
    ESHUTDOWN: 'ESHUTDOWN',
    EEXIST: 'EEXIST',
    ESRCH: 'ESRCH',
    ENAMETOOLONG: 'ENAMETOOLONG',
    EPERM: 'EPERM',
    ELOOP: 'ELOOP',
    EXDEV: 'EXDEV',
    ENOTEMPTY: 'ENOTEMPTY',
    ENOSPC: 'ENOSPC',
    EIO: 'EIO',
    EROFS: 'EROFS',
    ENODEV: 'ENODEV',
    ESPIPE: 'ESPIPE',
    ECANCELED: 'ECANCELED'
};
const $9dc8413b1754d208$var$FS_ERROR_CODES = {
    ENOENT: $9dc8413b1754d208$var$ERROR_CODES.ENOENT,
    EOF: $9dc8413b1754d208$var$ERROR_CODES.EOF,
    EACCES: $9dc8413b1754d208$var$ERROR_CODES.EACCES,
    EAGAIN: $9dc8413b1754d208$var$ERROR_CODES.EAGAIN,
    EBADF: $9dc8413b1754d208$var$ERROR_CODES.EBADF,
    EBUSY: $9dc8413b1754d208$var$ERROR_CODES.EBUSY,
    EINVAL: $9dc8413b1754d208$var$ERROR_CODES.EINVAL,
    EMFILE: $9dc8413b1754d208$var$ERROR_CODES.EMFILE,
    ENFILE: $9dc8413b1754d208$var$ERROR_CODES.ENFILE,
    ENOBUFS: $9dc8413b1754d208$var$ERROR_CODES.ENOBUFS,
    ENOTDIR: $9dc8413b1754d208$var$ERROR_CODES.ENOTDIR,
    EISDIR: $9dc8413b1754d208$var$ERROR_CODES.EISDIR,
    ENOSYS: $9dc8413b1754d208$var$ERROR_CODES.ENOSYS,
    ECHARSET: $9dc8413b1754d208$var$ERROR_CODES.ECHARSET,
    EEXIST: $9dc8413b1754d208$var$ERROR_CODES.EEXIST,
    ENAMETOOLONG: $9dc8413b1754d208$var$ERROR_CODES.ENAMETOOLONG,
    EPERM: $9dc8413b1754d208$var$ERROR_CODES.EPERM,
    ELOOP: $9dc8413b1754d208$var$ERROR_CODES.ELOOP,
    EXDEV: $9dc8413b1754d208$var$ERROR_CODES.EXDEV,
    ENOTEMPTY: $9dc8413b1754d208$var$ERROR_CODES.ENOTEMPTY,
    ENOSPC: $9dc8413b1754d208$var$ERROR_CODES.ENOSPC,
    EIO: $9dc8413b1754d208$var$ERROR_CODES.EIO,
    EROFS: $9dc8413b1754d208$var$ERROR_CODES.EROFS,
    ESPIPE: $9dc8413b1754d208$var$ERROR_CODES.ESPIPE,
    ECANCELED: $9dc8413b1754d208$var$ERROR_CODES.ECANCELED //operation canceled
};
const $9dc8413b1754d208$var$ALL_ERRORS = [
    {
        errno: -2,
        code: $9dc8413b1754d208$var$ERROR_CODES.ENOENT,
        description: 'no such file or directory'
    },
    {
        errno: -1,
        code: $9dc8413b1754d208$var$ERROR_CODES.UNKNOWN,
        description: 'unknown error'
    },
    {
        errno: 0,
        code: $9dc8413b1754d208$var$ERROR_CODES.OK,
        description: 'success'
    },
    {
        errno: 1,
        code: $9dc8413b1754d208$var$ERROR_CODES.EOF,
        description: 'end of file'
    },
    {
        errno: 2,
        code: $9dc8413b1754d208$var$ERROR_CODES.EADDRINFO,
        description: 'getaddrinfo error'
    },
    {
        errno: 3,
        code: $9dc8413b1754d208$var$ERROR_CODES.EACCES,
        description: 'permission denied'
    },
    {
        errno: 4,
        code: $9dc8413b1754d208$var$ERROR_CODES.EAGAIN,
        description: 'resource temporarily unavailable'
    },
    {
        errno: 5,
        code: $9dc8413b1754d208$var$ERROR_CODES.EADDRINUSE,
        description: 'address already in use'
    },
    {
        errno: 6,
        code: $9dc8413b1754d208$var$ERROR_CODES.EADDRNOTAVAIL,
        description: 'address not available'
    },
    {
        errno: 7,
        code: $9dc8413b1754d208$var$ERROR_CODES.EAFNOSUPPORT,
        description: 'address family not supported'
    },
    {
        errno: 8,
        code: $9dc8413b1754d208$var$ERROR_CODES.EALREADY,
        description: 'connection already in progress'
    },
    {
        errno: 9,
        code: $9dc8413b1754d208$var$ERROR_CODES.EBADF,
        description: 'bad file descriptor'
    },
    {
        errno: 10,
        code: $9dc8413b1754d208$var$ERROR_CODES.EBUSY,
        description: 'resource busy or locked'
    },
    {
        errno: 11,
        code: $9dc8413b1754d208$var$ERROR_CODES.ECONNABORTED,
        description: 'software caused connection abort'
    },
    {
        errno: 12,
        code: $9dc8413b1754d208$var$ERROR_CODES.ECONNREFUSED,
        description: 'connection refused'
    },
    {
        errno: 13,
        code: $9dc8413b1754d208$var$ERROR_CODES.ECONNRESET,
        description: 'connection reset by peer'
    },
    {
        errno: 14,
        code: $9dc8413b1754d208$var$ERROR_CODES.EDESTADDRREQ,
        description: 'destination address required'
    },
    {
        errno: 15,
        code: $9dc8413b1754d208$var$ERROR_CODES.EFAULT,
        description: 'bad address in system call argument'
    },
    {
        errno: 16,
        code: $9dc8413b1754d208$var$ERROR_CODES.EHOSTUNREACH,
        description: 'host is unreachable'
    },
    {
        errno: 17,
        code: $9dc8413b1754d208$var$ERROR_CODES.EINTR,
        description: 'interrupted system call'
    },
    {
        errno: 18,
        code: $9dc8413b1754d208$var$ERROR_CODES.EINVAL,
        description: 'invalid argument'
    },
    {
        errno: 19,
        code: $9dc8413b1754d208$var$ERROR_CODES.EISCONN,
        description: 'socket is already connected'
    },
    {
        errno: 20,
        code: $9dc8413b1754d208$var$ERROR_CODES.EMFILE,
        description: 'too many open files'
    },
    {
        errno: 21,
        code: $9dc8413b1754d208$var$ERROR_CODES.EMSGSIZE,
        description: 'message/datagram too long'
    },
    {
        errno: 22,
        code: $9dc8413b1754d208$var$ERROR_CODES.ENETDOWN,
        description: 'network is down'
    },
    {
        errno: 23,
        code: $9dc8413b1754d208$var$ERROR_CODES.ENETUNREACH,
        description: 'network is unreachable'
    },
    {
        errno: 24,
        code: $9dc8413b1754d208$var$ERROR_CODES.ENFILE,
        description: 'file table overflow'
    },
    {
        errno: 25,
        code: $9dc8413b1754d208$var$ERROR_CODES.ENOBUFS,
        description: 'no buffer space available'
    },
    {
        errno: 26,
        code: $9dc8413b1754d208$var$ERROR_CODES.ENOMEM,
        description: 'not enough memory/ high virtual memory usage'
    },
    {
        errno: 27,
        code: $9dc8413b1754d208$var$ERROR_CODES.ENOTDIR,
        description: 'not a directory'
    },
    {
        errno: 28,
        code: $9dc8413b1754d208$var$ERROR_CODES.EISDIR,
        description: 'illegal operation on a directory'
    },
    {
        errno: 29,
        code: $9dc8413b1754d208$var$ERROR_CODES.ENONET,
        description: 'machine is not on the network'
    },
    {
        errno: 31,
        code: $9dc8413b1754d208$var$ERROR_CODES.ENOTCONN,
        description: 'socket is not connected'
    },
    {
        errno: 32,
        code: $9dc8413b1754d208$var$ERROR_CODES.ENOTSOCK,
        description: 'socket operation on non-socket'
    },
    {
        errno: 33,
        code: $9dc8413b1754d208$var$ERROR_CODES.ENOTSUP,
        description: 'operation not supported on socket'
    },
    {
        errno: 34,
        code: $9dc8413b1754d208$var$ERROR_CODES.ENOENT,
        description: 'no such file or directory'
    },
    {
        errno: 35,
        code: $9dc8413b1754d208$var$ERROR_CODES.ENOSYS,
        description: 'function not implemented'
    },
    {
        errno: 36,
        code: $9dc8413b1754d208$var$ERROR_CODES.EPIPE,
        description: 'broken pipe'
    },
    {
        errno: 37,
        code: $9dc8413b1754d208$var$ERROR_CODES.EPROTO,
        description: 'protocol error'
    },
    {
        errno: 38,
        code: $9dc8413b1754d208$var$ERROR_CODES.EPROTONOSUPPORT,
        description: 'protocol not supported'
    },
    {
        errno: 39,
        code: $9dc8413b1754d208$var$ERROR_CODES.EPROTOTYPE,
        description: 'protocol wrong type for socket'
    },
    {
        errno: 40,
        code: $9dc8413b1754d208$var$ERROR_CODES.ETIMEDOUT,
        description: 'connection timed out'
    },
    {
        errno: 41,
        code: $9dc8413b1754d208$var$ERROR_CODES.ECHARSET,
        description: 'invalid Unicode character'
    },
    {
        errno: 42,
        code: $9dc8413b1754d208$var$ERROR_CODES.EAIFAMNOSUPPORT,
        description: 'address family for hostname not supported'
    },
    {
        errno: 44,
        code: $9dc8413b1754d208$var$ERROR_CODES.EAISERVICE,
        description: 'servname not supported for ai_socktype'
    },
    {
        errno: 45,
        code: $9dc8413b1754d208$var$ERROR_CODES.EAISOCKTYPE,
        description: 'ai_socktype not supported'
    },
    {
        errno: 46,
        code: $9dc8413b1754d208$var$ERROR_CODES.ESHUTDOWN,
        description: 'cannot send after transport endpoint shutdown'
    },
    {
        errno: 47,
        code: $9dc8413b1754d208$var$ERROR_CODES.EEXIST,
        description: 'file already exists'
    },
    {
        errno: 48,
        code: $9dc8413b1754d208$var$ERROR_CODES.ESRCH,
        description: 'no such process'
    },
    {
        errno: 49,
        code: $9dc8413b1754d208$var$ERROR_CODES.ENAMETOOLONG,
        description: 'name too long'
    },
    {
        errno: 50,
        code: $9dc8413b1754d208$var$ERROR_CODES.EPERM,
        description: 'operation not permitted'
    },
    {
        errno: 51,
        code: $9dc8413b1754d208$var$ERROR_CODES.ELOOP,
        description: 'too many symbolic links encountered'
    },
    {
        errno: 52,
        code: $9dc8413b1754d208$var$ERROR_CODES.EXDEV,
        description: 'cross-device link not permitted'
    },
    {
        errno: 53,
        code: $9dc8413b1754d208$var$ERROR_CODES.ENOTEMPTY,
        description: 'directory not empty'
    },
    {
        errno: 54,
        code: $9dc8413b1754d208$var$ERROR_CODES.ENOSPC,
        description: 'no space left on device'
    },
    {
        errno: 55,
        code: $9dc8413b1754d208$var$ERROR_CODES.EIO,
        description: 'i/o error'
    },
    {
        errno: 56,
        code: $9dc8413b1754d208$var$ERROR_CODES.EROFS,
        description: 'read-only file system'
    },
    {
        errno: 57,
        code: $9dc8413b1754d208$var$ERROR_CODES.ENODEV,
        description: 'no such device'
    },
    {
        errno: 58,
        code: $9dc8413b1754d208$var$ERROR_CODES.ESPIPE,
        description: 'invalid seek'
    },
    {
        errno: 59,
        code: $9dc8413b1754d208$var$ERROR_CODES.ECANCELED,
        description: 'operation canceled'
    }
];
let $9dc8413b1754d208$var$ERRNO_TO_ERROR_MAP = {};
let $9dc8413b1754d208$var$CODE_TO_ERROR_MAP = {};
$9dc8413b1754d208$var$ALL_ERRORS.forEach(function(error) {
    $9dc8413b1754d208$var$ERRNO_TO_ERROR_MAP[error.errno] = error;
    $9dc8413b1754d208$var$CODE_TO_ERROR_MAP[error.code] = error;
});
const $9dc8413b1754d208$var$ERR_CODES = {
    ERROR_CODES: $9dc8413b1754d208$var$ERROR_CODES,
    FS_ERROR_CODES: $9dc8413b1754d208$var$FS_ERROR_CODES,
    ALL_ERRORS: $9dc8413b1754d208$var$ALL_ERRORS,
    ERRNO_TO_ERROR_MAP: $9dc8413b1754d208$var$ERRNO_TO_ERROR_MAP,
    CODE_TO_ERROR_MAP: $9dc8413b1754d208$var$CODE_TO_ERROR_MAP
};
const $9dc8413b1754d208$var$Errors = {};
[
    /**
     * node.js errors - we only use some of these, add as needed.
     */ //'-1:UNKNOWN:unknown error',
    //'0:OK:success',
    //'1:EOF:end of file',
    //'2:EADDRINFO:getaddrinfo error',
    '3:EACCES:permission denied',
    //'4:EAGAIN:resource temporarily unavailable',
    //'5:EADDRINUSE:address already in use',
    //'6:EADDRNOTAVAIL:address not available',
    //'7:EAFNOSUPPORT:address family not supported',
    //'8:EALREADY:connection already in progress',
    '9:EBADF:bad file descriptor',
    '10:EBUSY:resource busy or locked',
    //'11:ECONNABORTED:software caused connection abort',
    //'12:ECONNREFUSED:connection refused',
    //'13:ECONNRESET:connection reset by peer',
    //'14:EDESTADDRREQ:destination address required',
    //'15:EFAULT:bad address in system call argument',
    //'16:EHOSTUNREACH:host is unreachable',
    //'17:EINTR:interrupted system call',
    '18:EINVAL:invalid argument',
    //'19:EISCONN:socket is already connected',
    //'20:EMFILE:too many open files',
    //'21:EMSGSIZE:message too long',
    //'22:ENETDOWN:network is down',
    //'23:ENETUNREACH:network is unreachable',
    //'24:ENFILE:file table overflow',
    //'25:ENOBUFS:no buffer space available',
    //'26:ENOMEM:not enough memory',
    '27:ENOTDIR:not a directory',
    '28:EISDIR:illegal operation on a directory',
    //'29:ENONET:machine is not on the network',
    // errno 30 skipped, as per https://github.com/rvagg/node-errno/blob/master/errno.js
    //'31:ENOTCONN:socket is not connected',
    //'32:ENOTSOCK:socket operation on non-socket',
    //'33:ENOTSUP:operation not supported on socket',
    '34:ENOENT:no such file or directory',
    '35:ENOSYS:function not implemented',
    //'36:EPIPE:broken pipe',
    //'37:EPROTO:protocol error',
    //'38:EPROTONOSUPPORT:protocol not supported',
    //'39:EPROTOTYPE:protocol wrong type for socket',
    //'40:ETIMEDOUT:connection timed out',
    //'41:ECHARSET:invalid Unicode character',
    //'42:EAIFAMNOSUPPORT:address family for hostname not supported',
    // errno 43 skipped, as per https://github.com/rvagg/node-errno/blob/master/errno.js
    //'44:EAISERVICE:servname not supported for ai_socktype',
    //'45:EAISOCKTYPE:ai_socktype not supported',
    //'46:ESHUTDOWN:cannot send after transport endpoint shutdown',
    '47:EEXIST:file already exists',
    //'48:ESRCH:no such process',
    //'49:ENAMETOOLONG:name too long',
    '50:EPERM:operation not permitted',
    '51:ELOOP:too many symbolic links encountered',
    //'52:EXDEV:cross-device link not permitted',
    '53:ENOTEMPTY:directory not empty',
    //'54:ENOSPC:no space left on device',
    '55:EIO:i/o error',
    //'56:EROFS:read-only file system',
    //'57:ENODEV:no such device',
    //'58:ESPIPE:invalid seek',
    //'59:ECANCELED:operation canceled',
    /**
     * Phoenix/Filer specific errors
     */ '1000:ENOTMOUNTED:not mounted',
    '1001:EFILESYSTEMERROR:missing super node, use \'FORMAT\' flag to format filesystem.',
    '1002:ENOATTR:attribute does not exist'
].forEach(function(e) {
    e = e.split(':');
    var errno = +e[0];
    var errName = e[1];
    var defaultMessage = e[2];
    function FilerError(msg, path) {
        Error.call(this);
        this.name = errName;
        this.code = errName;
        this.errno = errno;
        this.message = msg || defaultMessage;
        if (path) this.path = path;
        this.stack = new Error(this.message).stack;
    }
    FilerError.prototype = Object.create(Error.prototype);
    FilerError.prototype.constructor = FilerError;
    FilerError.prototype.toString = function() {
        var pathInfo = this.path ? ', \'' + this.path + '\'' : '';
        return this.name + ': ' + this.message + pathInfo;
    };
    // We expose the error as both Errors.EINVAL and Errors[18]
    $9dc8413b1754d208$var$Errors[errName] = $9dc8413b1754d208$var$Errors[errno] = FilerError;
});
$9dc8413b1754d208$exports = {
    ERR_CODES: $9dc8413b1754d208$var$ERR_CODES,
    Errors: $9dc8413b1754d208$var$Errors
};



var $be6f0e84320366a7$exports = {};
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
 */ // jshint ignore: start
/*eslint no-console: 0*/ /*eslint strict: ["error", "global"]*/ /* jshint ignore:start */ const $be6f0e84320366a7$var$Constants = {
    MOUNT_DEVICE_NAME: 'nativeFsAccess',
    KIND_FILE: 'file',
    KIND_DIRECTORY: 'directory',
    NODE_TYPE_FILE: 'FILE',
    NODE_TYPE_DIRECTORY: 'DIRECTORY',
    IDB_RW_TYPE: 'readwrite',
    MOUNT_POINT_ROOT: '/mnt'
};
$be6f0e84320366a7$exports = {
    Constants: $be6f0e84320366a7$var$Constants
};


const $b640676f6255b52b$var$PHOENIX_MOUNTS_DB_NAME = 'PHOENIX_MOUNTS';
const $b640676f6255b52b$var$STORE_NAME = 'FS_ACCESS';
const $b640676f6255b52b$var$MOUNT_POINTS_KEY = 'MOUNT_POINTS';
const $b640676f6255b52b$var$VERSION_1 = 1;
let $b640676f6255b52b$var$db = null;
let $b640676f6255b52b$var$_currentMounts = {};
async function $b640676f6255b52b$var$_ensureDB() {
    if ($b640676f6255b52b$var$db) return;
    $b640676f6255b52b$var$db = await idb.openDB($b640676f6255b52b$var$PHOENIX_MOUNTS_DB_NAME, $b640676f6255b52b$var$VERSION_1, {
        upgrade (db) {
            db.createObjectStore($b640676f6255b52b$var$STORE_NAME);
        }
    });
}
async function $b640676f6255b52b$var$addMountPoint(mountName, handle) {
    await $b640676f6255b52b$var$_ensureDB();
    const tx = $b640676f6255b52b$var$db.transaction($b640676f6255b52b$var$STORE_NAME, (/*@__PURE__*/$parcel$interopDefault($be6f0e84320366a7$exports)).IDB_RW_TYPE);
    const store = tx.objectStore($b640676f6255b52b$var$STORE_NAME);
    $b640676f6255b52b$var$_currentMounts = await store.get($b640676f6255b52b$var$MOUNT_POINTS_KEY) || {};
    $b640676f6255b52b$var$_currentMounts[mountName] = handle;
    await store.put($b640676f6255b52b$var$_currentMounts, $b640676f6255b52b$var$MOUNT_POINTS_KEY);
    await tx.done;
}
async function $b640676f6255b52b$var$refreshMountPoints() {
    await $b640676f6255b52b$var$_ensureDB();
    const tx = $b640676f6255b52b$var$db.transaction($b640676f6255b52b$var$STORE_NAME, (/*@__PURE__*/$parcel$interopDefault($be6f0e84320366a7$exports)).IDB_RW_TYPE);
    const store = tx.objectStore($b640676f6255b52b$var$STORE_NAME);
    $b640676f6255b52b$var$_currentMounts = await store.get($b640676f6255b52b$var$MOUNT_POINTS_KEY) || {};
    await tx.done;
    return $b640676f6255b52b$var$_currentMounts;
}
function $b640676f6255b52b$var$getMountPoints() {
    return $b640676f6255b52b$var$_currentMounts;
}
const $b640676f6255b52b$var$MountPointsStore = {
    addMountPoint: $b640676f6255b52b$var$addMountPoint,
    getMountPoints: $b640676f6255b52b$var$getMountPoints,
    refreshMountPoints: $b640676f6255b52b$var$refreshMountPoints
};
var $b640676f6255b52b$export$2e2bcd8739ae039 = $b640676f6255b52b$var$MountPointsStore;



const $b8d629ad835bc1c6$var$MOUNT_POINT_CHANGED_NOTIFICATION = 'PHOENIX_MOUNT_POINT_CHANGED_NOTIFICATION';
let $b8d629ad835bc1c6$var$MAX_NUM_MOUNTS = 1000000;
let $b8d629ad835bc1c6$var$_channel = null;
/**
 * Check if the given path is a subpath of the '/mnt' folder.
 * @param path
 */ function $b8d629ad835bc1c6$var$isMountSubPath(path) {
    if (typeof path !== 'string') return false;
    let mntSubPathStart = '/mnt/';
    if (path) {
        path = window.path.normalize(path);
        if (path.startsWith(mntSubPathStart) && path.length > mntSubPathStart.length) return true;
    }
    return false;
}
/**
 * Check if the given path is '/mnt' folder.
 * @param path
 */ function $b8d629ad835bc1c6$var$isMountPath(path) {
    if (typeof path !== 'string') return false;
    if (path) {
        path = window.path.normalize(path);
        if (path === (/*@__PURE__*/$parcel$interopDefault($be6f0e84320366a7$exports)).MOUNT_POINT_ROOT) return true;
    }
    return false;
}
function $b8d629ad835bc1c6$var$_setupBroadcastChannel() {
    if ($b8d629ad835bc1c6$var$_channel) return;
    if (typeof BroadcastChannel === 'undefined') {
        /* eslint no-console: 0 */ console.warn('window.BroadcastChannel not supported. Mount point changes wont reflect across tabs.');
        return;
    }
    $b8d629ad835bc1c6$var$_channel = new BroadcastChannel($b8d629ad835bc1c6$var$MOUNT_POINT_CHANGED_NOTIFICATION);
}
function $b8d629ad835bc1c6$var$_broadcastMountPointChanged() {
    $b8d629ad835bc1c6$var$_setupBroadcastChannel();
    $b8d629ad835bc1c6$var$_channel.postMessage($b8d629ad835bc1c6$var$MOUNT_POINT_CHANGED_NOTIFICATION);
}
function $b8d629ad835bc1c6$var$_listenToMountPointChanges() {
    $b8d629ad835bc1c6$var$_setupBroadcastChannel();
    $b8d629ad835bc1c6$var$_channel.onmessage = async function(event) {
        if (event.data === $b8d629ad835bc1c6$var$MOUNT_POINT_CHANGED_NOTIFICATION) await $b640676f6255b52b$export$2e2bcd8739ae039.refreshMountPoints();
    };
}
/**
 * Checks if the given handleToMount is same as or a subdir of all existing mounts
 * @param handleToMount
 * @returns {*[]} array of details of handleToMount relative to existing mount
 * @private
 */ function $b8d629ad835bc1c6$var$_resolveFileHandle(handleToMount) {
    let allMountPointResolutions = [];
    const currentMounts = $b640676f6255b52b$export$2e2bcd8739ae039.getMountPoints();
    for (const [mountName, handle] of Object.entries(currentMounts))allMountPointResolutions.push(new Promise((resolve)=>{
        const isSameEntryPromise = handle.isSameEntry(handleToMount);
        const isSubEntryPromise = handle.resolve(handleToMount);
        Promise.all([
            isSameEntryPromise,
            isSubEntryPromise
        ]).then((mountDetail)=>{
            let isSameEntry = mountDetail[0] || false;
            let subPathList = mountDetail[1] || [];
            resolve({
                existingMountName: mountName,
                isSameEntry: isSameEntry,
                subPath: subPathList.join('/')
            });
        });
    }));
    return allMountPointResolutions;
}
function $b8d629ad835bc1c6$var$_getPathIfAlreadyMounted(handleToMount) {
    return new Promise((resolve)=>{
        let allMountPointResolutions = $b8d629ad835bc1c6$var$_resolveFileHandle(handleToMount);
        Promise.all(allMountPointResolutions).then((values)=>{
            for(let i = 0; i < values.length; i++){
                let mountName = values[i].existingMountName;
                if (values[i].isSameEntry) {
                    resolve(`${(/*@__PURE__*/$parcel$interopDefault($be6f0e84320366a7$exports)).MOUNT_POINT_ROOT}/${mountName}`);
                    return;
                } else if (values[i].subPath.length >= 1) {
                    resolve(`${(/*@__PURE__*/$parcel$interopDefault($be6f0e84320366a7$exports)).MOUNT_POINT_ROOT}/${mountName}/${values[i].subPath}`);
                    return;
                }
            }
            resolve(null);
        });
    });
}
function $b8d629ad835bc1c6$var$_getNewMountName(handleToMount) {
    let name = handleToMount.name;
    const currentMounts = $b640676f6255b52b$export$2e2bcd8739ae039.getMountPoints();
    if (!currentMounts[name]) return name;
    for(let i = 0; i < $b8d629ad835bc1c6$var$MAX_NUM_MOUNTS; i++){
        let mountName = `${name}_${i}`;
        if (!currentMounts[mountName]) return mountName;
    }
}
/**
 * If the new handle is the same as or a subdir of an existing mount, we return the existing mount path
 * resolved to the given handle. Eg, if a folder `a` with subdir `b` is mounted to `mnt/a`;if we try to mount subdir `b`
 * then, we will return `mnt/a/b` as `b` is a subdirectory of an already mounted directory.
 * @param handleToMount
 * @param currentMounts {mountName1:handle1, ...}
 * @private
 */ function $b8d629ad835bc1c6$var$_mountHandle(handleToMount) {
    return new Promise(async (resolve, reject)=>{
        let path = await $b8d629ad835bc1c6$var$_getPathIfAlreadyMounted(handleToMount);
        if (path) resolve(path);
        else {
            let mountName = $b8d629ad835bc1c6$var$_getNewMountName(handleToMount);
            if (!mountName) reject('Mount name not fount');
            else {
                await $b640676f6255b52b$export$2e2bcd8739ae039.addMountPoint(mountName, handleToMount);
                resolve(`${(/*@__PURE__*/$parcel$interopDefault($be6f0e84320366a7$exports)).MOUNT_POINT_ROOT}/${mountName}`);
            }
        }
    });
}
function $b8d629ad835bc1c6$var$mountNativeFolder(optionalDirHandle, callback) {
    if (!callback) {
        callback = optionalDirHandle;
        optionalDirHandle = null;
    }
    let mountedPath = null;
    let error = null;
    $b640676f6255b52b$export$2e2bcd8739ae039.refreshMountPoints().then(()=>optionalDirHandle || window.showDirectoryPicker()
    ).then((directoryHandle)=>$b8d629ad835bc1c6$var$_mountHandle(directoryHandle)
    ).then((mountPath)=>mountedPath = mountPath
    ).then(()=>$b8d629ad835bc1c6$var$_broadcastMountPointChanged()
    ).catch(function(err) {
        error = new $9dc8413b1754d208$exports.Errors.ENOTMOUNTED(err);
    }).finally(()=>{
        if (callback) callback(error, [
            mountedPath
        ]);
        else if (error) throw new $9dc8413b1754d208$exports.Errors.ENOTMOUNTED(error);
    });
}
async function $b8d629ad835bc1c6$var$_findLeafNode(currentNode, pathArray, currentIndex, callback) {
    let pathLength = pathArray.length;
    if (currentIndex === pathLength) callback(null, currentNode);
    else {
        let childName = pathArray[currentIndex];
        let childDirHandle = null;
        let childFileHandle = null;
        try {
            childDirHandle = await currentNode.getDirectoryHandle(childName);
        } catch (e) {
        // do nothing
        }
        try {
            childFileHandle = await currentNode.getFileHandle(childName);
        } catch (e1) {
        // do nothing
        }
        if (childFileHandle && currentIndex === pathLength - 1) // the last node is a file
        callback(null, childFileHandle);
        else if (childDirHandle) $b8d629ad835bc1c6$var$_findLeafNode(childDirHandle, pathArray, currentIndex + 1, callback);
        else {
            let path = pathArray.join('/');
            callback(new $9dc8413b1754d208$exports.Errors.ENOENT('File/Dir does not exist: ', path));
        }
    }
}
async function $b8d629ad835bc1c6$var$_verifyOrRequestPermission(fileHandle, callback) {
    const options = {
        mode: 'read'
    };
    // Check if permission was already granted. If so, return true.
    try {
        let status = await fileHandle.queryPermission(options);
        if (status === 'granted') {
            callback(true);
            return;
        }
        status = await fileHandle.requestPermission(options);
        if (status === 'granted') callback(true);
        else callback(false);
    } catch (e) {
        callback(false);
    }
}
function $b8d629ad835bc1c6$var$getHandleFromPath(normalisedPath, callback) {
    const pathNodes = normalisedPath.split('/');
    const currentMounts = $b640676f6255b52b$export$2e2bcd8739ae039.getMountPoints();
    if (pathNodes.length < 3 || pathNodes[0] !== '' || pathNodes[1] !== 'mnt') callback(new $9dc8413b1754d208$exports.Errors.EINVAL('Cannot operate on path ' + normalisedPath));
    let mountPoint = currentMounts[pathNodes[2]];
    if (!mountPoint) {
        callback(new $9dc8413b1754d208$exports.Errors.ENOENT('Path does not exist: ', normalisedPath));
        return;
    }
    $b8d629ad835bc1c6$var$_verifyOrRequestPermission(mountPoint, (permitted)=>{
        if (permitted) $b8d629ad835bc1c6$var$_findLeafNode(mountPoint, pathNodes, 3, callback);
        else callback(new $9dc8413b1754d208$exports.Errors.EACCES('permission denied on path: ' + normalisedPath));
    });
}
async function $b8d629ad835bc1c6$var$getHandleFromPathIfPresent(normalisedPath) {
    return new Promise((resolve)=>{
        $b8d629ad835bc1c6$var$getHandleFromPath(normalisedPath, (err, handle)=>{
            if (err) resolve(null);
            else resolve(handle);
        });
    });
}
function $b8d629ad835bc1c6$var$getMountPoints() {
    return $b640676f6255b52b$export$2e2bcd8739ae039.getMountPoints();
}
function $b8d629ad835bc1c6$var$refreshMountPoints() {
    return $b640676f6255b52b$export$2e2bcd8739ae039.refreshMountPoints();
}
$b8d629ad835bc1c6$var$_listenToMountPointChanges();
const $b8d629ad835bc1c6$var$Mounts = {
    mountNativeFolder: $b8d629ad835bc1c6$var$mountNativeFolder,
    isMountPath: $b8d629ad835bc1c6$var$isMountPath,
    isMountSubPath: $b8d629ad835bc1c6$var$isMountSubPath,
    getHandleFromPath: $b8d629ad835bc1c6$var$getHandleFromPath,
    getMountPoints: $b8d629ad835bc1c6$var$getMountPoints,
    refreshMountPoints: $b8d629ad835bc1c6$var$refreshMountPoints,
    getHandleFromPathIfPresent: $b8d629ad835bc1c6$var$getHandleFromPathIfPresent
};
var $b8d629ad835bc1c6$export$2e2bcd8739ae039 = $b8d629ad835bc1c6$var$Mounts;





function $4559ecf940edc78d$var$_dateFromMs(ms) {
    if (ms === null || ms === undefined) return null;
    return new Date(Number(ms));
}
function $4559ecf940edc78d$var$Stats(path, fileNode, devName) {
    this.dev = devName;
    this.node = fileNode.id;
    this.type = fileNode.type;
    this.size = fileNode.size;
    this.nlinks = fileNode.nlinks;
    // Date objects
    this.atime = $4559ecf940edc78d$var$_dateFromMs(fileNode.atime);
    this.mtime = $4559ecf940edc78d$var$_dateFromMs(fileNode.mtime);
    this.ctime = $4559ecf940edc78d$var$_dateFromMs(fileNode.ctime);
    // Unix timestamp MS Numbers
    this.atimeMs = fileNode.atime;
    this.mtimeMs = fileNode.mtime;
    this.ctimeMs = fileNode.ctime;
    this.version = fileNode.version;
    this.mode = fileNode.mode;
    this.name = window.path.basename(path);
}
$4559ecf940edc78d$var$Stats.prototype.isFile = function() {
    return this.type === (/*@__PURE__*/$parcel$interopDefault($be6f0e84320366a7$exports)).NODE_TYPE_FILE;
};
$4559ecf940edc78d$var$Stats.prototype.isDirectory = function() {
    return this.type === (/*@__PURE__*/$parcel$interopDefault($be6f0e84320366a7$exports)).NODE_TYPE_DIRECTORY;
};
$4559ecf940edc78d$var$Stats.prototype.isSymbolicLink = function() {
    return this.type === (/*@__PURE__*/$parcel$interopDefault($be6f0e84320366a7$exports)).NODE_TYPE_SYMBOLIC_LINK;
};
// These will always be false in Filer.
$4559ecf940edc78d$var$Stats.prototype.isSocket = $4559ecf940edc78d$var$Stats.prototype.isFIFO = $4559ecf940edc78d$var$Stats.prototype.isCharacterDevice = $4559ecf940edc78d$var$Stats.prototype.isBlockDevice = function() {
    return false;
};
function $4559ecf940edc78d$var$_getType(handle) {
    switch(handle.kind){
        case (/*@__PURE__*/$parcel$interopDefault($be6f0e84320366a7$exports)).KIND_FILE:
            return (/*@__PURE__*/$parcel$interopDefault($be6f0e84320366a7$exports)).NODE_TYPE_FILE;
        case (/*@__PURE__*/$parcel$interopDefault($be6f0e84320366a7$exports)).KIND_DIRECTORY:
            return (/*@__PURE__*/$parcel$interopDefault($be6f0e84320366a7$exports)).NODE_TYPE_DIRECTORY;
        default:
            return null;
    }
}
async function $4559ecf940edc78d$var$_getDetails(nativeFsHandle) {
    let file = null;
    let details = {};
    switch(nativeFsHandle.kind){
        case (/*@__PURE__*/$parcel$interopDefault($be6f0e84320366a7$exports)).KIND_FILE:
            file = await nativeFsHandle.getFile();
            details.size = file.size;
            details.mtime = file.lastModified;
            return details;
        case (/*@__PURE__*/$parcel$interopDefault($be6f0e84320366a7$exports)).KIND_DIRECTORY:
        default:
            return details;
    }
}
const $4559ecf940edc78d$var$createStatObject = async function(path, handle) {
    let details = await $4559ecf940edc78d$var$_getDetails(handle);
    let fileDetails = {
        type: $4559ecf940edc78d$var$_getType(handle),
        size: details.size,
        mtime: details.mtime
    };
    return new $4559ecf940edc78d$var$Stats(path, fileDetails, (/*@__PURE__*/$parcel$interopDefault($be6f0e84320366a7$exports)).MOUNT_DEVICE_NAME);
};
const $4559ecf940edc78d$var$Utils = {
    createStatObject: $4559ecf940edc78d$var$createStatObject
};
var $4559ecf940edc78d$export$2e2bcd8739ae039 = $4559ecf940edc78d$var$Utils;


async function $5b8d540a3a97b875$var$_listDir(handle, callback) {
    let dirEntryNames = [];
    for await (const [key] of handle.entries())dirEntryNames.push(key);
    if (callback) callback(null, dirEntryNames);
    return dirEntryNames;
}
async function $5b8d540a3a97b875$var$_mkdir(paretDirHandle, dirName, callback) {
    try {
        let childDirHandle = await paretDirHandle.getDirectoryHandle(dirName, {
            create: true
        });
        if (callback) callback(null);
        return childDirHandle;
    } catch (e) {
        if (callback) callback(new $9dc8413b1754d208$exports.Errors.EIO('Filer native fs function not yet supported.', e));
        throw new $9dc8413b1754d208$exports.Errors.EIO('Filer native fs function not yet supported.', e);
    }
}
function $5b8d540a3a97b875$var$mkdir(path, mode, callback) {
    if (arguments.length < 4) callback = mode;
    path = window.path.normalize(path);
    let dirname = window.path.dirname(path);
    let subdirName = window.path.basename(path);
    $b8d629ad835bc1c6$export$2e2bcd8739ae039.getHandleFromPath(dirname, (err, handle)=>{
        if (err) callback(err);
        else if (handle.kind === (/*@__PURE__*/$parcel$interopDefault($be6f0e84320366a7$exports)).KIND_FILE) callback(new $9dc8413b1754d208$exports.Errors.ENOTDIR('Parent path is not a directory.'));
        else $5b8d540a3a97b875$var$_mkdir(handle, subdirName, callback);
    });
}
function $5b8d540a3a97b875$var$readdir(path, options, callback) {
    path = window.path.normalize(path);
    if (typeof options !== 'function') throw new $9dc8413b1754d208$exports.Errors.ENOSYS('Filer readdir options are not yet supported');
    callback = options;
    if (path === (/*@__PURE__*/$parcel$interopDefault($be6f0e84320366a7$exports)).MOUNT_POINT_ROOT) {
        let mountedFolders = Object.keys($b8d629ad835bc1c6$export$2e2bcd8739ae039.getMountPoints());
        callback(null, mountedFolders);
    } else $b8d629ad835bc1c6$export$2e2bcd8739ae039.getHandleFromPath(path, (err, handle)=>{
        if (err) callback(err);
        else if (handle.kind === (/*@__PURE__*/$parcel$interopDefault($be6f0e84320366a7$exports)).KIND_FILE) callback(new $9dc8413b1754d208$exports.Errors.ENOTDIR('Path is not a directory.'));
        else $5b8d540a3a97b875$var$_listDir(handle, callback);
    });
}
function $5b8d540a3a97b875$var$_getDecodedString(buffer, encoding) {
    try {
        return new TextDecoder(encoding).decode(buffer);
    } catch (e) {
        return null;
    }
}
async function $5b8d540a3a97b875$var$_getFileContents(fileHandle, encoding, callback) {
    encoding = encoding || 'utf-8';
    try {
        let file = await fileHandle.getFile();
        let buffer = await file.arrayBuffer();
        if (encoding === $5b8d540a3a97b875$var$BYTE_ARRAY_ENCODING) {
            callback(null, buffer, encoding);
            return;
        }
        let decodedString = $5b8d540a3a97b875$var$_getDecodedString(buffer, encoding);
        if (decodedString !== null) callback(null, decodedString, encoding);
        else callback(new $9dc8413b1754d208$exports.Errors.EIO(`Encoding ${encoding} no supported`));
    } catch (e) {
        callback(e);
    }
}
function $5b8d540a3a97b875$var$_validateFileOptions(options, enc, fileMode) {
    if (!options) options = {
        encoding: enc,
        flag: fileMode
    };
    else if (typeof options === 'function') options = {
        encoding: enc,
        flag: fileMode
    };
    else if (typeof options === 'string') options = {
        encoding: options,
        flag: fileMode
    };
    return options;
}
function $5b8d540a3a97b875$var$readFile(path, options, callback) {
    path = window.path.normalize(path);
    callback = arguments[arguments.length - 1];
    options = $5b8d540a3a97b875$var$_validateFileOptions(options, null, 'r');
    $b8d629ad835bc1c6$export$2e2bcd8739ae039.getHandleFromPath(path, (err, handle)=>{
        if (err) callback(err);
        else if (handle.kind === (/*@__PURE__*/$parcel$interopDefault($be6f0e84320366a7$exports)).KIND_DIRECTORY) callback(new $9dc8413b1754d208$exports.Errors.EISDIR('Path is a directory.'));
        else $5b8d540a3a97b875$var$_getFileContents(handle, options.encoding, callback);
    });
}
function $5b8d540a3a97b875$var$stat(path, callback) {
    path = window.path.normalize(path);
    $b8d629ad835bc1c6$export$2e2bcd8739ae039.getHandleFromPath(path, (err, handle)=>{
        if (err) callback(err);
        else $4559ecf940edc78d$export$2e2bcd8739ae039.createStatObject(path, handle).then((pathStat)=>{
            callback(null, pathStat);
        }).catch((error)=>{
            callback(error);
        });
    });
}
async function $5b8d540a3a97b875$var$_writeFileWithName(paretDirHandle, fileName, encoding, data, callback) {
    try {
        const newFileHandle = await paretDirHandle.getFileHandle(fileName, {
            create: true
        });
        const writable = await newFileHandle.createWritable();
        await writable.write(data);
        await writable.close();
        callback(null);
    } catch (e) {
        callback(e);
    }
}
function $5b8d540a3a97b875$var$writeFile(path, data, options, callback) {
    callback = arguments[arguments.length - 1];
    options = $5b8d540a3a97b875$var$_validateFileOptions(options, 'utf8', 'w');
    if (!buffer.Buffer.isBuffer(data)) {
        if (typeof data === 'number') data = '' + data;
        data = data || '';
        if (typeof data !== 'string') data = buffer.Buffer.from(data.toString());
        else data = buffer.Buffer.from(data || '', options.encoding || 'utf8');
    }
    path = window.path.normalize(path);
    let dirname = window.path.dirname(path);
    let fileName = window.path.basename(path);
    $b8d629ad835bc1c6$export$2e2bcd8739ae039.getHandleFromPath(dirname, (err, handle)=>{
        if (err) callback(err);
        else if (handle.kind === (/*@__PURE__*/$parcel$interopDefault($be6f0e84320366a7$exports)).KIND_FILE) callback(new $9dc8413b1754d208$exports.Errors.ENOTDIR('Parent path is not a directory.'));
        else $5b8d540a3a97b875$var$_writeFileWithName(handle, fileName, options.encoding, data, callback);
    });
}
async function $5b8d540a3a97b875$var$_deleteEntry(dirHandle, entryNameToDelete, callback, recursive = true) {
    try {
        await dirHandle.removeEntry(entryNameToDelete, {
            recursive: recursive
        });
        callback(null);
    } catch (err) {
        callback(err);
    }
}
async function $5b8d540a3a97b875$var$unlink(path, callback) {
    path = window.path.normalize(path);
    let dirPath = window.path.dirname(path);
    let baseName = window.path.basename(path);
    $b8d629ad835bc1c6$export$2e2bcd8739ae039.getHandleFromPath(dirPath, async (err, dirHandle)=>{
        if (err) callback(err);
        else $5b8d540a3a97b875$var$_deleteEntry(dirHandle, baseName, callback);
    });
}
async function $5b8d540a3a97b875$var$_getDestinationHandleForCopy(dst, srcBaseName, handleKindToCreate) {
    return new Promise(async (resolve, reject)=>{
        dst = window.path.normalize(dst);
        let dirPath = window.path.dirname(dst);
        let dstBaseName = window.path.basename(dst);
        let dstHandle = await $b8d629ad835bc1c6$export$2e2bcd8739ae039.getHandleFromPathIfPresent(dst);
        let dstParentHandle = await $b8d629ad835bc1c6$export$2e2bcd8739ae039.getHandleFromPathIfPresent(dirPath);
        if (dstHandle && dstHandle.kind === (/*@__PURE__*/$parcel$interopDefault($be6f0e84320366a7$exports)).KIND_FILE) reject(new $9dc8413b1754d208$exports.Errors.EEXIST(`Destination file already exists: ${dst}`));
        else if (dstHandle && dstHandle.kind === (/*@__PURE__*/$parcel$interopDefault($be6f0e84320366a7$exports)).KIND_DIRECTORY && handleKindToCreate === (/*@__PURE__*/$parcel$interopDefault($be6f0e84320366a7$exports)).KIND_FILE) {
            const fileHandle = await dstHandle.getFileHandle(srcBaseName, {
                create: true
            });
            resolve(fileHandle);
        } else if (dstHandle && dstHandle.kind === (/*@__PURE__*/$parcel$interopDefault($be6f0e84320366a7$exports)).KIND_DIRECTORY && handleKindToCreate === (/*@__PURE__*/$parcel$interopDefault($be6f0e84320366a7$exports)).KIND_DIRECTORY) {
            let dstChildHandle = await $b8d629ad835bc1c6$export$2e2bcd8739ae039.getHandleFromPathIfPresent(`${dst}/${srcBaseName}`);
            if (dstChildHandle) {
                reject(new $9dc8413b1754d208$exports.Errors.EEXIST(`Copy destination already exists: ${dst}/${srcBaseName}`));
                return;
            }
            const directoryHandle = await dstHandle.getDirectoryHandle(srcBaseName, {
                create: true
            });
            resolve(directoryHandle);
        } else if (!dstHandle && dstParentHandle && dstParentHandle.kind === (/*@__PURE__*/$parcel$interopDefault($be6f0e84320366a7$exports)).KIND_DIRECTORY && handleKindToCreate === (/*@__PURE__*/$parcel$interopDefault($be6f0e84320366a7$exports)).KIND_FILE) {
            const fileHandle = await dstParentHandle.getFileHandle(dstBaseName, {
                create: true
            });
            resolve(fileHandle);
        } else if (!dstHandle && dstParentHandle && dstParentHandle.kind === (/*@__PURE__*/$parcel$interopDefault($be6f0e84320366a7$exports)).KIND_DIRECTORY && handleKindToCreate === (/*@__PURE__*/$parcel$interopDefault($be6f0e84320366a7$exports)).KIND_DIRECTORY) {
            const fileHandle = await dstParentHandle.getDirectoryHandle(dstBaseName, {
                create: true
            });
            resolve(fileHandle);
        } else reject(new $9dc8413b1754d208$exports.Errors.ENOENT(`Copy destination doesnt exist: ${dst}`));
    });
}
async function $5b8d540a3a97b875$var$_copyFileFromHandles(srcFileHandle, dstHandle, optionalName) {
    // TODO Add retry mechanisms when copying large folders
    try {
        if (optionalName) dstHandle = await dstHandle.getFileHandle(optionalName, {
            create: true
        });
        const srcFile = await srcFileHandle.getFile();
        const srcStream = await srcFile.stream();
        const writable = await dstHandle.createWritable();
        await srcStream.pipeTo(writable);
    } catch (e) {
        console.error(`Error while copying ${dstHandle.name}/${optionalName} : ${e}`);
        throw e;
    }
}
async function $5b8d540a3a97b875$var$_copyFileWithHandle(srcFileHandle, dst, srcFileName, callback) {
    try {
        let dstHandle = await $5b8d540a3a97b875$var$_getDestinationHandleForCopy(dst, srcFileName, (/*@__PURE__*/$parcel$interopDefault($be6f0e84320366a7$exports)).KIND_FILE);
        await $5b8d540a3a97b875$var$_copyFileFromHandles(srcFileHandle, dstHandle);
        callback(null);
    } catch (e) {
        callback(e);
    }
}
async function $5b8d540a3a97b875$var$_treeCopy(srcFolderHandle, dstFolderHandle, recursive) {
    let allDonePromises = [];
    for await (const [key, srcHandle] of srcFolderHandle.entries()){
        if (srcHandle.kind === (/*@__PURE__*/$parcel$interopDefault($be6f0e84320366a7$exports)).KIND_FILE) allDonePromises.push($5b8d540a3a97b875$var$_copyFileFromHandles(srcHandle, dstFolderHandle, key));
        else if (srcHandle.kind === (/*@__PURE__*/$parcel$interopDefault($be6f0e84320366a7$exports)).KIND_DIRECTORY) {
            const childDirHandle = await $5b8d540a3a97b875$var$_mkdir(dstFolderHandle, key);
            if (recursive && childDirHandle) allDonePromises.push($5b8d540a3a97b875$var$_treeCopy(srcHandle, childDirHandle, recursive));
        }
    }
    await Promise.all(allDonePromises);
}
async function $5b8d540a3a97b875$var$_copyFolderWithHandle(srcFolderHandle, dst, srcFileName, callback, recursive) {
    try {
        let dstFolderHandle = await $5b8d540a3a97b875$var$_getDestinationHandleForCopy(dst, srcFileName, (/*@__PURE__*/$parcel$interopDefault($be6f0e84320366a7$exports)).KIND_DIRECTORY);
        await $5b8d540a3a97b875$var$_treeCopy(srcFolderHandle, dstFolderHandle, recursive);
        callback(null);
    } catch (e) {
        callback(e);
    }
}
async function $5b8d540a3a97b875$var$copy(src, dst, callback, recursive = true) {
    let srcFile = window.path.normalize(src);
    let srcFileName = window.path.basename(srcFile);
    $b8d629ad835bc1c6$export$2e2bcd8739ae039.getHandleFromPath(srcFile, async (err, srcHandle)=>{
        if (err) callback(err);
        else if (srcHandle.kind === (/*@__PURE__*/$parcel$interopDefault($be6f0e84320366a7$exports)).KIND_FILE) return $5b8d540a3a97b875$var$_copyFileWithHandle(srcHandle, dst, srcFileName, callback);
        else if (srcHandle.kind === (/*@__PURE__*/$parcel$interopDefault($be6f0e84320366a7$exports)).KIND_DIRECTORY) return $5b8d540a3a97b875$var$_copyFolderWithHandle(srcHandle, dst, srcFileName, callback, recursive);
        else callback(new $9dc8413b1754d208$exports.Errors.EIO(`Cannot copy src: ${srcFile}`));
    });
}
async function $5b8d540a3a97b875$var$rename(oldPath, newPath, cb) {
    $5b8d540a3a97b875$var$copy(oldPath, newPath, (err)=>{
        if (err) cb(err);
        else setTimeout(()=>{
            $5b8d540a3a97b875$var$unlink(oldPath, cb);
        }, 0);
    });
}
function $5b8d540a3a97b875$var$mountNativeFolder(...args) {
    $b8d629ad835bc1c6$export$2e2bcd8739ae039.mountNativeFolder(...args);
}
function $5b8d540a3a97b875$var$refreshMountPoints() {
    $b8d629ad835bc1c6$export$2e2bcd8739ae039.refreshMountPoints();
}
const $5b8d540a3a97b875$var$BYTE_ARRAY_ENCODING = 'byte-array';
const $5b8d540a3a97b875$var$NativeFS = {
    mountNativeFolder: $5b8d540a3a97b875$var$mountNativeFolder,
    refreshMountPoints: $5b8d540a3a97b875$var$refreshMountPoints,
    mkdir: $5b8d540a3a97b875$var$mkdir,
    readdir: $5b8d540a3a97b875$var$readdir,
    stat: $5b8d540a3a97b875$var$stat,
    readFile: $5b8d540a3a97b875$var$readFile,
    writeFile: $5b8d540a3a97b875$var$writeFile,
    unlink: $5b8d540a3a97b875$var$unlink,
    copy: $5b8d540a3a97b875$var$copy,
    rename: $5b8d540a3a97b875$var$rename,
    BYTE_ARRAY_ENCODING: $5b8d540a3a97b875$var$BYTE_ARRAY_ENCODING
};
var $5b8d540a3a97b875$export$2e2bcd8739ae039 = $5b8d540a3a97b875$var$NativeFS;




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
 */ // jshint ignore: start
/*global BroadcastChannel*/ /*eslint no-console: 0*/ /*eslint strict: ["error", "global"]*/ let $2a0ff8e28d0863ed$var$_channel = null;
let $2a0ff8e28d0863ed$var$_watchListeners = [];
var $4b517aa5dfd170d9$exports = {};
// This is a slightly modified version of the minimatch library
// https://github.com/isaacs/minimatch
// (MIT-licensed, Copyright 2009-2011 Isaac Z. Schlueter)
//
// It has been modified to work properly with RequireJS and
// to export an fnmatch function adapted from the EditorConfig project:
// https://github.com/editorconfig/editorconfig-core-js/
// (MIT-licensed, Copyright 2012 EditorConfig Team)
define(function(r1, exports, module, platform) {
    module.exports = fnmatch;
    minimatch.Minimatch = Minimatch;
    function fnmatch(filepath, glob) {
        var matchOptions = {
            dot: true,
            noext: true
        };
        // brackets #7374: don't try to match base if a directory name is passed in
        if (filepath[filepath.length - 1] !== '/') matchOptions.matchBase = true;
        glob = glob.replace(/\*\*/g, '{*,**/**/**}');
        return minimatch(filepath, glob, matchOptions);
    }
    var LRU = function LRUCache() {
        // not quite an LRU, but still space-limited.
        var cache = {};
        var cnt = 0;
        this.set = function(k, v) {
            cnt++;
            if (cnt >= 100) cache = {};
            cache[k] = v;
        };
        this.get = function(k) {
            return cache[k];
        };
    }, cache1 = minimatch.cache = new LRU({
        max: 100
    }), GLOBSTAR = minimatch.GLOBSTAR = Minimatch.GLOBSTAR = {}, sigmund = function sigmund(obj) {
        return JSON.stringify(obj);
    };
    var path = {
        basename: function(f) {
            f = f.split(/[\/\\]/);
            var e = f.pop();
            if (!e) e = f.pop();
            return e;
        }
    }, qmark = '[^/]', star = qmark + '*?', twoStarDot = '(?:(?!(?:\\\/|^)(?:\\.{1,2})($|\\\/)).)*?', twoStarNoDot = '(?:(?!(?:\\\/|^)\\.).)*?', reSpecials = charSet('().*{}+?[]^$\\!');
    // "abc" -> { a:true, b:true, c:true }
    function charSet(s) {
        return s.split('').reduce(function(set, c) {
            set[c] = true;
            return set;
        }, {});
    }
    // normalizes slashes.
    var slashSplit = /\/+/;
    minimatch.monkeyPatch = monkeyPatch;
    function monkeyPatch() {
        var desc = Object.getOwnPropertyDescriptor(String.prototype, 'match');
        var orig = desc.value;
        desc.value = function(p) {
            if (p instanceof Minimatch) return p.match(this);
            return orig.call(this, p);
        };
        Object.defineProperty(String.prototype, desc);
    }
    minimatch.filter = filter;
    function filter(pattern, options) {
        options = options || {};
        return function(p, i, list) {
            return minimatch(p, pattern, options);
        };
    }
    function ext(a, b) {
        a = a || {};
        b = b || {};
        var t = {};
        Object.keys(b).forEach(function(k) {
            t[k] = b[k];
        });
        Object.keys(a).forEach(function(k) {
            t[k] = a[k];
        });
        return t;
    }
    minimatch.defaults = function(def) {
        if (!def || !Object.keys(def).length) return minimatch;
        var orig = minimatch;
        var m = function minimatch(p, pattern, options) {
            return orig.minimatch(p, pattern, ext(def, options));
        };
        m.Minimatch = function Minimatch(pattern, options) {
            return new orig.Minimatch(pattern, ext(def, options));
        };
        return m;
    };
    Minimatch.defaults = function(def) {
        if (!def || !Object.keys(def).length) return Minimatch;
        return minimatch.defaults(def).Minimatch;
    };
    function minimatch(p, pattern, options) {
        if (typeof pattern !== 'string') throw new TypeError('glob pattern string required');
        if (!options) options = {};
        // shortcut: comments match nothing.
        if (!options.nocomment && pattern.charAt(0) === '#') return false;
        // "" only matches ""
        if (pattern.trim() === '') return p === '';
        return new Minimatch(pattern, options).match(p);
    }
    function Minimatch(pattern, options) {
        if (!(this instanceof Minimatch)) return new Minimatch(pattern, options, cache1);
        if (typeof pattern !== 'string') throw new TypeError('glob pattern string required');
        if (!options) options = {};
        pattern = pattern.trim();
        // windows: need to use /, not \
        // On other platforms, \ is a valid (albeit bad) filename char.
        if (platform === 'win32') pattern = pattern.split('\\').join('/');
        // lru storage.
        // these things aren't particularly big, but walking down the string
        // and turning it into a regexp can get pretty costly.
        var cacheKey = pattern + '\n' + sigmund(options);
        var cached = minimatch.cache.get(cacheKey);
        if (cached) return cached;
        minimatch.cache.set(cacheKey, this);
        this.options = options;
        this.set = [];
        this.pattern = pattern;
        this.regexp = null;
        this.negate = false;
        this.comment = false;
        this.empty = false;
        // make the set of regexps etc.
        this.make();
    }
    Minimatch.prototype.make = make;
    function make() {
        // don't do it more than once.
        if (this._made) return;
        var pattern = this.pattern;
        var options = this.options;
        // empty patterns and comments match nothing.
        if (!options.nocomment && pattern.charAt(0) === '#') {
            this.comment = true;
            return;
        }
        if (!pattern) {
            this.empty = true;
            return;
        }
        // step 1: figure out negation, etc.
        this.parseNegate();
        // step 2: expand braces
        var set = this.globSet = this.braceExpand();
        if (options.debug) console.error(this.pattern, set);
        // step 3: now we have a set, so turn each one into a series of path-portion
        // matching patterns.
        // These will be regexps, except in the case of "**", which is
        // set to the GLOBSTAR object for globstar behavior,
        // and will not contain any / characters
        set = this.globParts = set.map(function(s) {
            return s.split(slashSplit);
        });
        if (options.debug) console.error(this.pattern, set);
        // glob --> regexps
        set = set.map(function(s, si, set) {
            return s.map(this.parse, this);
        }, this);
        if (options.debug) console.error(this.pattern, set);
        // filter out everything that didn't compile properly.
        set = set.filter(function(s) {
            return -1 === s.indexOf(false);
        });
        if (options.debug) console.error(this.pattern, set);
        this.set = set;
    }
    Minimatch.prototype.parseNegate = parseNegate;
    function parseNegate() {
        var pattern = this.pattern, negate = false, options = this.options, negateOffset = 0;
        if (options.nonegate) return;
        for(var i = 0, l = pattern.length; i < l && pattern.charAt(i) === '!'; i++){
            negate = !negate;
            negateOffset++;
        }
        if (negateOffset) this.pattern = pattern.substr(negateOffset);
        this.negate = negate;
    }
    // Brace expansion:
    // a{b,c}d -> abd acd
    // a{b,}c -> abc ac
    // a{0..3}d -> a0d a1d a2d a3d
    // a{b,c{d,e}f}g -> abg acdfg acefg
    // a{b,c}d{e,f}g -> abdeg acdeg abdeg abdfg
    //
    // Invalid sets are not expanded.
    // a{2..}b -> a{2..}b
    // a{b}c -> a{b}c
    minimatch.braceExpand = function(pattern, options) {
        return new Minimatch(pattern, options).braceExpand();
    };
    Minimatch.prototype.braceExpand = braceExpand;
    function braceExpand(pattern, options) {
        options = options || this.options;
        pattern = typeof pattern === 'undefined' ? this.pattern : pattern;
        if (typeof pattern === 'undefined') throw new Error('undefined pattern');
        if (options.nobrace || !pattern.match(/\{.*\}/)) // shortcut. no need to expand.
        return [
            pattern
        ];
        var escaping = false;
        // examples and comments refer to this crazy pattern:
        // a{b,c{d,e},{f,g}h}x{y,z}
        // expected:
        // abxy
        // abxz
        // acdxy
        // acdxz
        // acexy
        // acexz
        // afhxy
        // afhxz
        // aghxy
        // aghxz
        // everything before the first \{ is just a prefix.
        // So, we pluck that off, and work with the rest,
        // and then prepend it to everything we find.
        if (pattern.charAt(0) !== '{') {
            // console.error(pattern)
            var prefix = null;
            for(var i = 0, l = pattern.length; i < l; i++){
                var c = pattern.charAt(i);
                // console.error(i, c)
                if (c === '\\') escaping = !escaping;
                else if (c === '{' && !escaping) {
                    prefix = pattern.substr(0, i);
                    break;
                }
            }
            // actually no sets, all { were escaped.
            if (prefix === null) // console.error("no sets")
            return [
                pattern
            ];
            var tail = braceExpand(pattern.substr(i), options);
            return tail.map(function(t) {
                return prefix + t;
            });
        }
        // now we have something like:
        // {b,c{d,e},{f,g}h}x{y,z}
        // walk through the set, expanding each part, until
        // the set ends.  then, we'll expand the suffix.
        // If the set only has a single member, then'll put the {} back
        // first, handle numeric sets, since they're easier
        var numset = pattern.match(/^\{(-?[0-9]+)\.\.(-?[0-9]+)\}/);
        if (numset) {
            // console.error("numset", numset[1], numset[2])
            var suf = braceExpand(pattern.substr(numset[0].length), options), start = +numset[1], end = +numset[2], inc = start > end ? -1 : 1, set = [];
            for(var i = start; i != end + inc; i += inc)// append all the suffixes
            for(var ii = 0, ll = suf.length; ii < ll; ii++)set.push(i + suf[ii]);
            return set;
        }
        // ok, walk through the set
        // We hope, somewhat optimistically, that there
        // will be a } at the end.
        // If the closing brace isn't found, then the pattern is
        // interpreted as braceExpand("\\" + pattern) so that
        // the leading \{ will be interpreted literally.
        var i = 1 // skip the \{
        , depth = 1, set = [], member = '', sawEnd = false, escaping = false;
        function addMember() {
            set.push(member);
            member = '';
        }
        // console.error("Entering for")
        FOR: for(i = 1, l = pattern.length; i < l; i++){
            var c = pattern.charAt(i);
            // console.error("", i, c)
            if (escaping) {
                escaping = false;
                member += '\\' + c;
            } else switch(c){
                case '\\':
                    escaping = true;
                    continue;
                case '{':
                    depth++;
                    member += '{';
                    continue;
                case '}':
                    depth--;
                    // if this closes the actual set, then we're done
                    if (depth === 0) {
                        addMember();
                        // pluck off the close-brace
                        i++;
                        break FOR;
                    } else {
                        member += c;
                        continue;
                    }
                case ',':
                    if (depth === 1) addMember();
                    else member += c;
                    continue;
                default:
                    member += c;
                    continue;
            } // switch
             // else
        } // for
        // now we've either finished the set, and the suffix is
        // pattern.substr(i), or we have *not* closed the set,
        // and need to escape the leading brace
        if (depth !== 0) // console.error("didn't close", pattern)
        return braceExpand('\\' + pattern, options);
        // x{y,z} -> ["xy", "xz"]
        // console.error("set", set)
        // console.error("suffix", pattern.substr(i))
        var suf = braceExpand(pattern.substr(i), options);
        // ["b", "c{d,e}","{f,g}h"] ->
        //   [["b"], ["cd", "ce"], ["fh", "gh"]]
        var addBraces = set.length === 1;
        // console.error("set pre-expanded", set)
        set = set.map(function(p) {
            return braceExpand(p, options);
        });
        // console.error("set expanded", set)
        // [["b"], ["cd", "ce"], ["fh", "gh"]] ->
        //   ["b", "cd", "ce", "fh", "gh"]
        set = set.reduce(function(l, r) {
            return l.concat(r);
        });
        if (addBraces) set = set.map(function(s) {
            return '{' + s + '}';
        });
        // now attach the suffixes.
        var ret = [];
        for(var i = 0, l = set.length; i < l; i++)for(var ii = 0, ll = suf.length; ii < ll; ii++)ret.push(set[i] + suf[ii]);
        return ret;
    }
    // parse a component of the expanded set.
    // At this point, no pattern may contain "/" in it
    // so we're going to return a 2d array, where each entry is the full
    // pattern, split on '/', and then turned into a regular expression.
    // A regexp is made at the end which joins each array with an
    // escaped /, and another full one which joins each regexp with |.
    //
    // Following the lead of Bash 4.1, note that "**" only has special meaning
    // when it is the *only* thing in a path portion.  Otherwise, any series
    // of * is equivalent to a single *.  Globstar behavior is enabled by
    // default, and can be disabled by setting options.noglobstar.
    Minimatch.prototype.parse = parse;
    var SUBPARSE = {};
    function parse(pattern, isSub) {
        var options = this.options;
        // shortcuts
        if (!options.noglobstar && pattern === '**') return GLOBSTAR;
        if (pattern === '') return '';
        var re = '', hasMagic = !!options.nocase, escaping = false, patternListStack = [], plType, stateChar, inClass = false, reClassStart = -1, classStart = -1, patternStart = pattern.charAt(0) === '.' ? '' // anything
         : options.dot ? '(?!(?:^|\\\/)\\.{1,2}(?:$|\\\/))' : '(?!\\.)';
        function clearStateChar() {
            if (stateChar) {
                // we had some state-tracking character
                // that wasn't consumed by this pass.
                switch(stateChar){
                    case '*':
                        re += star;
                        hasMagic = true;
                        break;
                    case '?':
                        re += qmark;
                        hasMagic = true;
                        break;
                    default:
                        re += '\\' + stateChar;
                        break;
                }
                stateChar = false;
            }
        }
        for(var i = 0, len = pattern.length, c; i < len && (c = pattern.charAt(i)); i++){
            if (options.debug) console.error('%s\t%s %s %j', pattern, i, re, c);
            // skip over any that are escaped.
            if (escaping && reSpecials[c]) {
                re += '\\' + c;
                escaping = false;
                continue;
            }
            switch(c){
                case '/':
                    // completely not allowed, even escaped.
                    // Should already be path-split by now.
                    return false;
                case '\\':
                    clearStateChar();
                    escaping = true;
                    continue;
                // the various stateChar values
                // for the "extglob" stuff.
                case '?':
                case '*':
                case '+':
                case '@':
                case '!':
                    if (options.debug) console.error('%s\t%s %s %j <-- stateChar', pattern, i, re, c);
                    // all of those are literals inside a class, except that
                    // the glob [!a] means [^a] in regexp
                    if (inClass) {
                        if (c === '!' && i === classStart + 1) c = '^';
                        re += c;
                        continue;
                    }
                    // if we already have a stateChar, then it means
                    // that there was something like ** or +? in there.
                    // Handle the stateChar, then proceed with this one.
                    clearStateChar();
                    stateChar = c;
                    // if extglob is disabled, then +(asdf|foo) isn't a thing.
                    // just clear the statechar *now*, rather than even diving into
                    // the patternList stuff.
                    if (options.noext) clearStateChar();
                    continue;
                case '(':
                    if (inClass) {
                        re += '(';
                        continue;
                    }
                    if (!stateChar) {
                        re += '\\(';
                        continue;
                    }
                    plType = stateChar;
                    patternListStack.push({
                        type: plType,
                        start: i - 1,
                        reStart: re.length
                    });
                    // negation is (?:(?!js)[^/]*)
                    re += stateChar === '!' ? '(?:(?!' : '(?:';
                    stateChar = false;
                    continue;
                case ')':
                    if (inClass || !patternListStack.length) {
                        re += '\\)';
                        continue;
                    }
                    hasMagic = true;
                    re += ')';
                    plType = patternListStack.pop().type;
                    // negation is (?:(?!js)[^/]*)
                    // The others are (?:<pattern>)<type>
                    switch(plType){
                        case '!':
                            re += '[^/]*?)';
                            break;
                        case '?':
                        case '+':
                        case '*':
                            re += plType;
                        case '@':
                            break; // the default anyway
                    }
                    continue;
                case '|':
                    if (inClass || !patternListStack.length || escaping) {
                        re += '\\|';
                        escaping = false;
                        continue;
                    }
                    re += '|';
                    continue;
                // these are mostly the same in regexp and glob
                case '[':
                    // swallow any state-tracking char before the [
                    clearStateChar();
                    if (inClass) {
                        re += '\\' + c;
                        continue;
                    }
                    inClass = true;
                    classStart = i;
                    reClassStart = re.length;
                    re += c;
                    continue;
                case ']':
                    //  a right bracket shall lose its special
                    //  meaning and represent itself in
                    //  a bracket expression if it occurs
                    //  first in the list.  -- POSIX.2 2.8.3.2
                    if (i === classStart + 1 || !inClass) {
                        re += '\\' + c;
                        escaping = false;
                        continue;
                    }
                    // finish up the class.
                    hasMagic = true;
                    inClass = false;
                    re += c;
                    continue;
                default:
                    // swallow any state char that wasn't consumed
                    clearStateChar();
                    if (escaping) // no need
                    escaping = false;
                    else if (reSpecials[c] && !(c === '^' && inClass)) re += '\\';
                    re += c;
            } // switch
        } // for
        // handle the case where we left a class open.
        // "[abc" is valid, equivalent to "\[abc"
        if (inClass) {
            // split where the last [ was, and escape it
            // this is a huge pita.  We now have to re-walk
            // the contents of the would-be class to re-translate
            // any characters that were passed through as-is
            var cs = pattern.substr(classStart + 1), sp = this.parse(cs, SUBPARSE);
            re = re.substr(0, reClassStart) + '\\[' + sp[0];
            hasMagic = hasMagic || sp[1];
        }
        // handle the case where we had a +( thing at the *end*
        // of the pattern.
        // each pattern list stack adds 3 chars, and we need to go through
        // and escape any | chars that were passed through as-is for the regexp.
        // Go through and escape them, taking care not to double-escape any
        // | chars that were already escaped.
        var pl;
        while(pl = patternListStack.pop()){
            var tail = re.slice(pl.reStart + 3);
            // maybe some even number of \, then maybe 1 \, followed by a |
            tail = tail.replace(/((?:\\{2})*)(\\?)\|/g, function(_, $1, $2) {
                if (!$2) // the | isn't already escaped, so escape it.
                $2 = '\\';
                // need to escape all those slashes *again*, without escaping the
                // one that we need for escaping the | character.  As it works out,
                // escaping an even number of slashes can be done by simply repeating
                // it exactly after itself.  That's why this trick works.
                //
                // I am sorry that you have to see this.
                return $1 + $1 + $2 + '|';
            });
            // console.error("tail=%j\n   %s", tail, tail)
            var t = pl.type === '*' ? star : pl.type === '?' ? qmark : '\\' + pl.type;
            hasMagic = true;
            re = re.slice(0, pl.reStart) + t + '\\(' + tail;
        }
        // handle trailing things that only matter at the very end.
        clearStateChar();
        if (escaping) // trailing \\
        re += '\\\\';
        // only need to apply the nodot start if the re starts with
        // something that could conceivably capture a dot
        var addPatternStart = false;
        switch(re.charAt(0)){
            case '.':
            case '[':
            case '(':
                addPatternStart = true;
        }
        // if the re is not "" at this point, then we need to make sure
        // it doesn't match against an empty path part.
        // Otherwise a/* will match a/, which it should not.
        if (re !== '' && hasMagic) re = '(?=.)' + re;
        if (addPatternStart) re = patternStart + re;
        // parsing just a piece of a larger pattern.
        if (isSub === SUBPARSE) return [
            re,
            hasMagic
        ];
        // skip the regexp for non-magical patterns
        // unescape anything in it, though, so that it'll be
        // an exact match against a file etc.
        if (!hasMagic) return globUnescape(pattern);
        var flags = options.nocase ? 'i' : '', regExp = new RegExp('^' + re + '$', flags);
        regExp._glob = pattern;
        regExp._src = re;
        return regExp;
    }
    minimatch.makeRe = function(pattern, options) {
        return new Minimatch(pattern, options || {}).makeRe();
    };
    Minimatch.prototype.makeRe = makeRe;
    function makeRe() {
        if (this.regexp || this.regexp === false) return this.regexp;
        // at this point, this.set is a 2d array of partial
        // pattern strings, or "**".
        //
        // It's better to use .match().  This function shouldn't
        // be used, really, but it's pretty convenient sometimes,
        // when you just want to work with a regex.
        var set = this.set;
        if (!set.length) return this.regexp = false;
        var options = this.options;
        var twoStar = options.noglobstar ? star : options.dot ? twoStarDot : twoStarNoDot, flags = options.nocase ? 'i' : '';
        var re = set.map(function(pattern) {
            return pattern.map(function(p) {
                return p === GLOBSTAR ? twoStar : typeof p === 'string' ? regExpEscape(p) : p._src;
            }).join('\\\/');
        }).join('|');
        // must match entire pattern
        // ending in a * or ** will make it less strict.
        re = '^(?:' + re + ')$';
        // can match anything, as long as it's not this.
        if (this.negate) re = '^(?!' + re + ').*$';
        try {
            return this.regexp = new RegExp(re, flags);
        } catch (ex) {
            return this.regexp = false;
        }
    }
    minimatch.match = function(list, pattern, options) {
        var mm = new Minimatch(pattern, options);
        list = list.filter(function(f) {
            return mm.match(f);
        });
        if (options.nonull && !list.length) list.push(pattern);
        return list;
    };
    Minimatch.prototype.match = match;
    function match(f, partial) {
        // console.error("match", f, this.pattern)
        // short-circuit in the case of busted things.
        // comments, etc.
        if (this.comment) return false;
        if (this.empty) return f === '';
        if (f === '/' && partial) return true;
        var options = this.options;
        // windows: need to use /, not \
        // On other platforms, \ is a valid (albeit bad) filename char.
        if (platform === 'win32') f = f.split('\\').join('/');
        // treat the test path as a set of pathparts.
        f = f.split(slashSplit);
        if (options.debug) console.error(this.pattern, 'split', f);
        // just ONE of the pattern sets in this.set needs to match
        // in order for it to be valid.  If negating, then just one
        // match means that we have failed.
        // Either way, return on the first hit.
        var set = this.set;
        // console.error(this.pattern, "set", set)
        for(var i = 0, l = set.length; i < l; i++){
            var pattern = set[i];
            var hit = this.matchOne(f, pattern, partial);
            if (hit) {
                if (options.flipNegate) return true;
                return !this.negate;
            }
        }
        // didn't get any hits.  this is success if it's a negative
        // pattern, failure otherwise.
        if (options.flipNegate) return false;
        return this.negate;
    }
    // set partial to true to test if, for example,
    // "/a/b" matches the start of "/*/b/*/d"
    // Partial means, if you run out of file before you run
    // out of pattern, then that's fine, as long as all
    // the parts match.
    Minimatch.prototype.matchOne = function(file, pattern, partial) {
        var options = this.options;
        if (options.debug) console.error('matchOne', {
            'this': this,
            file: file,
            pattern: pattern
        });
        if (options.matchBase && pattern.length === 1) file = path.basename(file.join('/')).split('/');
        if (options.debug) console.error('matchOne', file.length, pattern.length);
        for(var fi = 0, pi = 0, fl = file.length, pl = pattern.length; fi < fl && pi < pl; fi++, pi++){
            if (options.debug) console.error('matchOne loop');
            var p = pattern[pi], f = file[fi];
            if (options.debug) console.error(pattern, p, f);
            // should be impossible.
            // some invalid regexp stuff in the set.
            if (p === false) return false;
            if (p === GLOBSTAR) {
                if (options.debug) console.error('GLOBSTAR', [
                    pattern,
                    p,
                    f
                ]);
                // "**"
                // a/**/b/**/c would match the following:
                // a/b/x/y/z/c
                // a/x/y/z/b/c
                // a/b/x/b/x/c
                // a/b/c
                // To do this, take the rest of the pattern after
                // the **, and see if it would match the file remainder.
                // If so, return success.
                // If not, the ** "swallows" a segment, and try again.
                // This is recursively awful.
                //
                // a/**/b/**/c matching a/b/x/y/z/c
                // - a matches a
                // - doublestar
                //   - matchOne(b/x/y/z/c, b/**/c)
                //     - b matches b
                //     - doublestar
                //       - matchOne(x/y/z/c, c) -> no
                //       - matchOne(y/z/c, c) -> no
                //       - matchOne(z/c, c) -> no
                //       - matchOne(c, c) yes, hit
                var fr = fi, pr = pi + 1;
                if (pr === pl) {
                    if (options.debug) console.error('** at the end');
                    // a ** at the end will just swallow the rest.
                    // We have found a match.
                    // however, it will not swallow /.x, unless
                    // options.dot is set.
                    // . and .. are *never* matched by **, for explosively
                    // exponential reasons.
                    for(; fi < fl; fi++){
                        if (file[fi] === '.' || file[fi] === '..' || !options.dot && file[fi].charAt(0) === '.') return false;
                    }
                    return true;
                }
                // ok, let's see if we can swallow whatever we can.
                WHILE: while(fr < fl){
                    var swallowee = file[fr];
                    if (options.debug) console.error('\nglobstar while', file, fr, pattern, pr, swallowee);
                    // XXX remove this slice.  Just pass the start index.
                    if (this.matchOne(file.slice(fr), pattern.slice(pr), partial)) {
                        if (options.debug) console.error('globstar found match!', fr, fl, swallowee);
                        // found a match.
                        return true;
                    } else {
                        // can't swallow "." or ".." ever.
                        // can only swallow ".foo" when explicitly asked.
                        if (swallowee === '.' || swallowee === '..' || !options.dot && swallowee.charAt(0) === '.') {
                            if (options.debug) console.error('dot detected!', file, fr, pattern, pr);
                            break WHILE;
                        }
                        // ** swallows a segment, and continue.
                        if (options.debug) console.error('globstar swallow a segment, and continue');
                        fr++;
                    }
                }
                // no match was found.
                // However, in partial mode, we can't say this is necessarily over.
                // If there's more *pattern* left, then 
                if (partial) {
                    // ran out of file
                    // console.error("\n>>> no match, partial?", file, fr, pattern, pr)
                    if (fr === fl) return true;
                }
                return false;
            }
            // something other than **
            // non-magic patterns just have to match exactly
            // patterns with magic have been turned into regexps.
            var hit;
            if (typeof p === 'string') {
                if (options.nocase) hit = f.toLowerCase() === p.toLowerCase();
                else hit = f === p;
                if (options.debug) console.error('string match', p, f, hit);
            } else {
                hit = f.match(p);
                if (options.debug) console.error('pattern match', p, f, hit);
            }
            if (!hit) return false;
        }
        // Note: ending in / means that we'll get a final ""
        // at the end of the pattern.  This can only match a
        // corresponding "" at the end of the file.
        // If the file ends in /, then it can only match a
        // a pattern that ends in /, unless the pattern just
        // doesn't have any more for it. But, a/b/ should *not*
        // match "a/b/*", even though "" matches against the
        // [^/]*? pattern, except in partial mode, where it might
        // simply not be reached yet.
        // However, a/b/ should still satisfy a/*
        // now either we fell off the end of the pattern, or we're done.
        if (fi === fl && pi === pl) // ran out of pattern and filename at the same time.
        // an exact hit!
        return true;
        else if (fi === fl) // ran out of file, but still had pattern left.
        // this is ok if we're doing the match as part of
        // a glob fs traversal.
        return partial;
        else if (pi === pl) {
            // ran out of pattern, still have file left.
            // this is only acceptable if we're on the very last
            // empty segment of a file with a trailing slash.
            // a/* should match a/b/
            var emptyFileEnd = fi === fl - 1 && file[fi] === '';
            return emptyFileEnd;
        }
        // should be unreachable.
        throw new Error('wtf?');
    };
    // replace stuff like \* with *
    function globUnescape(s) {
        return s.replace(/\\(.)/g, '$1');
    }
    function regExpEscape(s) {
        return s.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
    }
});


const $2a0ff8e28d0863ed$var$WATCH_EVENT_NOTIFICATION = 'PHOENIX_WATCH_EVENT_NOTIFICATION';
const $2a0ff8e28d0863ed$var$WATCH_EVENT_CREATED = 'created';
const $2a0ff8e28d0863ed$var$WATCH_EVENT_DELETED = 'deleted';
const $2a0ff8e28d0863ed$var$WATCH_EVENT_CHANGED = 'changed';
function $2a0ff8e28d0863ed$var$_setupBroadcastChannel() {
    if ($2a0ff8e28d0863ed$var$_channel) return;
    if (typeof BroadcastChannel === 'undefined') {
        /* eslint no-console: 0 */ console.warn('window.BroadcastChannel not supported. File system watch events across tabs wont be synced.');
        return;
    }
    $2a0ff8e28d0863ed$var$_channel = new BroadcastChannel($2a0ff8e28d0863ed$var$WATCH_EVENT_NOTIFICATION);
}
function $2a0ff8e28d0863ed$var$_broadcastWatchEvent(event) {
    $2a0ff8e28d0863ed$var$_setupBroadcastChannel();
    $2a0ff8e28d0863ed$var$_channel.postMessage(event);
}
function $2a0ff8e28d0863ed$var$_isAnIgnoredPath(path, ignoreGlobList) {
    if (ignoreGlobList && ignoreGlobList.length > 0) for (const glob of ignoreGlobList){
        if ($4b517aa5dfd170d9$exports(path, glob)) return true;
    }
    return false;
}
function $2a0ff8e28d0863ed$var$_isSameOrSubDirectory(parent, child) {
    return !window.path.relative(parent, child).startsWith('..');
}
// event{ path, eventName}
function $2a0ff8e28d0863ed$var$_processFsWatchEvent(event, broadcast = true) {
    if (broadcast) $2a0ff8e28d0863ed$var$_broadcastWatchEvent(event);
    for (const listener of $2a0ff8e28d0863ed$var$_watchListeners)if (listener.callback && $2a0ff8e28d0863ed$var$_isSameOrSubDirectory(listener.path, event.path) && !$2a0ff8e28d0863ed$var$_isAnIgnoredPath(event.path, listener.ignoreGlobList)) listener.callback(event.event, event.parentDirPath, event.entryName, event.path);
}
function $2a0ff8e28d0863ed$var$_listenToExternalFsWatchEvents() {
    $2a0ff8e28d0863ed$var$_setupBroadcastChannel();
    $2a0ff8e28d0863ed$var$_channel.onmessage = async function(event) {
        console.log('External fs watch event: ', event.data);
        $2a0ff8e28d0863ed$var$_processFsWatchEvent(event.data, false);
    };
}
function $2a0ff8e28d0863ed$var$watch(path, ignoreGlobList, changeCallback, callback) {
    if (changeCallback) $2a0ff8e28d0863ed$var$_watchListeners.push({
        path: path,
        ignoreGlobList: ignoreGlobList,
        callback: changeCallback
    });
    callback();
}
function $2a0ff8e28d0863ed$var$_triggerEvent(path, eventType) {
    let pathLib = window.path;
    path = pathLib.normalize(path);
    let event = {
        event: eventType,
        parentDirPath: `${pathLib.dirname(path)}/`,
        entryName: pathLib.basename(path),
        path: path
    };
    $2a0ff8e28d0863ed$var$_processFsWatchEvent(event);
}
function $2a0ff8e28d0863ed$var$reportUnlinkEvent(path) {
    $2a0ff8e28d0863ed$var$_triggerEvent(path, $2a0ff8e28d0863ed$var$WATCH_EVENT_DELETED);
}
function $2a0ff8e28d0863ed$var$reportChangeEvent(path) {
    $2a0ff8e28d0863ed$var$_triggerEvent(path, $2a0ff8e28d0863ed$var$WATCH_EVENT_CHANGED);
}
function $2a0ff8e28d0863ed$var$reportCreateEvent(path) {
    $2a0ff8e28d0863ed$var$_triggerEvent(path, $2a0ff8e28d0863ed$var$WATCH_EVENT_CREATED);
}
function $2a0ff8e28d0863ed$var$unwatch(path, callback) {
    $2a0ff8e28d0863ed$var$_watchListeners = $2a0ff8e28d0863ed$var$_watchListeners.filter(function(item) {
        return item.path !== path;
    });
    callback();
}
function $2a0ff8e28d0863ed$var$unwatchAll(callback) {
    $2a0ff8e28d0863ed$var$_watchListeners = [];
    callback();
}
$2a0ff8e28d0863ed$var$_listenToExternalFsWatchEvents();
const $2a0ff8e28d0863ed$var$FsWatch = {
    watch: $2a0ff8e28d0863ed$var$watch,
    unwatch: $2a0ff8e28d0863ed$var$unwatch,
    unwatchAll: $2a0ff8e28d0863ed$var$unwatchAll,
    reportUnlinkEvent: $2a0ff8e28d0863ed$var$reportUnlinkEvent,
    reportChangeEvent: $2a0ff8e28d0863ed$var$reportChangeEvent,
    reportCreateEvent: $2a0ff8e28d0863ed$var$reportCreateEvent
};
var $2a0ff8e28d0863ed$export$2e2bcd8739ae039 = $2a0ff8e28d0863ed$var$FsWatch;



var $5333e7e2fa140f46$require$ERR_CODES = $9dc8413b1754d208$exports.ERR_CODES;
var $5333e7e2fa140f46$require$Errors = $9dc8413b1754d208$exports.Errors;
const $5333e7e2fa140f46$var$ERROR_CODES = $5333e7e2fa140f46$require$ERR_CODES.ERROR_CODES;
async function $5333e7e2fa140f46$var$_stat(path) {
    return new Promise(async (resolve, reject)=>{
        fs.stat(path, async (err, stat)=>{
            if (err && err.code === $5333e7e2fa140f46$var$ERROR_CODES.ENOENT) resolve(null);
            else if (err) reject(err);
            else resolve(stat);
        });
    });
}
async function $5333e7e2fa140f46$var$_mrdirIfNotPresent(path) {
    return new Promise(async (resolve, reject)=>{
        fs.mkdir(path, async (err)=>{
            err && err.code !== $5333e7e2fa140f46$var$ERROR_CODES.EEXIST ? reject(err) : resolve();
        });
    });
}
async function $5333e7e2fa140f46$var$_readDir(path) {
    return new Promise(async (resolve, reject)=>{
        fs.readdir(path, async (err, listing)=>{
            if (err) reject(err);
            else resolve(listing);
        });
    });
}
async function $5333e7e2fa140f46$var$_copyFileContents(src, dst) {
    return new Promise(async (resolve, reject)=>{
        fs.readFile(src, async (err, data)=>{
            if (err) reject(err);
            else fs.writeFile(dst, data, function(writeErr) {
                writeErr ? reject(writeErr) : resolve();
            });
        });
    });
}
async function $5333e7e2fa140f46$var$_copyFile(srcFile, dst) {
    let dstStat = await $5333e7e2fa140f46$var$_stat(dst);
    if (!dstStat) {
        let parentDir = window.path.dirname(dst);
        let dstFileName = window.path.basename(dst);
        dstStat = await $5333e7e2fa140f46$var$_stat(parentDir);
        if (dstStat && dstStat.isDirectory()) {
            let dstFilePath = `${parentDir}/${dstFileName}`;
            await $5333e7e2fa140f46$var$_copyFileContents(srcFile, dstFilePath);
            return;
        } else throw new $5333e7e2fa140f46$require$Errors.EIO(`_copyFile Cannot create destination file: ${dst}`);
    }
    let srcFileName = window.path.basename(srcFile);
    if (dstStat && dstStat.isDirectory()) {
        let dstFilePath = `${dst}/${srcFileName}`;
        await $5333e7e2fa140f46$var$_copyFileContents(srcFile, dstFilePath);
    } else if (dstStat && dstStat.isFile()) throw new $5333e7e2fa140f46$require$Errors.EEXIST(`_copyFile Destination file already exists: ${dst}`);
    else throw new $5333e7e2fa140f46$require$Errors.EIO(`_copyFile Cannot copy file, unknown destination: ${srcFile} to ${dst}`);
}
async function $5333e7e2fa140f46$var$_copyTree(src, dst) {
    let srcEntries = await $5333e7e2fa140f46$var$_readDir(src);
    for (let entry of srcEntries){
        let entryPath = `${src}/${entry}`;
        let dstPath = `${dst}/${entry}`;
        let srcStat = await $5333e7e2fa140f46$var$_stat(entryPath);
        if (srcStat.isFile()) await $5333e7e2fa140f46$var$_copyFileContents(entryPath, dstPath);
        else {
            await $5333e7e2fa140f46$var$_mrdirIfNotPresent(dstPath);
            await $5333e7e2fa140f46$var$_copyTree(entryPath, dstPath);
        }
    }
}
async function $5333e7e2fa140f46$var$_copyFolder(srcFolder, dst) {
    let dstStat = await $5333e7e2fa140f46$var$_stat(dst);
    if (dstStat && dstStat.isFile()) throw new $5333e7e2fa140f46$require$Errors.EEXIST(`Destination file already exists: ${dst}`);
    else if (dstStat && dstStat.isDirectory()) await $5333e7e2fa140f46$var$_copyTree(srcFolder, dst);
    else throw new $5333e7e2fa140f46$require$Errors.ENONET(`Destination folder does not exist: ${dst}`);
}
async function $5333e7e2fa140f46$var$copy(src, dst, callback) {
    try {
        let srcStat = await $5333e7e2fa140f46$var$_stat(src);
        if (!srcStat) {
            callback(new $5333e7e2fa140f46$require$Errors.EIO(`Cannot copy src: ${src}`));
            return;
        }
        if (srcStat.isFile()) {
            await $5333e7e2fa140f46$var$_copyFile(src, dst);
            callback(null);
        } else if (srcStat.isDirectory()) {
            await $5333e7e2fa140f46$var$_copyFolder(src, dst);
            callback(null);
        }
    } catch (e) {
        callback(new $5333e7e2fa140f46$require$Errors.EIO(`${e}: Cannot copy src: ${src} to ${dst}`));
    }
}
function $5333e7e2fa140f46$var$filerCopy(src, dst, cb) {
    $5333e7e2fa140f46$var$copy(window.path.normalize(src), window.path.normalize(dst), cb);
}
var $5333e7e2fa140f46$export$2e2bcd8739ae039 = $5333e7e2fa140f46$var$filerCopy;



let $56abb5d3eb174d90$var$filerLib = null;
let $56abb5d3eb174d90$var$filerShell = null;
/**
 * Offers functionality similar to mkdir -p
 *
 * Asynchronous operation. No arguments other than a possible exception
 * are given to the completion callback.
 */ function $56abb5d3eb174d90$var$mkdir_p(fsLib, path, mode, callback, position) {
    const osSep = '/';
    const parts = $56abb5d3eb174d90$var$filerLib.path.normalize(path).split(osSep);
    mode = mode || $aE7WH$process.umask();
    position = position || 0;
    if (position >= parts.length) return callback(null);
    var directory = parts.slice(0, position + 1).join(osSep) || osSep;
    fsLib.stat(directory, function(err) {
        if (err === null) $56abb5d3eb174d90$var$mkdir_p(fsLib, path, mode, callback, position + 1);
        else fsLib.mkdir(directory, mode, function(error) {
            if (error && error.code !== 'EEXIST') return callback(error);
            else $56abb5d3eb174d90$var$mkdir_p(fsLib, path, mode, callback, position + 1);
        });
    });
}
function $56abb5d3eb174d90$var$_ensure_mount_directory() {
    $56abb5d3eb174d90$var$fileSystemLib.mkdirs((/*@__PURE__*/$parcel$interopDefault($be6f0e84320366a7$exports)).MOUNT_POINT_ROOT);
    $5b8d540a3a97b875$export$2e2bcd8739ae039.refreshMountPoints();
}
function $56abb5d3eb174d90$var$_getFirstFunctionIndex(argsArray) {
    for(let i = 0; i < argsArray.length; i++){
        if (typeof argsArray[i] === 'function') return i;
    }
    return -1;
}
const $56abb5d3eb174d90$var$fileSystemLib = {
    mountNativeFolder: async function(...args) {
        return $5b8d540a3a97b875$export$2e2bcd8739ae039.mountNativeFolder(...args);
    },
    readdir: function(...args) {
        let path = args[0];
        if ($b8d629ad835bc1c6$export$2e2bcd8739ae039.isMountPath(path) || $b8d629ad835bc1c6$export$2e2bcd8739ae039.isMountSubPath(path)) return $5b8d540a3a97b875$export$2e2bcd8739ae039.readdir(...args);
        return $56abb5d3eb174d90$var$filerLib.fs.readdir(...args);
    },
    stat: function(...args) {
        let path = args[0];
        if ($b8d629ad835bc1c6$export$2e2bcd8739ae039.isMountSubPath(path)) return $5b8d540a3a97b875$export$2e2bcd8739ae039.stat(...args);
        return $56abb5d3eb174d90$var$filerLib.fs.stat(...args);
    },
    readFile: function(...args) {
        let path = args[0];
        if ($b8d629ad835bc1c6$export$2e2bcd8739ae039.isMountSubPath(path)) return $5b8d540a3a97b875$export$2e2bcd8739ae039.readFile(...args);
        return $56abb5d3eb174d90$var$filerLib.fs.readFile(...args);
    },
    writeFile: function(...args) {
        let path = args[0];
        function callbackInterceptor(...interceptedArgs) {
            let err = interceptedArgs.length >= 1 ? interceptedArgs[0] : null;
            if (!err) $2a0ff8e28d0863ed$export$2e2bcd8739ae039.reportChangeEvent(path);
            if (args.originalCallback) args.originalCallback(...interceptedArgs);
        }
        let callbackIndex = $56abb5d3eb174d90$var$_getFirstFunctionIndex(args);
        if (callbackIndex !== -1) {
            args.originalCallback = args[callbackIndex];
            args[callbackIndex] = callbackInterceptor;
        }
        if ($b8d629ad835bc1c6$export$2e2bcd8739ae039.isMountSubPath(path)) return $5b8d540a3a97b875$export$2e2bcd8739ae039.writeFile(...args);
        return $56abb5d3eb174d90$var$filerLib.fs.writeFile(...args);
    },
    mkdir: function(...args) {
        let path = args[0];
        function callbackInterceptor(...interceptedArgs) {
            let err = interceptedArgs.length >= 1 ? interceptedArgs[0] : null;
            if (!err) $2a0ff8e28d0863ed$export$2e2bcd8739ae039.reportCreateEvent(path);
            if (args.originalCallback) args.originalCallback(...interceptedArgs);
        }
        let callbackIndex = $56abb5d3eb174d90$var$_getFirstFunctionIndex(args);
        if (callbackIndex !== -1) {
            args.originalCallback = args[callbackIndex];
            args[callbackIndex] = callbackInterceptor;
        }
        if ($b8d629ad835bc1c6$export$2e2bcd8739ae039.isMountSubPath(path)) return $5b8d540a3a97b875$export$2e2bcd8739ae039.mkdir(...args);
        return $56abb5d3eb174d90$var$filerLib.fs.mkdir(...args);
    },
    rename: function(oldPath, newPath, cb) {
        function callbackInterceptor(...args) {
            let err = args.length >= 1 ? args[0] : null;
            if (!err) {
                $2a0ff8e28d0863ed$export$2e2bcd8739ae039.reportUnlinkEvent(oldPath);
                $2a0ff8e28d0863ed$export$2e2bcd8739ae039.reportCreateEvent(newPath);
            }
            if (cb) cb(...args);
        }
        if ($b8d629ad835bc1c6$export$2e2bcd8739ae039.isMountPath(oldPath) || $b8d629ad835bc1c6$export$2e2bcd8739ae039.isMountPath(newPath)) throw new $9dc8413b1754d208$exports.Errors.EPERM('Mount root directory cannot be deleted.');
        else if ($b8d629ad835bc1c6$export$2e2bcd8739ae039.isMountSubPath(oldPath) && $b8d629ad835bc1c6$export$2e2bcd8739ae039.isMountSubPath(newPath)) return $5b8d540a3a97b875$export$2e2bcd8739ae039.rename(oldPath, newPath, callbackInterceptor);
        return $56abb5d3eb174d90$var$filerLib.fs.rename(oldPath, newPath, callbackInterceptor);
    },
    unlink: function(path, cb) {
        function callbackInterceptor(...args) {
            let err = args.length >= 1 ? args[0] : null;
            if (!err) $2a0ff8e28d0863ed$export$2e2bcd8739ae039.reportUnlinkEvent(path);
            if (cb) cb(...args);
        }
        if ($b8d629ad835bc1c6$export$2e2bcd8739ae039.isMountPath(path)) throw new $9dc8413b1754d208$exports.Errors.EPERM('Mount root directory cannot be deleted.');
        else if ($b8d629ad835bc1c6$export$2e2bcd8739ae039.isMountSubPath(path)) return $5b8d540a3a97b875$export$2e2bcd8739ae039.unlink(path, callbackInterceptor);
        if (typeof path !== 'string') {
            callbackInterceptor(new $9dc8413b1754d208$exports.Errors.EINVAL('Invalid arguments.'));
            return;
        }
        return $56abb5d3eb174d90$var$filerShell.rm(path, {
            recursive: true
        }, callbackInterceptor);
    },
    copy: function(src, dst, cb) {
        function callbackInterceptor(...args) {
            let err = args.length >= 1 ? args[0] : null;
            if (!err) $2a0ff8e28d0863ed$export$2e2bcd8739ae039.reportCreateEvent(dst);
            if (cb) cb(...args);
        }
        if ($b8d629ad835bc1c6$export$2e2bcd8739ae039.isMountSubPath(src) && $b8d629ad835bc1c6$export$2e2bcd8739ae039.isMountSubPath(dst)) return $5b8d540a3a97b875$export$2e2bcd8739ae039.copy(src, dst, callbackInterceptor);
        else if (!$b8d629ad835bc1c6$export$2e2bcd8739ae039.isMountSubPath(src) && !$b8d629ad835bc1c6$export$2e2bcd8739ae039.isMountSubPath(dst)) return $5333e7e2fa140f46$export$2e2bcd8739ae039(src, dst, callbackInterceptor);
        throw new $9dc8413b1754d208$exports.Errors.ENOSYS('Phoenix fs copy across filer and native not yet supported');
    },
    showSaveDialog: function() {
        throw new $9dc8413b1754d208$exports.Errors.ENOSYS('Phoenix fs showSaveDialog function not yet supported.');
    },
    watch: function(...args) {
        return $2a0ff8e28d0863ed$export$2e2bcd8739ae039.watch(...args);
    },
    unwatch: function(...args) {
        return $2a0ff8e28d0863ed$export$2e2bcd8739ae039.unwatch(...args);
    },
    unwatchAll: function(...args) {
        return $2a0ff8e28d0863ed$export$2e2bcd8739ae039.unwatchAll(...args);
    },
    moveToTrash: function() {
        throw new $9dc8413b1754d208$exports.Errors.ENOSYS('Phoenix fs moveToTrash function not yet supported.');
    },
    mkdirs: function(path, mode, recursive, callback) {
        if (typeof recursive !== 'boolean') {
            callback = recursive;
            recursive = false;
        }
        if (typeof callback !== 'function') callback = function() {
        // Do Nothing
        };
        if (!recursive) $56abb5d3eb174d90$var$fileSystemLib.mkdir(path, mode, callback);
        else $56abb5d3eb174d90$var$mkdir_p($56abb5d3eb174d90$var$fileSystemLib, path, mode, callback);
    },
    BYTE_ARRAY_ENCODING: $5b8d540a3a97b875$export$2e2bcd8739ae039.BYTE_ARRAY_ENCODING,
    ERR_NOT_FOUND: (/*@__PURE__*/$parcel$interopDefault($9dc8413b1754d208$exports)).ERROR_CODES.ENOENT,
    ERR_EISDIR: (/*@__PURE__*/$parcel$interopDefault($9dc8413b1754d208$exports)).ERROR_CODES.EISDIR,
    ERR_EINVAL: (/*@__PURE__*/$parcel$interopDefault($9dc8413b1754d208$exports)).ERROR_CODES.EINVAL,
    ERR_FILE_EXISTS: (/*@__PURE__*/$parcel$interopDefault($9dc8413b1754d208$exports)).ERROR_CODES.EEXIST
};
$56abb5d3eb174d90$var$fileSystemLib.copyFile = $56abb5d3eb174d90$var$fileSystemLib.copy;
function $56abb5d3eb174d90$export$2e2bcd8739ae039(Phoenix, FilerLib) {
    $56abb5d3eb174d90$var$filerLib = FilerLib;
    $56abb5d3eb174d90$var$filerShell = new $56abb5d3eb174d90$var$filerLib.fs.Shell();
    window.path = FilerLib.path;
    window.fs = $56abb5d3eb174d90$var$fileSystemLib;
    $56abb5d3eb174d90$var$_ensure_mount_directory();
}


//# sourceMappingURL=fslib.js.map
