/* global Filer, fs*/
importScripts('../../dist/virtualfs.js');

function fsCheck() {
    if(Filer && Filer.fs && Filer.Shell){
        postMessage('fsCheck.ok');
    }
}

function phoenixFsCheck() {
    if(fs && fs.name === 'phoenixFS'){
        postMessage('phoenixFsCheck.ok');
    }
}

self.addEventListener('message', (event) => {
    console.log('Worker:', event);
    let command = event.data;
    switch (command) {
    case 'fsCheck': fsCheck(); break;
    case 'phoenixFsCheck': phoenixFsCheck(); break;
    }
}, false);
