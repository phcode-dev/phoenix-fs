/* global expect , Filer, fs, waitForTrue, TEST_TYPE_FS_ACCESS, TEST_TYPE_FILER, TEST_TYPE_TAURI*/

function _setupTests(testType) {
    let testPath;

    function consoleLogToShell(message) {
        return window.__TAURI__.invoke("console_log", {message});
    }
    async function _clean() {
        console.log(`cleaning: `, testPath);
        let cleanSuccess = false;
        fs.unlink(testPath, ()=>{
            cleanSuccess = true;
        });
        await waitForTrue(()=>{return cleanSuccess;},10000);
    }

    before(async function () {
        switch (testType) {
        case TEST_TYPE_FS_ACCESS: testPath = window.mountTestPath;break;
        case TEST_TYPE_FILER: testPath = window.virtualTestPath;break;
        case TEST_TYPE_TAURI:
            testPath = fs.getTauriVirtualPath(`${await window.__TAURI__.path.appLocalDataDir()}test-phoenix-fs`);
            consoleLogToShell("using tauri test path: "+ testPath);
            break;
        default: throw new Error("unknown file system impl");
        }
    });

    beforeEach(async function () {
        // setup test folders
        await _clean();
        console.log(`mkdir: `, testPath);
        let cleanSuccess = false;
        fs.mkdirs(testPath, 777 ,true, ()=>{
            cleanSuccess = true;
        });
        await waitForTrue(()=>{return cleanSuccess;},10000);
    });

    afterEach(async function () {
        await _clean();
    });

    it(`Should load Filer in browser`, function () {
        expect(Filer).to.exist;
        expect(Filer.fs).to.exist;
        expect(Filer.Shell).to.exist;
        expect(Filer.fs.name).to.equal(`local`);
    });

    it(`Should load clean Phoenix fs in browser`,async function () {
        expect(fs).to.exist;
        expect(fs.name).to.equal(`phoenixFS`);
        expect(fs.MOUNT_POINT_ROOT).to.equal(`/mnt`);
        expect(fs.TAURI_ROOT).to.equal(`/tauri`);
    }, 10000);

    async function _writeTestDir() {
        // virtual fs
        let createSuccess = false;
        let path = `${testPath}/testDir`;
        let error;
        fs.mkdir(path, (err)=>{
            error = err;
            if(!err){
                createSuccess = true;
            }
        });
        await waitForTrue(()=>{return createSuccess;},1000);
        expect(error).to.be.null;
        return path;
    }

    it(`Should phoenix ${testType} read dir`, async function () {
        await _writeTestDir();
        let readSuccess = false, contentsRead;
        fs.readdir(`${testPath}`, (err, contents)=>{
            if(!err){
                readSuccess = true;
            }
            contentsRead = contents;
        });
        await waitForTrue(()=>{return readSuccess;},1000);
        expect(readSuccess).to.be.true;
        expect(contentsRead.length).to.equal(1);
    });

    it(`Should phoenix ${testType} read dir raise enoent if not exists`, async function () {
        let error;
        fs.readdir(`${testPath}/x`, (err)=>{
            error = err;
        });
        await waitForTrue(()=>{return !!error;},1000);
        expect(error.code).to.equal(fs.ERR_ENOENT);
    });

    it(`Should phoenix ${testType} read dir with withFileTypes`, async function () {
        await _writeTestDir();
        let readSuccess = false, contentsRead;
        fs.readdir(`${testPath}`, {withFileTypes: true} , (err, contents)=>{
            if(!err){
                readSuccess = true;
            }
            contentsRead = contents;
        });
        await waitForTrue(()=>{return readSuccess;},1000);
        expect(readSuccess).to.be.true;
        expect(contentsRead[0].type).to.exist;
    });

    it(`Should phoenix ${testType} mkdir(path,cb) in browser if it doesnt exist`, async function () {
        await _writeTestDir();
    });

    it(`Should phoenix ${testType} mkdir(path,mode, cb) in browser if it doesnt exist`, async function () {
        let createSuccess = false;
        fs.mkdir(`${testPath}/testDir1`, 777, (err)=>{
            if(!err){
                createSuccess = true;
            }
        });
        await waitForTrue(()=>{return createSuccess;},1000);
        expect(createSuccess).to.be.true;
    });

    it(`Should phoenix fail ${testType} mkdir(path,mode, cb) if already exists`, async function () {
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

    it(`Should phoenix ${testType} rename fail if dst is a subpath of src`, async function () {
        let errored = false;
        fs.rename(`${testPath}/a`, `${testPath}/a/b`, (err)=>{
            if(err){
                errored = true;
            }
        });
        await waitForTrue(()=>{return errored;},1000);
        expect(errored).to.be.true;
    });
}

describe(`Dir: Browser virtual fs tests: filer paths`, function () {
    _setupTests(TEST_TYPE_FILER);
});

if(window.__TAURI__){
    describe(`Dir: Browser virtual fs tests: Tauri paths`, function () {
        _setupTests(TEST_TYPE_TAURI);
    });
}

if(window.supportsFsAccessAPIs){
    describe(`Dir: Browser virtual fs tests: fs access mount point paths`, function () {
        if(window.__TAURI__){
            it('fs access tests are disabled in tauri', function () {});
            return;
        }
        _setupTests(TEST_TYPE_FS_ACCESS);
    });
}

describe(`Should phoenix be able to read root dir`, async function () {
    if(window.supportsFsAccessAPIs){
        it(`Should read root /mnt dir`, async function () {
            let readSuccess, contentsRead;
            fs.readdir(`/mnt`, (err, contents)=>{
                if(!err){
                    readSuccess = true;
                }
                contentsRead = contents;
            });
            await waitForTrue(()=>{return readSuccess;},1000);
            expect(readSuccess).to.be.true;
            expect(contentsRead.length>=1).to.be.true;
        });

        it(`Should read root /mnt dir with file types`, async function () {
            let readSuccess, contentsRead;
            fs.readdir(`/mnt`, {withFileTypes: true}, (err, contents)=>{
                if(!err){
                    readSuccess = true;
                }
                contentsRead = contents;
            });
            await waitForTrue(()=>{return readSuccess;},1000);
            expect(readSuccess).to.be.true;
            expect(contentsRead.length>=1).to.be.true;
            expect(contentsRead[0].dev).to.equal('nativeFsAccess');
        });
    }
    if(window.__TAURI__){
        it(`Should read root /tauri dir`, async function () {
            let readSuccess, contentsRead;
            fs.readdir(`/tauri`, (err, contents)=>{
                if(!err){
                    readSuccess = true;
                }
                contentsRead = contents;
            });
            await waitForTrue(()=>{return readSuccess;},1000);
            expect(readSuccess).to.be.true;
            expect(contentsRead.length>=1).to.be.true;
        });

        it(`Should read root /tauri dir with file types`, async function () {
            let readSuccess, contentsRead;
            fs.readdir(`/tauri`, {withFileTypes: true}, (err, contents)=>{
                if(!err){
                    readSuccess = true;
                }
                contentsRead = contents;
            });
            await waitForTrue(()=>{return readSuccess;},1000);
            expect(readSuccess).to.be.true;
            expect(contentsRead.length>=1).to.be.true;
            expect(contentsRead[0].dev.startsWith('tauri_')).to.be.true;
        });
    }
});