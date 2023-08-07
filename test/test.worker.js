/* global expect,fs */

function _setupTests(testType) {
    let testPath;
    let worker;
    let messageFromWorker = null;

    async function _clean() {
        console.log(`cleaning: `, testPath);
        let cleanSuccess = false;
        fs.unlink(testPath, ()=>{
            cleanSuccess = true;
        });
        await waitForTrue(()=>{return cleanSuccess;},10000);
    }

    async function _init() {
        console.log(`mkdir: `, testPath);
        let cleanSuccess = false;
        fs.mkdirs(testPath, 777 ,true, ()=>{
            cleanSuccess = true;
        });
        await waitForTrue(()=>{return cleanSuccess;},10000);
    }

    async function _requestWritePerm() {
        if(window.__TAURI__ || testPath !== window.mountTestPath){
            // fs access apis not tested in tauri
            return;
        }
        return new Promise((resolve, reject)=>{
            fs.writeFile(`${testPath}/forTestPermissionOnFolder.txt`, `hello World`, `utf8`, (err)=>{
                if(err){
                    console.log(err);
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }

    function _setupTestPath() {
        switch (testType) {
        case TEST_TYPE_FS_ACCESS: testPath = window.mountTestPath;break;
        case TEST_TYPE_FILER: testPath = window.virtualTestPath;break;
        default: throw new Error("unknown file system impl");
        }
    }

    before(async function () {
        _setupTestPath();
        await _clean();
        await _init();
        await _requestWritePerm();
        worker = new Worker(`worker-task.js?debug=true`);
        console.log(worker);
        worker.onmessage= function (event) {
            console.log(`From Worker:`, event);
            messageFromWorker = event.data;
        };
    });

    after(async function () {
        await _clean();
        // worker.terminate();
    });

    beforeEach(async function () {
        await _clean();
        await _init();
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

    it(`Should load Filer in worker`, async function () {
        messageFromWorker = null;
        worker.postMessage({command: `fsCheck`});
        let status = await waitForWorkerMessage(`fsCheck.ok`, 1000);
        expect(status).to.be.true;
    });

    it(`Should load phoenix fs in worker`, async function () {
        messageFromWorker = null;
        worker.postMessage({command: `phoenixFsCheck`});
        let status = await waitForWorkerMessage(`phoenixFsCheck.ok`, 1000);
        expect(status).to.be.true;
    });

    async function _writeFile() {
        messageFromWorker = null;
        worker.postMessage({command: `writeCheck`, path: `${testPath}/workerWrite.txt`});
        let status = await waitForWorkerMessage(`writeCheck.ok`, 1000);
        expect(status).to.be.true;
    }

    it(`Should phoenix ${testType} write in worker`, async function () {
        await _writeFile();
    });

    it(`Should phoenix ${testType} read in worker`, async function () {
        await _writeFile();
        messageFromWorker = null;
        worker.postMessage({command: `readCheck`, path: `${testPath}/workerWrite.txt`});
        let status = await waitForWorkerMessage(`readCheck.ok`, 1000);
        expect(status).to.be.true;
    });

    it(`Should phoenix ${testType} read dir withFileTypes in worker`, async function () {
        await _writeFile();
        messageFromWorker = null;
        worker.postMessage({command: `readDirCheck`, path: `${testPath}`});
        let status = await waitForWorkerMessage(`readDirCheck.ok`, 1000);
        expect(status).to.be.true;
    });

    it(`Should phoenix ${testType} delete in worker`, async function () {
        await _writeFile();
        messageFromWorker = null;
        worker.postMessage({command: `deleteCheck`, path: `${testPath}/workerWrite.txt`});
        let status = await waitForWorkerMessage(`deleteCheck.ok`, 1000);
        expect(status).to.be.true;
    });
}

describe(`web worker filer tests`, function () {
    _setupTests(TEST_TYPE_FILER);
});

describe(`web worker fs access tests`, function () {
    if(window.__TAURI__){
        it(`fs access tests are disabled in tauri`, function () {});
        return;
    } else {
        _setupTests(TEST_TYPE_FS_ACCESS);
    }
});
