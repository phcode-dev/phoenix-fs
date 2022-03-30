/* global expect */

describe('web worker tests', function () {
    let worker = new Worker('worker-task.js?debug=true');
    console.log(worker);
    let messageFromWorker = null;
    worker.onmessage= function (event) {
        console.log('From Worker:', event);
        messageFromWorker = event.data;
    };

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
});
