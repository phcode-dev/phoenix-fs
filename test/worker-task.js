/* global Filer, fs*/
importScripts('virtualfs.js');

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

function checkWriteInPath(path) {
    console.log('worker: checkWriteInPath');
    fs.writeFile(path, 'hello World', 'utf8', (err)=>{
        if(!err){
            postMessage('writeCheck.ok');
            return;
        }
        console.log(err);
    });
}

function checkReadInPath(path) {
    console.log('worker: checkReadInPath');
    fs.readFile(path, 'utf8', (err, content)=>{
        if(!err && content === 'hello World'){
            postMessage('readCheck.ok');
            return;
        }
        console.log('file read:', err, content);
    });
}

function checkReadDirInPath(path) {
    console.log('worker: checkReadDirInPath');
    fs.readdir(path, {withFileTypes: true} , (err, contents)=>{
        if(!err && contents[0].type){
            postMessage('readDirCheck.ok');
            return;
        }
        console.log('file read:', err, contents);
    });
}

function checkDeleteInPath(path) {
    console.log('worker: checkDeleteInPath');
    fs.unlink(path,  (err)=>{
        if(!err){
            postMessage('deleteCheck.ok');
            return;
        }
        console.log('file read:', err);
    });
}

function checkStatInPath(path) {
    console.log('worker: checkStatInPath');
    fs.stat(path,  (err, stat)=>{
        if(!err){
            if(path.startsWith("/tauri/") && !stat.dev.startsWith("tauriWS")){
                console.error(`Stats device not as expected, expected "tauriWS_<number>" but got "${stat.dev}":`, err, stat);
                return;
            }
            postMessage('checkStatInPath.ok');
            return;
        }
        console.error('Stats error:', err, stat);
    });
}

async function tauriWSInit(wsEndpoint) {
    if(Filer && Filer.fs && Filer.Shell){
        await fs.setNodeWSEndpoint(wsEndpoint);
        postMessage('tauriWSInit.ok');
    }
}

self.addEventListener('message', (event) => {
    console.log('Worker received: ', event);
    const command = event.data.command;
    const path = event.data.path;
    const wsEndpoint = event.data.wsEndpoint;
    switch (command) {
    case 'fsCheck': fsCheck(); break;
    case 'checkStatInPath': checkStatInPath(path); break;
    case 'tauriWSInit': tauriWSInit(wsEndpoint); break;
    case 'phoenixFsCheck': phoenixFsCheck(); break;
    case 'writeCheck': checkWriteInPath(path); break;
    case 'readCheck': checkReadInPath(path); break;
    case 'deleteCheck': checkDeleteInPath(path); break;
    case 'readDirCheck': checkReadDirInPath(path); break;
    default: console.error('unknown worker command: ', command);
    }
}, false);
