/* global Filer, fs*/
importScripts('virtualfs.js');
const urlParams = new URLSearchParams(location.search);
const TestPath = urlParams.get('TestPath');
console.log('TestPath: ', TestPath);

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

function checkWriteInPath() {
    console.log('worker: checkWriteInPath');
    fs.writeFile(`${TestPath}/workerWrite.txt`, 'hello World', 'utf8', (err)=>{
        if(!err){
            postMessage('writeCheck.ok');
            return;
        }
        console.log(err);
    });
}

function checkReadInPath() {
    console.log('worker: checkReadInPath');
    fs.readFile(`${TestPath}/workerWrite.txt`,  (err, content)=>{
        if(!err && content === 'hello World'){
            postMessage('readCheck.ok');
            return;
        }
        console.log('file read:', err, content);
    });
}

function checkReadDirInPath() {
    console.log('worker: checkReadDirInPath');
    fs.readdir(`${TestPath}`, {withFileTypes: true} , (err, contents)=>{
        if(!err && contents[0].type){
            postMessage('readDirCheck.ok');
            return;
        }
        console.log('file read:', err, contents);
    });
}

function checkDeleteInPath() {
    console.log('worker: checkDeleteInPath');
    fs.unlink(`${TestPath}/workerWrite.txt`,  (err)=>{
        if(!err){
            postMessage('deleteCheck.ok');
            return;
        }
        console.log('file read:', err);
    });
}

self.addEventListener('message', (event) => {
    console.log('Worker received: ', event);
    let command = event.data.command;
    switch (command) {
    case 'fsCheck': fsCheck(); break;
    case 'phoenixFsCheck': phoenixFsCheck(); break;
    case 'writeCheck': checkWriteInPath(); break;
    case 'readCheck': checkReadInPath(); break;
    case 'deleteCheck': checkDeleteInPath(); break;
    case 'readDirCheck': checkReadDirInPath(); break;
    default: console.error('unknown worker command: ', command);
    }
}, false);
