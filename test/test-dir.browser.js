/* global expect , Filer, fs, waitForTrue, TEST_TYPE_FS_ACCESS, TEST_TYPE_FILER, TEST_TYPE_TAURI, TEST_TYPE_TAURI_WS, path, iconv*/

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
        expect(err.code).to.equal(fs.ERR_CODES.ENOENT);
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
        case TEST_TYPE_TAURI_WS:
            await window.waitForTrue(()=>{return window.isNodeSetup;},1000);
            fs.forceUseNodeWSEndpoint(true);
            testPath = fs.getTauriVirtualPath(`${await window.__TAURI__.path.appLocalDataDir()}test-phoenix-fs`);
            consoleLogToShell("using tauri websocket test path: "+ testPath);
            break;
        case TEST_TYPE_TAURI:
            testPath = fs.getTauriVirtualPath(`${await window.__TAURI__.path.appLocalDataDir()}test-phoenix-fs`);
            consoleLogToShell("using tauri test path: "+ testPath);
            break;
        default: throw new Error("unknown file system impl");
        }
    });

    after(function () {
        if(window.__TAURI__) {
            fs.forceUseNodeWSEndpoint(false);
        }
    });

    beforeEach(async function () {
        // setup test folders
        await _clean();
        console.log(`mkdirs: `, testPath);
        let mkdirResolve;
        const mkdirPromise = new Promise((resolve) => {mkdirResolve = resolve;});
        fs.mkdirs(testPath, 0o777 ,true, ()=>{
            mkdirResolve();
        });
        await mkdirPromise;
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
        expect(Buffer).to.exist;
        expect(path).to.exist;
        expect(iconv).to.exist;
        expect(fs.Buffer).to.exist;
        expect(fs.utils.iconv).to.exist;
        expect(fs.utils.ignore).to.exist;
        expect(fs.utils.anymatch).to.exist;
        expect(fs.path).to.exist;
        expect(fs.name).to.equal(`phoenixFS`);
        expect(fs.MOUNT_POINT_ROOT).to.equal(`/mnt`);
        expect(fs.TAURI_ROOT).to.equal(`/tauri`);
    }, 10000);

    function _creatDirAndValidate(path) {
        return new Promise((resolve, reject)=>{
            fs.mkdir(path, (err)=>{
                if(err){
                    reject();
                } else {
                    _validate_exists(path)
                        .then(resolve)
                        .catch(reject);
                }
            });
        });
    }

    async function _writeTestDir() {
        let path = `${testPath}/testDir`;
        await _creatDirAndValidate(path);
        return path;
    }

    async function _writeTestFile() {
        let writeSuccess = false;
        let filePath = `${testPath}/browserWrite.txt`;
        fs.writeFile(filePath, `hello World`, `utf8`, (err)=>{
            if(!err){
                writeSuccess = true;
            }
        });
        await waitForTrue(()=>{return writeSuccess;},10000);
        expect(writeSuccess).to.be.true;
        return filePath;
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
        expect(error.code).to.equal(fs.ERR_CODES.ENOENT);
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
        fs.mkdir(dirPathToCreate, 0o777, (err)=>{
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
        fs.mkdir(dirPathCreated, 0o777, (err)=>{
            error = err;
        });
        await waitForTrue(()=>{return !!error;},1000);
        expect(error.code).to.equal(fs.ERR_CODES.EEXIST);
    });

    it(`Should phoenix ${testType} mkdirs(path,mode, recursive, cb) even if exists`, async function () {
        let dirPathCreated = await _writeTestDir();
        let success, error;
        fs.mkdirs(dirPathCreated, 0o777, true, (err)=>{
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
        fs.mkdirs(pathToCreate, 0o777, true, (err)=>{
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
        fs.mkdirs(pathToCreate, 0o777, (err)=>{
            error = err;
        });
        await waitForTrue(()=>{return !!error;},1000);
        expect(error.code).to.eql(fs.ERR_CODES.ENOENT);
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

    it(`Should phoenix ${testType} unlink(path, cb) work for empty dirs`, async function () {
        let dirPathCreated = await _writeTestDir();
        let success, error;
        fs.unlink(dirPathCreated, (err)=>{
            error = err;
            success = true;
        });
        await waitForTrue(()=>{return success;},1000);
        expect(error).to.be.null;
        await _validate_not_exists(dirPathCreated);
    });

    it(`Should phoenix ${testType} unlink(path, cb) work for non-empty dirs`, async function () {
        let dirPathCreated = await _writeTestDir();
        await _creatDirAndValidate(`${dirPathCreated}/sub1`);
        await _creatDirAndValidate(`${dirPathCreated}/sub2`);
        let success, error;
        fs.unlink(dirPathCreated, (err)=>{
            error = err;
            success = true;
        });
        await waitForTrue(()=>{return success;},1000);
        expect(error).to.be.null;
        await _validate_not_exists(dirPathCreated);
    });

    it(`Should phoenix ${testType} unlink(path, cb) non existent dir enoent`, async function () {
        let fileNotExistsPath = `${testPath}/dirNotExists`;
        let done, error;
        fs.unlink(fileNotExistsPath, (err)=>{
            error = err;
            done = true;
        });
        await waitForTrue(()=>{return done;},1000);
        expect(error.code).to.equal(fs.ERR_CODES.ENOENT);
        await _validate_not_exists(fileNotExistsPath);
    });

    it(`Should phoenix ${testType} get stat of dir`, async function () {
        let dirPathCreated = await _writeTestDir();
        let stats, error;
        fs.stat(dirPathCreated, (err, stat)=>{
            stats = stat;
            error = err;
        });
        await waitForTrue(()=>{return !!stats;},1000);
        expect(error).to.be.null;
        expect(stats.isDirectory()).to.be.true;
        expect(stats.name).to.equal(Filer.path.basename(dirPathCreated));
        switch (testType) {
        case TEST_TYPE_FS_ACCESS:
            expect(stats.dev).to.eql("nativeFsAccess");
            expect(stats.mtime).to.be.null; // fs access pais directory doesnt yet have way to get modified time
            break;
        case TEST_TYPE_FILER:
            expect(stats.dev).to.eql("local");
            expect(stats.mtime).to.be.an.instanceof(Date);
            expect(stats.mtime > 0).to.be.true;
            break;
        case TEST_TYPE_TAURI:
            expect(stats.dev.split("_")[0]).to.eql("tauri");
            expect(stats.mtime).to.be.an.instanceof(Date);
            expect(stats.mtime > 0).to.be.true;
            break;
        case TEST_TYPE_TAURI_WS:
            expect(stats.dev.split("_")[0]).to.eql("tauriWS");
            expect(stats.mtime).to.be.an.instanceof(Date);
            expect(stats.mtime > 0).to.be.true;
            break;
        default: throw new Error("unknown file system impl");
        }
    });

    it(`Should phoenix ${testType} throw enoent if dir doesnt exist`, async function () {
        let dirNotExistsPath = `${await _writeTestDir()}/path/that/dont/exist`;
        let error;
        fs.stat(dirNotExistsPath, (err)=>{
            error = err;
        });
        await waitForTrue(()=>{return !!error;},1000);
        expect(error.code).to.equal(fs.ERR_CODES.ENOENT);
    });

    async function _validateRename(oldPath, newPath, errCode) {
        let resolveP;
        const promise = new Promise((resolve) => {resolveP = resolve;});
        let error;
        fs.rename(oldPath, newPath, (err)=>{
            error = err;
            resolveP();
        });
        await promise;
        if(!errCode){
            expect(error).to.be.null;
        } else {
            expect(error.code).to.eql(errCode);
        }
    }

    it(`Should phoenix ${testType} rename fail if dst or src are sub paths of each other`, async function () {
        await _validateRename(`${testPath}/a`, `${testPath}/a/b`, fs.ERR_CODES.EINVAL);
        await _validateRename(`${testPath}/a/b`, `${testPath}/a/`, fs.ERR_CODES.EINVAL);
    });

    it(`Should phoenix ${testType} rename fail if src doesnt exist`, async function () {
        await _validateRename(`${testPath}/a`, `${testPath}/b`, fs.ERR_CODES.ENOENT);
    });

    it(`Should phoenix ${testType} rename fail if dst exists`, async function () {
        await _creatDirAndValidate(`${testPath}/a`);
        await _creatDirAndValidate(`${testPath}/b`);
        await _validateRename(`${testPath}/a`, `${testPath}/b`, fs.ERR_CODES.EEXIST);
    });

    it(`Should phoenix ${testType} rename fail if dst is a file and exists`, async function () {
        await _creatDirAndValidate(`${testPath}/a`);
        let filePath = await _writeTestFile();
        await _validateRename(`${testPath}/a`, filePath, fs.ERR_CODES.EEXIST);
    });

    it(`Should phoenix ${testType} rename fail if dst parent doesnt exist`, async function () {
        await _creatDirAndValidate(`${testPath}/a`);
        await _validateRename(`${testPath}/a`, `${testPath}/b/c`, fs.ERR_CODES.ENOENT);
    });

    it(`Should phoenix ${testType} rename empty dir`, async function () {
        let dirCreated = await _writeTestDir();
        await _creatDirAndValidate(`${dirCreated}/a`);
        await _validateRename(`${dirCreated}/a`, `${dirCreated}/b`);
        await _validate_not_exists(`${dirCreated}/a`);
        await _validate_exists(`${dirCreated}/b`);
    });

    it(`Should phoenix ${testType} rename dir test 2`, async function () {
        let dirCreated = await _writeTestDir();
        await _creatDirAndValidate(`${dirCreated}/a`);
        await _creatDirAndValidate(`${dirCreated}/a/x`);
        await _creatDirAndValidate(`${dirCreated}/z`);
        await _validateRename(`${dirCreated}/a`, `${dirCreated}/z/b`);
        await _validate_not_exists(`${dirCreated}/a`);
        await _validate_exists(`${dirCreated}/z/b`);
        await _validate_exists(`${dirCreated}/z/b/x`);
    });

    it(`Should phoenix ${testType} rename non-empty dir`, async function () {
        let dirCreated = await _writeTestDir();
        await _creatDirAndValidate(`${dirCreated}/a`);
        await _creatDirAndValidate(`${dirCreated}/a/c`);
        await _validateRename(`${dirCreated}/a`, `${dirCreated}/b`);
        await _validate_not_exists(`${dirCreated}/a`);
        await _validate_exists(`${dirCreated}/b`);
        await _validate_exists(`${dirCreated}/b/c`);
    });
}

describe(`Dir: Browser virtual fs tests: filer paths`, function () {
    _setupTests(TEST_TYPE_FILER);
});

if(window.__TAURI__){
    describe(`Dir: Browser virtual fs tests: Tauri paths`, function () {
        _setupTests(TEST_TYPE_TAURI);
    });

    describe(`Dir: Browser virtual fs tests: Tauri WebSocket paths`, function () {
        _setupTests(TEST_TYPE_TAURI_WS);
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

    async function _testTauriDir(expectedStatDeviceName) {
        let readSuccess, contentsRead;
        fs.readdir(`/tauri`, {withFileTypes: !!expectedStatDeviceName}, (err, contents)=>{
            if(!err){
                readSuccess = true;
            }
            contentsRead = contents;
        });
        await waitForTrue(()=>{return readSuccess;},1000);
        expect(readSuccess).to.be.true;
        expect(contentsRead.length>=1).to.be.true;
        if(expectedStatDeviceName) {
            expect(contentsRead[0].dev.split("_")[0]).to.eql(expectedStatDeviceName);
        }
    }

    if(window.__TAURI__){

        before(async ()=>{
            await window.waitForTrue(()=>{return window.isNodeSetup;},1000);
        });

        it(`Should read root /tauri dir`, async function () {
            fs.forceUseNodeWSEndpoint(false);
            await _testTauriDir();
        });

        it(`Should read root /tauri dir with file types`, async function () {
            fs.forceUseNodeWSEndpoint(false);
            await _testTauriDir('tauri');
        });

        it(`Should read root /tauri dir using tauriWS`, async function () {
            fs.forceUseNodeWSEndpoint(true);
            await _testTauriDir();
        });

        it(`Should read root /tauri dir with file types using tauriWS`, async function () {
            fs.forceUseNodeWSEndpoint(true);
            await _testTauriDir('tauriWS');
        });
    }
});


describe(`Dir: Should misc tests`, async function () {
    async function _RenameFailsWith(oldPath, newPath, errCode) {
        let resolveP;
        const promise = new Promise((resolve) => {resolveP = resolve;});
        let error;
        fs.rename(oldPath, newPath, (err)=>{
            error = err;
            resolveP();
        });
        await promise;
        expect(error.code).to.eql(errCode);
    }
    it(`Should phoenix rename fail rename of mount root path`, async function () {
        await _RenameFailsWith(`/mnt/`, `/some/a/b`, fs.ERR_CODES.EPERM);
        await _RenameFailsWith(`/mnt`, `/some/a/b`, fs.ERR_CODES.EPERM);
        await _RenameFailsWith(`/some/a/b`, `/mnt/`, fs.ERR_CODES.EPERM);
    });

    it(`Should phoenix rename fail rename of tauri root path`, async function () {
        await _RenameFailsWith(`/tauri/`, `/some/a/b`, fs.ERR_CODES.EPERM);
        await _RenameFailsWith(`/tauri`, `/some/a/b`, fs.ERR_CODES.EPERM);
        await _RenameFailsWith( `/some/a/b`, `/tauri`, fs.ERR_CODES.EPERM);
    });
});