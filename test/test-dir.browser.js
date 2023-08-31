/* global expect , Filer, fs, waitForTrue, TEST_TYPE_FS_ACCESS, TEST_TYPE_FILER, TEST_TYPE_TAURI*/

function _setupTests(testType) {
    let testPath;

    function consoleLogToShell(message) {
        return window.__TAURI__.invoke("console_log", {message});
    }
    async function _validate_exists(path) {
        let done, err;
        fs.stat(path, (error)=>{
            err = error;
            done = true;
        });
        await waitForTrue(()=>{return done;},1000);
        expect(err).to.be.null;
    }

    async function _validate_not_exists(path) {
        let done, err;
        fs.stat(path, (error)=>{
            err = error;
            done = true;
        });
        await waitForTrue(()=>{return done;},1000);
        expect(err.code).to.equal(fs.ERR_ENOENT);
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
        const dirPathToCreate = `${testPath}/testDir1`;
        fs.mkdir(dirPathToCreate, 777, (err)=>{
            if(!err){
                createSuccess = true;
            }
        });
        await waitForTrue(()=>{return createSuccess;},1000);
        expect(createSuccess).to.be.true;
        await _validate_exists(dirPathToCreate);
    });

    it(`Should phoenix ${testType} mkdir(path, cb) in browser if it doesnt exist`, async function () {
        let createSuccess = false;
        const dirPathToCreate = `${testPath}/testDir1`;
        fs.mkdir(dirPathToCreate, (err)=>{
            if(!err){
                createSuccess = true;
            }
        });
        await waitForTrue(()=>{return createSuccess;},1000);
        expect(createSuccess).to.be.true;
        await _validate_exists(dirPathToCreate);
    });

    it(`Should phoenix fail ${testType} mkdir(path,mode, cb) if already exists`, async function () {
        let dirPathCreated = await _writeTestDir();
        let error;
        fs.mkdir(dirPathCreated, 777, (err)=>{
            error = err;
        });
        await waitForTrue(()=>{return !!error;},1000);
        expect(error.code).to.equal(fs.ERR_EEXIST);
    });

    it(`Should phoenix ${testType} mkdirs(path,mode, recursive, cb) even if exists`, async function () {
        let dirPathCreated = await _writeTestDir();
        let success, error;
        fs.mkdirs(dirPathCreated, 777, true, (err)=>{
            error = err;
            success = true;
        });
        await waitForTrue(()=>{return success;},1000);
        expect(error).to.be.null;
        await _validate_exists(dirPathCreated);
    });

    it(`Should phoenix ${testType} mkdirs(path,mode, recursive, cb) if any node in between doesnt exists`, async function () {
        let dirPathCreated = await _writeTestDir();
        let pathToCreate = `${dirPathCreated}/path/that/doesnt/exist`;
        let success, error;
        fs.mkdirs(pathToCreate, 777, true, (err)=>{
            error = err;
            success = true;
        });
        await waitForTrue(()=>{return success;},1000);
        expect(error).to.be.null;
        await _validate_exists(pathToCreate);
    });

    it(`Should phoenix ${testType} mkdirs(path, recursive, cb)  work if any node in between doesnt exists`, async function () {
        let dirPathCreated = await _writeTestDir();
        let pathToCreate = `${dirPathCreated}/path/that/doesnt/exist`;
        let success, error;
        fs.mkdirs(pathToCreate, true, (err)=>{
            error = err;
            success = true;
        });
        await waitForTrue(()=>{return success;},1000);
        expect(error).to.be.null;
        await _validate_exists(pathToCreate);
    });

    it(`Should phoenix ${testType} mkdirs(path,mode, cb) fail if not recursive and any node in between doesnt exists`, async function () {
        let dirPathCreated = await _writeTestDir();
        let pathToCreate = `${dirPathCreated}/path/that/doesnt/exist`;
        let error;
        fs.mkdirs(pathToCreate, 777, (err)=>{
            error = err;
        });
        await waitForTrue(()=>{return !!error;},1000);
        expect(error.code).to.eql(fs.ERR_ENOENT);
        await _validate_not_exists(pathToCreate);
    });

    it(`Should phoenix ${testType} mkdirs(path, cb) work if mode not specified`, async function () {
        let dirPathCreated = await _writeTestDir();
        let pathToCreate = `${dirPathCreated}/newDir`;
        let success, error;
        fs.mkdirs(pathToCreate, (err)=>{
            error = err;
            success = true;
        });
        await waitForTrue(()=>{return success;},1000);
        expect(error).to.be.null;
        await _validate_exists(pathToCreate);
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
            expect(contentsRead[0].dev.startsWith('tauri')).to.be.true;
        });
    }
});