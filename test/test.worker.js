/* global expect,fs */

describe('web worker tests', function () {
    let worker;
    let messageFromWorker = null;

    async function _clean() {
        console.log('cleaning: ', window.mountTestPath);
        let cleanSuccess = false;
        fs.unlink(window.mountTestPath, ()=>{
            cleanSuccess = true;
        });
        await waitForTrue(()=>{return cleanSuccess;},10000);
    }

    async function _init() {
        console.log('mkdir: ', window.mountTestPath);
        let cleanSuccess = false;
        fs.mkdirs(window.mountTestPath, 777 ,true, ()=>{
            cleanSuccess = true;
        });
        await waitForTrue(()=>{return cleanSuccess;},10000);
    }

    async function _requestWritePerm() {
        return new Promise((resolve, reject)=>{
            fs.writeFile(`${window.mountTestPath}/forTestPermissionOnFolder.txt`, 'hello World', 'utf8', (err)=>{
                if(err){
                    console.log(err);
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }
    before(async function () {
        await _clean();
        await _init();
        await _requestWritePerm();
        worker = new Worker(`worker-task.js?debug=true&TestPath=${window.mountTestPath}`);
        console.log(worker);
        worker.onmessage= function (event) {
            console.log('From Worker:', event);
            messageFromWorker = event.data;
        };
    });

    async function waitForWorkerMessage(message, timeoutMs) {
        let startTime = Date.now();
        return new Promise((resolve)=>{
            let interVal;
            function checkMessage() {
                if(messageFromWorker === message){
                    resolve(true);
                    clearInterval(interVal);
                }
                let elapsedTime = Date.now() - startTime;
                if(elapsedTime > timeoutMs){
                    resolve(false);
                    clearInterval(interVal);
                }
            }
            interVal = setInterval(checkMessage, 10);
        });
    }

    it('Should load Filer in worker', async function () {
        messageFromWorker = null;
        worker.postMessage({command: 'fsCheck'});
        let status = await waitForWorkerMessage('fsCheck.ok', 1000);
        expect(status).to.be.true;
    });

    it('Should load phoenix fs in worker', async function () {
        messageFromWorker = null;
        worker.postMessage({command: 'phoenixFsCheck'});
        let status = await waitForWorkerMessage('phoenixFsCheck.ok', 1000);
        expect(status).to.be.true;
    });

    it('Should phoenix native write in worker', async function () {
        messageFromWorker = null;
        worker.postMessage({command: 'writeCheck', path: `${window.mountTestPath}/workerWrite.txt`});
        let status = await waitForWorkerMessage('writeCheck.ok', 1000);
        expect(status).to.be.true;
    });

    it('Should phoenix native read in worker', async function () {
        messageFromWorker = null;
        worker.postMessage({command: 'readCheck', path: `${window.mountTestPath}/workerWrite.txt`});
        let status = await waitForWorkerMessage('readCheck.ok', 1000);
        expect(status).to.be.true;
    });

    it('Should phoenix native read dir withFileTypes in worker', async function () {
        messageFromWorker = null;
        worker.postMessage({command: 'readDirCheck', path: `${window.mountTestPath}`});
        let status = await waitForWorkerMessage('readDirCheck.ok', 1000);
        expect(status).to.be.true;
    });

    it('Should phoenix native delete in worker', async function () {
        messageFromWorker = null;
        worker.postMessage({command: 'deleteCheck', path: `${window.mountTestPath}/workerWrite.txt`});
        let status = await waitForWorkerMessage('deleteCheck.ok', 1000);
        expect(status).to.be.true;
    });
});
