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
/*global fs, globalObject*/
/*eslint no-console: 0*/
/*eslint strict: ["error", "global"]*/


const {ERR_CODES, Errors} = require('./errno');
const ERROR_CODES = ERR_CODES.ERROR_CODES;

function _stat(path) {
    return new Promise((resolve, reject) => {
        fs.stat(path, async (err, stat) => {
            if(err && err.code === ERROR_CODES.ENOENT){
                resolve(null);
            } else if(err) {
                reject(err);
            } else {
                resolve(stat);
            }
        });
    });
}

function _mkdirIfNotPresent(path) {
    return new Promise((resolve, reject) => {
        fs.mkdir(path, async (err) => {
            err && err.code !== ERROR_CODES.EEXIST?
                reject(err):
                resolve();
        });
    });
}

function _readDir(path) {
    return new Promise((resolve, reject) => {
        fs.readdir(path, (err, listing) => {
            if(err) {
                reject(err);
            } else {
                resolve(listing);
            }
        });
    });
}

function _copyFileContents(src, dst) {
    return new Promise((resolve, reject) => {
        fs.readFile(src, (err, data) => {
            if(err) {
                reject(err);
            } else {
                fs.writeFile(dst, data, function (writeErr) {
                    writeErr?
                        reject(writeErr):
                        resolve();
                });
            }
        });
    });
}

async function _copyFile(srcFile, dst) {
    let dstStat = await _stat(dst);
    if(!dstStat){
        let parentDir= globalObject.path.dirname(dst);
        let dstFileName= globalObject.path.basename(dst);
        dstStat = await _stat(parentDir);
        if(dstStat && dstStat.isDirectory()){
            let dstFilePath =`${parentDir}/${dstFileName}`;
            await _copyFileContents(srcFile, dstFilePath);
            return dstFilePath;
        } else {
            throw new Errors.EIO(`_copyFile Cannot create destination file: ${dst}`);
        }
    }

    let srcFileName= globalObject.path.basename(srcFile);
    if(dstStat && dstStat.isDirectory()){
        let dstFilePath =`${dst}/${srcFileName}`;
        await _copyFileContents(srcFile, dstFilePath);
        return dstFilePath;
    } else if(dstStat && dstStat.isFile()){
        throw new Errors.EEXIST(`_copyFile Destination file already exists: ${dst}`);
    } else {
        throw new Errors.EIO(`_copyFile Cannot copy file, unknown destination: ${srcFile} to ${dst}`);
    }
}

async function _copyTree(src, dst) {
    let srcEntries = await _readDir(src);
    for(let entry of srcEntries){
        let entryPath = `${src}/${entry}`;
        let dstPath = `${dst}/${entry}`;
        let srcStat = await _stat(entryPath);
        if(srcStat.isFile()){
            await _copyFileContents(entryPath, dstPath);
        } else { //dir
            await _mkdirIfNotPresent(dstPath);
            await _copyTree(entryPath, dstPath);
        }
    }
}

async function _copyFolder(srcFolder, dst) {
    let dstStat = await _stat(dst);
    if(dstStat && dstStat.isFile()){
        throw new Errors.EEXIST(`Destination file already exists: ${dst}`);
    } else if(dstStat && dstStat.isDirectory()){
        let destSubFolderPath= `${dst}/${globalObject.path.basename(srcFolder)}`;
        dstStat = await _stat(destSubFolderPath);
        if(dstStat){
            throw new Errors.EEXIST(`Destination folder already exists: ${destSubFolderPath}`);
        }
        await _mkdirIfNotPresent(destSubFolderPath);
        await _copyTree(srcFolder, destSubFolderPath);
        return destSubFolderPath;
    } else {
        await _mkdirIfNotPresent(dst);
        await _copyTree(srcFolder, dst);
        return dst;
    }
}

async function copy(src, dst, callback) {
    try {
        let srcStat = await _stat(src);
        if(!srcStat){
            callback(new Errors.EIO(`Cannot copy src: ${src}`));
            return;
        }
        if (srcStat.isFile()) {
            let copiedPath = await _copyFile(src, dst);
            callback(null, copiedPath);
        } else if (srcStat.isDirectory()) {
            let copiedPath = await _copyFolder(src, dst);
            callback(null, copiedPath);
        }
    } catch (e) {
        callback(new Errors.EIO(`${e}: Cannot copy src: ${src} to ${dst}`));
    }
}

function globalCopy(src, dst, cb) {
    copy(globalObject.path.normalize(src), globalObject.path.normalize(dst), cb);
}

module.exports ={
    globalCopy
};
