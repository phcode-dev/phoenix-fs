/* global expect,fs */

describe('web worker tests', function () {
    let worker;
    let messageFromWorker = null;
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
        await _requestWritePerm();
        worker = new Worker(`worker-task.js?debug=true&mountTestPath=${window.mountTestPath}`);
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
        worker.postMessage('fsCheck');
        let status = await waitForWorkerMessage('fsCheck.ok', 1000);
        expect(status).to.be.true;
    });

    it('Should load phoenix fs in worker', async function () {
        messageFromWorker = null;
        worker.postMessage('phoenixFsCheck');
        let status = await waitForWorkerMessage('phoenixFsCheck.ok', 1000);
        expect(status).to.be.true;
    });

    it('Should phoenix native write in worker', async function () {
        messageFromWorker = null;
        worker.postMessage('writeMountCheck');
        let status = await waitForWorkerMessage('writeMountCheck.ok', 1000);
        expect(status).to.be.true;
    });

    it('Should phoenix native read in worker', async function () {
        messageFromWorker = null;
        worker.postMessage('readMountCheck');
        let status = await waitForWorkerMessage('readMountCheck.ok', 1000);
        expect(status).to.be.true;
    });

    it('Should phoenix native read dir withFileTypes in worker', async function () {
        messageFromWorker = null;
        worker.postMessage('readDirMountCheck');
        let status = await waitForWorkerMessage('readDirMountCheck.ok', 1000);
        expect(status).to.be.true;
    });

    it('Should phoenix native delete in worker', async function () {
        messageFromWorker = null;
        worker.postMessage('deleteMountCheck');
        let status = await waitForWorkerMessage('deleteMountCheck.ok', 1000);
        expect(status).to.be.true;
    });
});
