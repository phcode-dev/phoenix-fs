/* global expect , Filer, fs, waitForTrue, TEST_TYPE_FS_ACCESS, TEST_TYPE_FILER, TEST_TYPE_TAURI, TEST_TYPE_TAURI_WS*/

function _setupTests(testType) {
    let testPath, watcher;

    function consoleLogToShell(message) {
        return window.__TAURI__.invoke("console_log", {message});
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
        await _clean();
    });

    after(function () {
        if(window.__TAURI__) {
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

        watcher = await fs.watchAsync(watchPath);
        watcher.on(fs.WATCH_EVENTS.ADD_FILE, addToPath);
        watcher.on(fs.WATCH_EVENTS.UNLINK_FILE, removeFromPath);

        const pathRenamed = `${watchPath}/browserWrite-rename.txt`;
        await _rename(pathCreated, pathRenamed);
        await waitForTrue(()=>{return addedPaths.length === 1 && removedPaths.length === 1;},10000);
        expect(removedPaths[0]).to.eql(pathCreated);
        expect(addedPaths[0]).to.eql(pathRenamed);
    });

    const ADD_DIR = fs.WATCH_EVENTS.ADD_DIR,
        UNLINK_DIR = fs.WATCH_EVENTS.UNLINK_DIR,
        ADD_FILE = fs.WATCH_EVENTS.ADD_FILE,
        UNLINK_FILE = fs.WATCH_EVENTS.UNLINK_FILE,
        CHANGE = fs.WATCH_EVENTS.CHANGE;
    async function initWatchers(watchPath, pathChangeArray) {
        if(watcher) {
            await fs.unwatchAsync(watcher);
            watcher = null;
        }
        watcher = await fs.watchAsync(watchPath);
        const watchEvents = [ADD_DIR, UNLINK_DIR, ADD_FILE, UNLINK_FILE, CHANGE];
        for(let watchEvent of watchEvents) {
            watcher.on(watchEvent, function ({path}) {
                console.log(`path ${watchEvent}`, path);
                pathChangeArray.push({path, watchEvent});
            });
        }
    }

    it(`Should phoenix ${testType} watch for folder rename with nested contents`, async function () {
        const watchPath = `${testPath}/watch`;
        await _creatDirAndValidate(watchPath);

        const pathChangeArray = [];
        let pathCreated = `${watchPath}/x`;
        const nestedFile = `${watchPath}/x/a.txt`;
        await _creatDirAndValidate(pathCreated);
        await _writeTestFile(nestedFile);

        await initWatchers(watchPath, pathChangeArray);

        const pathRenamed = `${watchPath}/y`;
        await _rename(pathCreated, pathRenamed);
        await waitForTrue(()=>{return pathChangeArray.length === 4;},10000);
        expect(pathChangeArray).to.deep.include({ path: pathCreated, watchEvent: UNLINK_DIR});
        expect(pathChangeArray).to.deep.include({ path: pathRenamed, watchEvent: ADD_DIR});
        expect(pathChangeArray).to.deep.include({ path: nestedFile, watchEvent: UNLINK_FILE});
        expect(pathChangeArray).to.deep.include({ path: `${pathRenamed}/a.txt`, watchEvent: ADD_FILE});
    });

    it(`Should phoenix ${testType} watch and unwatch file events`, async function () {
        const watchPath = `${testPath}/watch`;
        await _validate_not_exists(watchPath);
        await _creatDirAndValidate(watchPath);
        watcher = await fs.watchAsync(watchPath);

        let addedPaths = [];
        function addToPath({path}) {
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
        let waitForSomeEventsDone = false;
        setTimeout(()=>{waitForSomeEventsDone = true;}, 500);
        await waitForTrue(()=>{return waitForSomeEventsDone;},1000);
        expect(addedPaths.length).to.eql(0);
    });
}

// todo enable
// describe(`Watcher: Browser virtual fs tests: filer paths`, function () {
//     _setupTests(TEST_TYPE_FILER);
// });

if(window.__TAURI__){
    describe(`Watcher: Browser virtual fs tests: tauri paths`, function () {
        _setupTests(TEST_TYPE_TAURI);
    });

    describe(`Watcher: Browser virtual fs tests: tauri websocket paths`, function () {
        _setupTests(TEST_TYPE_TAURI_WS);
    });
}

// todo enable
// if(window.supportsFsAccessAPIs){
//     describe(`Watcher: Browser virtual fs tests: fs access mount point paths`, function () {
//         if(window.__TAURI__){
//             it('fs access Watcher tests are disabled in tauri', function () {});
//             return;
//         }
//         _setupTests(TEST_TYPE_FS_ACCESS);
//     });
// }
