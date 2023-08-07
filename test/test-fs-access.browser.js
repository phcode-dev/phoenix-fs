/* global expect , Filer, fs*/

describe('Browser vfs fs access mount points tests', function () {

    if(window.__TAURI__){
        it('fs access tests are disabled in tauri', function () {});
        return;
    }

    async function waitForTrue(checkFn, timeoutMs) {
        let startTime = Date.now();
        return new Promise((resolve)=>{
            let interVal;
            function checkMessage() {
                if(checkFn() === true){
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

    async function _clean() {
        console.log('cleaning: ', window.mountTestPath);
        let cleanSuccess = false;
        fs.unlink(window.mountTestPath, ()=>{
            cleanSuccess = true;
        });
        await waitForTrue(()=>{return cleanSuccess;},10000);
    }

    beforeEach(async function () {
        // setup test folders
        await _clean();
        console.log('mkdir: ', window.mountTestPath);
        let cleanSuccess = false;
        fs.mkdirs(window.mountTestPath, 777 ,true, ()=>{
            cleanSuccess = true;
        });
        await waitForTrue(()=>{return cleanSuccess;},10000);
    });

    afterEach(async function () {
        await _clean();
    });

    it('Should load fs access in browser', function () {
        expect(Filer).to.exist;
        expect(Filer.fs).to.exist;
        expect(Filer.Shell).to.exist;
        expect(Filer.fs.name).to.equal('local');
    });

    it('Should load clean Phoenix fs in browser',async function () {
        expect(fs).to.exist;
        expect(fs.name).to.equal('phoenixFS');
    }, 10000);

    async function _writeTestFile() {
        let writeSuccess = false;
        fs.writeFile(`${window.mountTestPath}/browserWrite.txt`, 'hello World', 'utf8', (err)=>{
            if(!err){
                writeSuccess = true;
            }
        });
        await waitForTrue(()=>{return writeSuccess;},10000);
        expect(writeSuccess).to.be.true;
    }

    async function _writeTestDir() {
        // virtual fs
        let createSuccess = false;
        let path = `${window.mountTestPath}/testDir`;
        fs.mkdir(path, (err)=>{
            if(!err){
                createSuccess = true;
            }
        });
        await waitForTrue(()=>{return createSuccess;},1000);
        expect(createSuccess).to.be.true;
        return path;
    }

    it('Should phoenix fs access write in browser', async function () {
        await _writeTestFile();
    });

    it('Should phoenix fs access read in browser', async function () {
        await _writeTestFile();
        let readSuccess = false;
        fs.readFile(`${window.mountTestPath}/browserWrite.txt`, 'utf8', (err)=>{
            if(!err){
                readSuccess = true;
            }
        });
        await waitForTrue(()=>{return readSuccess;},1000);
        expect(readSuccess).to.be.true;
    });

    it('Should phoenix fs access read dir', async function () {
        await _writeTestFile();
        let readSuccess = false, contentsRead;
        fs.readdir(`${window.mountTestPath}`, (err, contents)=>{
            if(!err){
                readSuccess = true;
            }
            contentsRead = contents;
        });
        await waitForTrue(()=>{return readSuccess;},1000);
        expect(readSuccess).to.be.true;
        expect(contentsRead.length).to.equal(1);
    });

    it('Should phoenix fs access read dir with withFileTypes', async function () {
        await _writeTestFile();
        let readSuccess = false, contentsRead;
        fs.readdir(`${window.mountTestPath}`, {withFileTypes: true} , (err, contents)=>{
            if(!err){
                readSuccess = true;
            }
            contentsRead = contents;
        });
        await waitForTrue(()=>{return readSuccess;},1000);
        expect(readSuccess).to.be.true;
        expect(contentsRead[0].type).to.exist;
    });

    it('Should phoenix fs access delete in browser', async function () {
        await _writeTestFile();
        let delSuccess = false;
        fs.unlink(`${window.mountTestPath}/browserWrite.txt`, (err)=>{
            if(!err){
                delSuccess = true;
            }
        });
        await waitForTrue(()=>{return delSuccess;},1000);
        expect(delSuccess).to.be.true;
    });

    it('Should phoenix fs access mkdir(path,cb) in browser if it doesnt exist', async function () {
        await _writeTestDir();
    });

    it('Should phoenix fs access mkdir(path,mode, cb) in browser if it doesnt exist', async function () {
        let createSuccess = false;
        fs.mkdir(`${window.mountTestPath}/testDir1`, 777, (err)=>{
            if(!err){
                createSuccess = true;
            }
        });
        await waitForTrue(()=>{return createSuccess;},1000);
        expect(createSuccess).to.be.true;
    });

    it('Should phoenix fail fs access mkdir(path,mode, cb) if already exists', async function () {
        // virtual fs
        let dirPathCreated = await _writeTestDir();
        let failed = false;
        fs.mkdir(dirPathCreated, 777, (err)=>{
            if(err){
                failed = true;
            }
        });
        await waitForTrue(()=>{return failed;},1000);
        expect(failed).to.be.true;
    });

    it('Should phoenix fs access rename fail if dst is a subpath of src', async function () {
        let errored = false;
        fs.rename(`${window.mountTestPath}/a`, `${window.mountTestPath}/a/b`, (err)=>{
            if(err){
                errored = true;
            }
        });
        await waitForTrue(()=>{return errored;},1000);
        expect(errored).to.be.true;
    });
});
