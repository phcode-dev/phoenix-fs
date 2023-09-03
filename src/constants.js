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
/*eslint no-console: 0*/
/*eslint strict: ["error", "global"]*/
/* jshint ignore:start */

const SUPPORTED_ENCODINGS = {
    BYTE_ARRAY: 'byte-array',
    BINARY: 'binary',
    ASCII: 'ascii',
    UTF8: 'utf-8',
    UTF16: 'utf-16',
    UTF16LE: 'utf-16le',
    UCS2: 'ucs-2', // same as utf-16le
    WINDOWS_1252: 'windows-1252',
    LATIN_1: 'Latin1', // WINDOWS_1252
    CP_1252: 'CP1252', // WINDOWS_1252
    ISO_8859_1: 'ISO-8859-1', // WINDOWS_1252
    GB2312: "GB2312",
    BIG5: "Big5",
    SHIFT_JIS: "Shift-JIS",
    EUC_JP: "EUC-JP",
    KOI8_R: "KOI8-R",
    EUC_KR: "EUC-KR",
    WINDOWS_874: "Windows-874",
    MAC_ROMAN: "MacRoman",
};

const Constants = {
    MOUNT_DEVICE_NAME: 'nativeFsAccess',
    TAURI_DEVICE_NAME: 'tauri',
    KIND_FILE: 'file',
    KIND_DIRECTORY: 'directory',
    NODE_TYPE_FILE: 'FILE',
    NODE_TYPE_DIRECTORY: 'DIRECTORY',
    IDB_RW_TYPE: 'readwrite',
    MOUNT_POINT_ROOT: '/mnt',
    TAURI_ROOT: "/tauri",
    BINARY_ENCODING: SUPPORTED_ENCODINGS.BINARY,
    BYTE_ARRAY_ENCODING: SUPPORTED_ENCODINGS.BYTE_ARRAY,
    SUPPORTED_ENCODINGS
};

module.exports ={
    Constants
};
