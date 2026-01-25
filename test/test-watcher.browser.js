/* global expect , Filer, fs, waitForTrue, TEST_TYPE_FS_ACCESS, TEST_TYPE_FILER, TEST_TYPE_TAURI, TEST_TYPE_TAURI_WS*/

function _setupTests(testType) {
    let testPath, watcher, watcher2;

    function consoleLogToShell(message) {
        if(window.__TAURI__) {
            return window.__TAURI__.invoke("console_log", {message});
        }
        if(window.__ELECTRON__) {
            window.electronAPI.consoleLog(message);
            return Promise.resolve();
        }
        return Promise.resolve();
    }

    async function _getTestBaseDir() {
        if(window.__TAURI__) {
            return window.__TAURI__.path.appLocalDataDir();
        }
        if(window.__ELECTRON__) {
            return await window.electronAPI.getAppDataDir() + "/";
        }
        throw new Error("No native environment detected");
    }

    async function _waitForSomeTime(timeMS) {
        return new Promise(resolve=>{
            setTimeout(resolve, timeMS);
        });
    }

    async function _validate_exists(path) {
        let resolveP;
        const promise = new Promise((resolve) => {resolveP = resolve;});
        fs.stat(path, (error)=>{
            resolveP(error);
        });
        const err = await promise;
        expect(err).to.be.null;
    }

    async function _validate_not_exists(path) {
        let resolveP;
        const promise = new Promise((resolve) => {resolveP = resolve;});
        fs.stat(path, (error)=>{
            resolveP(error);
        });
        const err = await promise;
        expect(err.code).to.equal(fs.ERR_CODES.ENOENT);
    }

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

    function _fileContent() {
        return "hello world";
    }

    async function _writeTestFile(filePath, content = _fileContent()) {
        let resolveP,rejectP;
        const promise = new Promise((resolve, reject) => {resolveP = resolve; rejectP=reject;});
        fs.writeFile(filePath, content, `utf8`, (err)=>{
            if(err){
                rejectP(err);
            } else {
                resolveP(filePath);
            }
        });
        return promise;
    }

    async function _rename(srcPath, destPath) {
        let resolveP,rejectP;
        const promise = new Promise((resolve, reject) => {resolveP = resolve; rejectP=reject;});
        fs.rename(srcPath, destPath, (err, renamedPath)=>{
            if(err){
                rejectP(err);
            } else {
                resolveP(renamedPath);
            }
        });
        return promise;
    }

    async function _clean(path) {
        const pathToDelete = path || testPath;
        console.log(`cleaning: `, pathToDelete);
        let resolveP;
        const promise = new Promise((resolve) => {resolveP = resolve;});
        fs.unlink(pathToDelete, ()=>{
            resolveP();
        });
        await promise;
    }

    const ADD_DIR = fs.WATCH_EVENTS.ADD_DIR,
        UNLINK_DIR = fs.WATCH_EVENTS.UNLINK_DIR,
        ADD_FILE = fs.WATCH_EVENTS.ADD_FILE,
        UNLINK_FILE = fs.WATCH_EVENTS.UNLINK_FILE,
        CHANGE = fs.WATCH_EVENTS.CHANGE;

    async function _createNewWatcher(watchPath, pathChangeArray,  gitIgnorePaths="") {
        const newWatcher = await fs.watchAsync(watchPath,  gitIgnorePaths);
        const watchEvents = [ADD_DIR, UNLINK_DIR, ADD_FILE, UNLINK_FILE, CHANGE];
        for(let watchEvent of watchEvents) {
            newWatcher.on(watchEvent, function ({path}) {
                console.log(`Watcher: ${newWatcher.eventEmitterID}: path ${watchEvent}`, path);
                pathChangeArray.push({path, watchEvent});
            });
        }
        return newWatcher;
    }

    async function initWatcher(watchPath, pathChangeArray,  gitIgnorePaths="") {
        if(watcher) {
            await fs.unwatchAsync(watcher);
            watcher = null;
        }
        watcher = await _createNewWatcher(watchPath, pathChangeArray, gitIgnorePaths);
        console.log("watcher init done: ", watcher.eventEmitterID);
        return watcher;
    }

    async function initWatcher2(watchPath, pathChangeArray) {
        if(watcher2) {
            await fs.unwatchAsync(watcher2);
            watcher2 = null;
        }
        watcher2 = await _createNewWatcher(watchPath, pathChangeArray);
        console.log("watcher 2 init done: ", watcher2.eventEmitterID);
        return watcher2;
    }

    before(async function () {
        switch (testType) {
        case TEST_TYPE_FS_ACCESS: testPath = window.mountTestPath;break;
        case TEST_TYPE_FILER: testPath = window.virtualTestPath;break;
        case TEST_TYPE_TAURI_WS:
            await window.waitForTrue(()=>{return window.isNodeSetup;},1000);
            fs.forceUseNodeWSEndpoint(true);
            testPath = fs.getTauriVirtualPath(`${await _getTestBaseDir()}test-phoenix-fs`);
            consoleLogToShell("using tauri websocket test path: "+ testPath);
            break;
        case TEST_TYPE_TAURI:
            testPath = fs.getTauriVirtualPath(`${await _getTestBaseDir()}test-phoenix-fs`);
            consoleLogToShell("using tauri test path: "+ testPath);
            break;
        default: throw new Error("unknown file system impl");
        }
    });

    beforeEach(async function () {
        // setup test folders
        await _clean();
        console.log(`mkdir: `, testPath);
        let resolveP;
        const promise = new Promise((resolve) => {resolveP = resolve;});
        fs.mkdirs(testPath, 0o777 ,true, ()=>{
            resolveP();
        });
        await promise;
    });

    afterEach(async function () {
        this.timeout(30000); // set max time to wait for a test to pass or fail
        if(watcher){
            await fs.unwatchAsync(watcher);
            watcher = null;
        }
        if(watcher2){
            await fs.unwatchAsync(watcher2);
            watcher2 = null;
        }
        await _clean();
        await _waitForSomeTime(1000); // wait for 1 second to purge all delete watch events in node
    });

    after(function () {
        if(window.__TAURI__ || window.__ELECTRON__) {
            fs.forceUseNodeWSEndpoint(false);
        }
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

    it(`Should phoenix ${testType} write in browser`, async function () {
        await _writeTestFile(`${testPath}/browserWrite.txt`);
    });

    it(`Should phoenix ${testType} watch for file and folder creation/deletion and change`, async function () {
        const watchPath = `${testPath}/watch`;
        await _creatDirAndValidate(watchPath);
        await _waitForSomeTime(500); // wait for some watcher events to trickle out maybe due to os delays

        watcher = await fs.watchAsync(watchPath);

        let addedPaths = [];
        function addToPath({path}) {
            console.log("path", path);
            addedPaths.push(path);
        }

        watcher.on(fs.WATCH_EVENTS.ADD_DIR, addToPath);
        let pathCreated = `${watchPath}/x`;
        await _creatDirAndValidate(pathCreated);
        await waitForTrue(()=>{return addedPaths.length === 1;},10000);
        expect(addedPaths[0]).to.eql(pathCreated);

        watcher.on(fs.WATCH_EVENTS.UNLINK_DIR, addToPath);
        addedPaths = [];
        await _clean(pathCreated);
        await waitForTrue(()=>{return addedPaths.length === 1;},10000);
        expect(addedPaths[0]).to.eql(pathCreated);

        watcher.on(fs.WATCH_EVENTS.ADD_FILE, addToPath);
        addedPaths = [];
        pathCreated = `${watchPath}/browserWrite.txt`;
        await _writeTestFile(pathCreated);
        await waitForTrue(()=>{return addedPaths.length === 1;},10000);
        expect(addedPaths[0]).to.eql(pathCreated);

        watcher.off(fs.WATCH_EVENTS.ADD_FILE, addToPath);
        watcher.on(fs.WATCH_EVENTS.CHANGE, addToPath);
        addedPaths = [];
        pathCreated = `${watchPath}/browserWrite.txt`;
        await _writeTestFile(pathCreated);
        await waitForTrue(()=>{return addedPaths.length === 1;},10000);
        expect(addedPaths[0]).to.eql(pathCreated);

        watcher.on(fs.WATCH_EVENTS.UNLINK_FILE, addToPath);
        addedPaths = [];
        await _clean(pathCreated);
        await waitForTrue(()=>{return addedPaths.length === 1;},10000);
        expect(addedPaths[0]).to.eql(pathCreated);
    });

    it(`Should phoenix ${testType} watch a file`, async function () {
        const watchPath = `${testPath}/a.txt`,
            fileInSameDirNotWatched = `${testPath}/b.txt`;
        await _writeTestFile(watchPath);
        await _waitForSomeTime(500); // wait for some watcher events to trickle out maybe due to os delays

        const pathChangeArray = [];

        await initWatcher(watchPath, pathChangeArray);

        await _writeTestFile(watchPath);
        await _writeTestFile(fileInSameDirNotWatched);

        await waitForTrue(()=>{return pathChangeArray.length === 1;},10000);
        await _waitForSomeTime(1000); // maybe some more events might come in so wait for some time to be sure?
        expect(pathChangeArray).to.deep.include({ path: watchPath, watchEvent: CHANGE});
        expect(pathChangeArray.length).to.eql(1);
    });

    it(`Should phoenix ${testType} watch honor git ignoree list`, async function () {
        const watchPath = `${testPath}/watch`;
        await _creatDirAndValidate(watchPath);
        await _creatDirAndValidate(`${watchPath}/anotherPath`);
        await _creatDirAndValidate(`${watchPath}/exact`);
        await _waitForSomeTime(1000); // wait for some watcher events to trickle out maybe due to os delays

        const pathChangeArray = [];

        await initWatcher(watchPath, pathChangeArray, ['ignored_path', '/exact/path', '/exact/file.txt']);

        // ignored
        await _creatDirAndValidate(`${watchPath}/ignored_path`);
        await _writeTestFile(`${watchPath}/ignored_path/a.txt`);
        await _creatDirAndValidate(`${watchPath}/anotherPath/ignored_path`);
        await _creatDirAndValidate(`${watchPath}/exact/path`);
        await _writeTestFile(`${watchPath}/exact/file.txt`);
        // not ignored
        await _writeTestFile(`${watchPath}/b.txt`);
        await _creatDirAndValidate(`${watchPath}/anotherPath/exact`);
        await _writeTestFile(`${watchPath}/anotherPath/file.txt`);
        await _creatDirAndValidate(`${watchPath}/newPath`);
        await _writeTestFile(`${watchPath}/newPath/b.txt`);

        const expectedChanges = 5;
        await waitForTrue(()=>{return pathChangeArray.length >= expectedChanges;},100000);
        await _waitForSomeTime(1000); // maybe some more events might come in so wait for some time to be sure?
        // check inclusions
        expect(pathChangeArray).to.deep.include({ path: `${watchPath}/b.txt`, watchEvent: ADD_FILE});
        expect(pathChangeArray).to.deep.include({ path: `${watchPath}/anotherPath/exact`, watchEvent: ADD_DIR});
        expect(pathChangeArray).to.deep.include({ path: `${watchPath}/anotherPath/file.txt`, watchEvent: ADD_FILE});
        expect(pathChangeArray).to.deep.include({ path: `${watchPath}/newPath`, watchEvent: ADD_DIR});
        expect(pathChangeArray).to.deep.include({ path: `${watchPath}/newPath/b.txt`, watchEvent: ADD_FILE});
        // check exclusions
        expect(pathChangeArray).not.to.deep.include({ path: `${watchPath}/ignored_path`, watchEvent: ADD_DIR});
        expect(pathChangeArray).not.to.deep.include({ path: `${watchPath}/ignored_path/a.txt`, watchEvent: ADD_FILE});
        expect(pathChangeArray).not.to.deep.include({ path: `${watchPath}/anotherPath/ignored_path`, watchEvent: ADD_DIR});
        expect(pathChangeArray).not.to.deep.include({ path: `${watchPath}/exact/path`, watchEvent: ADD_DIR});
        expect(pathChangeArray).not.to.deep.include({ path: `${watchPath}/exact/file.txt`, watchEvent: ADD_FILE});
    }).timeout(100000);

    it(`Should phoenix ${testType} watch for file rename`, async function () {
        const watchPath = `${testPath}/watch`;
        await _creatDirAndValidate(watchPath);

        let removedPaths = [], addedPaths = [], pathCreated;
        function addToPath({path}) {
            console.log("path added", path);
            addedPaths.push(path);
        }
        function removeFromPath({path}) {
            console.log("path removed", path);
            removedPaths.push(path);
        }

        pathCreated = `${watchPath}/browserWrite.txt`;
        await _writeTestFile(pathCreated);

        await _waitForSomeTime(500); // wait for some watcher events to trickle out maybe due to os delays

        watcher = await fs.watchAsync(watchPath);
        watcher.on(fs.WATCH_EVENTS.ADD_FILE, addToPath);
        watcher.on(fs.WATCH_EVENTS.UNLINK_FILE, removeFromPath);

        const pathRenamed = `${watchPath}/browserWrite-rename.txt`;
        await _rename(pathCreated, pathRenamed);
        await waitForTrue(()=>{return addedPaths.length === 1 && removedPaths.length === 1;},10000);
        expect(removedPaths[0]).to.eql(pathCreated);
        expect(addedPaths[0]).to.eql(pathRenamed);
    });

    it(`Should phoenix ${testType} watch support multiple watchers concurrently on same dir`, async function () {
        const watchPath = `${testPath}/watch`;
        await _creatDirAndValidate(watchPath);
        await _waitForSomeTime(500); // wait for some watcher events to trickle out maybe due to os delays

        const pathChangeArray = [], watcher2PathChangeArray = [];
        let pathCreated = `${watchPath}/x`;
        const nestedFile = `${watchPath}/x/a.txt`;

        await initWatcher(watchPath, pathChangeArray);
        await initWatcher2(watchPath, watcher2PathChangeArray);

        await _creatDirAndValidate(pathCreated);
        await _writeTestFile(nestedFile);

        await waitForTrue(()=>{return pathChangeArray.length === 2;},10000);
        await waitForTrue(()=>{return watcher2PathChangeArray.length === 2;},10000);
        expect(pathChangeArray).to.deep.include({ path: pathCreated, watchEvent: ADD_DIR});
        expect(pathChangeArray).to.deep.include({ path: nestedFile, watchEvent: ADD_FILE});
        expect(watcher2PathChangeArray).to.deep.include({ path: pathCreated, watchEvent: ADD_DIR});
        expect(watcher2PathChangeArray).to.deep.include({ path: nestedFile, watchEvent: ADD_FILE});
    });

    it(`Should phoenix ${testType} watch support multiple watchers concurrently on same file`, async function () {
        const watchPath = `${testPath}/a.txt`;
        await _writeTestFile(watchPath);
        await _waitForSomeTime(500); // wait for some watcher events to trickle out maybe due to os delays

        const pathChangeArray = [], watcher2PathChangeArray = [];

        await initWatcher(watchPath, pathChangeArray);
        await initWatcher2(watchPath, watcher2PathChangeArray);

        await _writeTestFile(watchPath);

        await waitForTrue(()=>{return pathChangeArray.length === 1;},10000);
        await waitForTrue(()=>{return watcher2PathChangeArray.length === 1;},10000);
        await _waitForSomeTime(100); // maybe some more events might come in so wait for some time to be sure?
        expect(pathChangeArray).to.deep.include({ path: watchPath, watchEvent: CHANGE});
        expect(watcher2PathChangeArray).to.deep.include({ path: watchPath, watchEvent: CHANGE});
    });

    it(`Should phoenix ${testType} watch throw error if trying to watch root dir`, async function () {
        let err;
        try{
            await fs.watchAsync("/tauri/");
        } catch (e) {
            err = e;
        }
        expect(err.code).to.eql(fs.ERR_CODES.EPERM);
    });

    if(testType === TEST_TYPE_TAURI_WS || testType === TEST_TYPE_TAURI){
        it(`Should phoenix ${testType} watch for folder rename with nested contents [tauri chokidar only emits nested events]`, async function () {
            const watchPath = `${testPath}/watch`;
            await _creatDirAndValidate(watchPath);
            await _waitForSomeTime(500); // wait for some watcher events to trickle out maybe due to os delays

            const pathChangeArray = [];
            let pathCreated = `${watchPath}/x`;
            const nestedFile = `${watchPath}/x/a.txt`;
            await _creatDirAndValidate(pathCreated);
            await _writeTestFile(nestedFile);

            await initWatcher(watchPath, pathChangeArray);

            const pathRenamed = `${watchPath}/y`;
            await _rename(pathCreated, pathRenamed);
            await waitForTrue(()=>{return pathChangeArray.length === 4;},10000);
            expect(pathChangeArray).to.deep.include({ path: pathCreated, watchEvent: UNLINK_DIR});
            expect(pathChangeArray).to.deep.include({ path: pathRenamed, watchEvent: ADD_DIR});
            expect(pathChangeArray).to.deep.include({ path: nestedFile, watchEvent: UNLINK_FILE});
            expect(pathChangeArray).to.deep.include({ path: `${pathRenamed}/a.txt`, watchEvent: ADD_FILE});
        });
    } else {
        it(`Should phoenix ${testType} watch for folder rename with nested contents [our fs impl doesnt emit nested events]`, async function () {
            const watchPath = `${testPath}/watch`;
            await _creatDirAndValidate(watchPath);
            await _waitForSomeTime(500); // wait for some watcher events to trickle out maybe due to os delays

            const pathChangeArray = [];
            let pathCreated = `${watchPath}/x`;
            const nestedFile = `${watchPath}/x/a.txt`;
            await _creatDirAndValidate(pathCreated);
            await _writeTestFile(nestedFile);

            await initWatcher(watchPath, pathChangeArray);

            const pathRenamed = `${watchPath}/y`;
            await _rename(pathCreated, pathRenamed);
            await waitForTrue(()=>{return pathChangeArray.length === 2;},10000);
            expect(pathChangeArray).to.deep.include({ path: pathCreated, watchEvent: UNLINK_DIR});
            expect(pathChangeArray).to.deep.include({ path: pathRenamed, watchEvent: ADD_DIR});
        });
    }

    it(`Should phoenix ${testType} watch and unwatch using watcher.on and watcher.off`, async function () {
        const watchPath = `${testPath}/watch`;
        await _validate_not_exists(watchPath);
        await _creatDirAndValidate(watchPath);
        await _waitForSomeTime(500); // wait for some watcher events to trickle out maybe due to os delays

        watcher = await fs.watchAsync(watchPath);

        let addedPaths = [];
        function addToPath({path}) {
            console.log("received add event: ", path);
            addedPaths.push(path);
        }
        watcher.on(fs.WATCH_EVENTS.ADD_DIR, addToPath);

        let pathCreated = `${watchPath}/x`;
        await _creatDirAndValidate(pathCreated);
        await waitForTrue(()=>{return addedPaths.length === 1;},10000);
        expect(addedPaths[0]).to.eql(pathCreated);

        watcher.off(fs.WATCH_EVENTS.ADD_DIR, addToPath);
        addedPaths = [];
        pathCreated = `${watchPath}/y`;
        await _creatDirAndValidate(pathCreated);
        await _waitForSomeTime(300);
        expect(addedPaths.length).to.eql(0);
    });
}


describe(`Watcher: Browser virtual fs tests: filer paths`, function () {
    _setupTests(TEST_TYPE_FILER);
});

if(window.__TAURI__ || window.__ELECTRON__){
    describe(`Watcher: Browser virtual fs tests: tauri paths`, function () {
        _setupTests(TEST_TYPE_TAURI);
    });

    describe(`Watcher: Browser virtual fs tests: tauri websocket paths`, function () {
        _setupTests(TEST_TYPE_TAURI_WS);
    });
}

if(window.supportsFsAccessAPIs){
    describe(`Watcher: Browser virtual fs tests: fs access mount point paths`, function () {
        if(window.__TAURI__ || window.__ELECTRON__){
            it('fs access Watcher tests are disabled in tauri/electron', function () {});
            return;
        }
        _setupTests(TEST_TYPE_FS_ACCESS);
    });
}
