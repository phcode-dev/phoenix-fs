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
/*global globalObject, virtualfs*/
/*eslint no-console: 0*/
/*eslint strict: ["error", "global"]*/


let _channel = null;
const _eventEmitters = [];
const {Errors} = require("./errno");
const EventEmitter = require('events');
const ignore = require('ignore');
const {Utils} = require("./utils");
const {Constants} = require("./constants");

const WATCH_EVENT_NOTIFICATION = 'PHOENIX_WATCH_EVENT_NOTIFICATION';

function _setupBroadcastChannel() {
    if(_channel){
        return;
    }
    if(typeof BroadcastChannel === 'undefined'){
        /* eslint no-console: 0 */
        console.warn('BroadcastChannel not supported. File system watch events across tabs wont be synced.');
        return;
    }
    _channel = new BroadcastChannel(WATCH_EVENT_NOTIFICATION);
}

function _broadcastWatchEvent(event) {
    _setupBroadcastChannel();
    _channel.postMessage(event);
}

function _isAnIgnoredPath(watchedPath, changedPath, gitignore) {
    const relativePath = globalObject.path.relative(watchedPath, changedPath);
    return relativePath && gitignore.ignores(relativePath);
}

function _isSameOrSubDirectory(parent, child) {
    return !(globalObject.path.relative(parent, child).startsWith('..'));
}

// event{ path, eventName}
function _processFsWatchEvent(event, broadcast=true) {
    if(broadcast){
        _broadcastWatchEvent(event);
    }
    for (const eventEmitter of _eventEmitters){
        if(_isSameOrSubDirectory(eventEmitter.watchedPath, event.path)
            && !_isAnIgnoredPath(eventEmitter.watchedPath, event.path, eventEmitter.gitignore)) {
            eventEmitter.emit(event.event, {path: event.path});
        }
    }
}

function _listenToExternalFsWatchEvents() {
    _setupBroadcastChannel();
    _channel.onmessage = async function(event) {
        if(virtualfs.debugMode){
            console.log('PhoenixFS: External fs watch event: ', event.data);
        }
        _processFsWatchEvent(event.data, false);
    };
}

function _triggerEvent(path, eventType) {
    let pathLib = globalObject.path;
    path = pathLib.normalize(path);
    let event = {
        event: eventType,
        path: path
    };
    _processFsWatchEvent(event);
}

function reportUnlinkEvent(path, isDir) {
    if(Utils.isTauriSubPath(path)) {
        // tauri watches native paths with node, so no virtual events needs to be handled
        return;
    }
    if(isDir){
        _triggerEvent(path, Constants.WATCH_EVENTS.UNLINK_DIR);
    } else {
        _triggerEvent(path, Constants.WATCH_EVENTS.UNLINK_FILE);
    }
}

function reportChangeEvent(path) {
    if(Utils.isTauriSubPath(path)) {
        // tauri watches native paths with node, so no virtual events needs to be handled
        return;
    }
    _triggerEvent(path, Constants.WATCH_EVENTS.CHANGE);
}

function reportCreateEvent(path, isDir) {
    if(Utils.isTauriSubPath(path)) {
        // tauri watches native paths with node, so no virtual events needs to be handled
        return;
    }
    if(isDir){
        _triggerEvent(path, Constants.WATCH_EVENTS.ADD_DIR);
    } else {
        _triggerEvent(path, Constants.WATCH_EVENTS.ADD_FILE);
    }
}

/**
 * @returns {EventEmitter}
 * @param {string} path The watched root
 * @param {string|Array<string>} gitIgnorePaths The contents of the gitIgnore file as text. The watcher will ignore all files matching git ignore.
 */
async function watchAsync(path, gitIgnorePaths="") {
    const eventEmitter = new EventEmitter();
    eventEmitter.gitignore = ignore().add(gitIgnorePaths);
    eventEmitter.watchedPath = path;
    _eventEmitters.push(eventEmitter);
    return eventEmitter;
}

function unwatchAsync(eventEmitter) {
    if(eventEmitter.allreadyClosed) {
        return ;
    }
    eventEmitter.removeAllListeners();
    eventEmitter.on = function () {
        throw new Errors.EIO("The File watcher is closed. Please use `fs.watchAsync` if you want to watch again.");
    };
    eventEmitter.allreadyClosed = true;

    let index = _eventEmitters.findIndex(e => e === eventEmitter);
    if (index !== -1) {
        _eventEmitters.splice(index, 1);
    }
}


_listenToExternalFsWatchEvents();

const FsWatch = {
    watchAsync,
    unwatchAsync,
    reportUnlinkEvent,
    reportChangeEvent,
    reportCreateEvent
};

module.exports ={
    FsWatch
};
