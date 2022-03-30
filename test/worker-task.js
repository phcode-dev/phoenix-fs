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

function checkReadWriteInMountPath() {
    fs.writeFile(`${mountTestPath}/a.txt`, 'hello World', 'utf8', (err)=>{
        if(!err){
            postMessage('RWMountCheck.ok');
            return;
        }
        console.log(err);
    });
}

self.addEventListener('message', (event) => {
    console.log('Worker:', event);
    let command = event.data;
    switch (command) {
    case 'fsCheck': fsCheck(); break;
    case 'phoenixFsCheck': phoenixFsCheck(); break;
    case 'RWMountCheck': checkReadWriteInMountPath(); break;
    }
}, false);
