/* global Filer, fs*/
importScripts('../../dist/virtualfs.js');
const urlParams = new URLSearchParams(location.search);
const mountTestPath = urlParams.get('mountTestPath');
console.log('mountTestPath: ', mountTestPath);

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

function checkWriteInMountPath() {
    console.log('worker: checkWriteInMountPath');
    fs.writeFile(`${mountTestPath}/workerWrite.txt`, 'hello World', 'utf8', (err)=>{
        if(!err){
            postMessage('writeMountCheck.ok');
            return;
        }
        console.log(err);
    });
}

function checkReadInMountPath() {
    console.log('worker: checkReadInMountPath');
    fs.readFile(`${mountTestPath}/workerWrite.txt`,  (err, content)=>{
        if(!err && content === 'hello World'){
            postMessage('readMountCheck.ok');
            return;
        }
        console.log('file read:', err, content);
    });
}

self.addEventListener('message', (event) => {
    console.log('Worker received: ', event);
    let command = event.data;
    switch (command) {
    case 'fsCheck': fsCheck(); break;
    case 'phoenixFsCheck': phoenixFsCheck(); break;
    case 'writeMountCheck': checkWriteInMountPath(); break;
    case 'readMountCheck': checkReadInMountPath(); break;
    default: console.error('unknown worker command: ', command);
    }
}, false);
