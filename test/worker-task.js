/* global Filer*/
importScripts('../../dist/virtualfs.js');

function fsCheck() {
    if(Filer && Filer.fs && Filer.Shell){
        postMessage('fsCheck.ok');
    }
}

self.addEventListener('message', (event) => {
    console.log('Worker:', event);
    let command = event.data;
    switch (command) {
    case 'fsCheck': fsCheck(); break;
    }
}, false);
