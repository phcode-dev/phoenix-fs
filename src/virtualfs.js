/*global globalObject*/

const hello = require('./dep.js');
const Filer = require('filer');

let virtualGlobalObject = {};
function setupGlobalObject() {
    if(typeof window !== 'undefined'){
        window.globalObject = window;
        return window; // browser
    }
    if(typeof self !== 'undefined'){
        self.globalObject = self;
        self.import = importScripts;
        return self; // web worker
    }
    if(typeof global !== 'undefined'){
        global.globalObject = global;
        return global; //nodejs
    }
    return virtualGlobalObject;
}
setupGlobalObject();

globalObject.Filer = Filer;

hello.hello();

