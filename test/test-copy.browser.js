/* global expect , Filer, fs, waitForTrue, TEST_TYPE_FS_ACCESS, TEST_TYPE_FILER*/

function _getPathForTestType(testType) {
    switch (testType) {
    case TEST_TYPE_FS_ACCESS: return window.mountTestPath;
    case TEST_TYPE_FILER: return window.virtualTestPath;
    default: throw new Error("unknown file system impl");
    }
}

function _setupTests(testTypeSrc, testTypeDst) {
    let srcTestPath, destTestPath;
    async function _clean() {
        console.log(`cleaning: `, srcTestPath);
        let cleanSuccess = false;
        fs.unlink(srcTestPath, ()=>{
            cleanSuccess = true;
        });
        await waitForTrue(()=>{return cleanSuccess;},10000);

        console.log(`cleaning: `, destTestPath);
        cleanSuccess = false;
        fs.unlink(destTestPath, ()=>{
            cleanSuccess = true;
        });
        await waitForTrue(()=>{return cleanSuccess;},10000);
    }

    before(async function () {
        srcTestPath = _getPathForTestType(testTypeSrc) + '/src';
        destTestPath = _getPathForTestType(testTypeDst)+ '/dest';
    });

    beforeEach(async function () {
        // setup test folders
        await _clean();
        console.log(`mkdir: `, srcTestPath);
        let makeSuccess = false;
        fs.mkdirs(srcTestPath, 777 ,true, ()=>{
            makeSuccess = true;
        });
        await waitForTrue(()=>{return makeSuccess;},10000);

        console.log(`mkdir: `, destTestPath);
        makeSuccess = false;
        fs.mkdirs(destTestPath, 777 ,true, ()=>{
            makeSuccess = true;
        });
        await waitForTrue(()=>{return makeSuccess;},10000);
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
    }, 10000);

    function _createFolder(path) {
        return new Promise((resolve, reject)=>{
            fs.mkdir(path, 777, (err)=>{
                if(err){
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    }
    function _createFile(path) {
        return new Promise((resolve, reject)=>{
            fs.writeFile(path, `hello World`, `utf8`, (err)=>{
                if(!err){
                    resolve();
                } else {
                    reject();
                }
            });
        });
    }

    function _shouldExist(path) {
        return new Promise((resolve)=>{
            fs.stat(path, (err)=>{
                if(err){
                    resolve(false);
                } else {
                    resolve(true);
                }
            });
        });
    }

    const TEST_FOLDERS = ["y", "z"];
    const TEST_FILES = ["a.txt", "b.txt", "y/c.txt"];
    async function _createTestFolderInBasePath(path, folderName) {
        await _createFolder(`${path}/${folderName}`);
        for(let folder of TEST_FOLDERS){
            await _createFolder(`${path}/${folderName}/${folder}`);
        }
        for(let file of TEST_FILES){
            await _createFile(`${path}/${folderName}/${file}`);
        }
    }

    async function _verifyCopyFolder(srcPath, dstPath, expectedPath) {
        let success = false;
        let actualCopiedPath = null;
        fs.copy(srcPath, dstPath, (err, path)=>{
            if(!err){
                success = true;
            }
            actualCopiedPath = path;
        });
        await waitForTrue(()=>{return success;},1000);
        expect(success).to.be.true;
        expectedPath = expectedPath || dstPath;
        for(let folder of TEST_FOLDERS){
            expect(await _shouldExist(`${expectedPath}/${folder}`)).to.be.true;
        }
        for(let file of TEST_FILES){
            expect(await _shouldExist(`${expectedPath}/${file}`)).to.be.true;
        }
        expect(actualCopiedPath).to.equal(expectedPath);
    }

    it(`Should phoenix copy fail if dst is a subpath of src`, async function () {
        let errored = false;
        fs.copy(`/a`, `/a/b`, (err)=>{
            if(err){
                errored = true;
            }
        });
        await waitForTrue(()=>{return errored;},1000);
        expect(errored).to.be.true;
    });

    // folder copy tests
    it(`Should phoenix copy folder from ${testTypeSrc} to ${testTypeDst} path`, async function () {
        await _createTestFolderInBasePath(srcTestPath, `testDir4`);
        let srcPath = `${srcTestPath}/testDir4`;
        let dstPath = `${destTestPath}/testDir4`;
        await _verifyCopyFolder(srcPath, dstPath);
    });

    it(`Should phoenix copy overwrite folder from ${testTypeSrc} to ${testTypeDst} path if already exist`, async function () {
        await _createTestFolderInBasePath(srcTestPath, `testDir5`);
        let srcPath = `${srcTestPath}/testDir5`;
        let dstPath = `${destTestPath}/testDir5`;
        let expectedPath = `${destTestPath}/testDir5/testDir5`;
        await _createFolder(dstPath);
        await _verifyCopyFolder(srcPath, dstPath, expectedPath);
    });

    // file copy tests
    async function _verifyCopyFile(srcPath, dstPath, expectedPath) {
        let success = false;
        let actualCopiedPath = null;
        fs.copy(srcPath, dstPath, (err, path)=>{
            if(!err){
                success = true;
            }
            actualCopiedPath = path;
        });
        await waitForTrue(()=>{return success;},1000);
        expect(success).to.be.true;
        expectedPath = expectedPath || dstPath;
        expect(await _shouldExist(expectedPath)).to.be.true;
        expect(actualCopiedPath).to.equal(expectedPath);
    }

    it(`Should phoenix copy file from ${testTypeSrc} to ${testTypeDst} path`, async function () {
        let dir = `testDir10.5`;
        await _createTestFolderInBasePath(srcTestPath, dir);
        let srcPath = `${srcTestPath}/${dir}/a.txt`;
        let dstFolder = `${destTestPath}/${dir}`;
        await _createFolder(dstFolder);
        let dstPath = `${dstFolder}/temp.txt`;
        await _verifyCopyFile(srcPath, dstPath);
    });

    it(`Should phoenix copy file within same ${testTypeSrc} fs path`, async function () {
        let dir = `testDir12`;
        await _createTestFolderInBasePath(srcTestPath, dir);
        let srcPath = `${srcTestPath}/${dir}/a.txt`;
        let dstPath = `${srcTestPath}/${dir}/lols.txt`;
        await _verifyCopyFile(srcPath, dstPath);
    });

    it(`Should phoenix fail copy file within same ${testTypeSrc} if dest file exist`, async function () {
        let dir = `testDir13`;
        await _createTestFolderInBasePath(srcTestPath, dir);
        let srcPath = `${srcTestPath}/${dir}/a.txt`;
        let dstFile = `${srcTestPath}/${dir}/jj.txt`;
        await _createFile(dstFile);
        let fail = false;
        fs.copy(srcPath, dstFile, (err)=>{
            if(err){
                fail = true;
            }
        });
        await waitForTrue(()=>{return fail;},1000);
        expect(fail).to.be.true;
    });
}

// between filer and fs access start
describe(`Browser copy tests from "filer" to "filer"`, function () {
    _setupTests(TEST_TYPE_FILER, TEST_TYPE_FILER);
});

describe(`Browser copy tests from "filer" to "fs access"`, function () {
    if(window.__TAURI__){
        it(`fs access tests are disabled in tauri`, function () {});
        return;
    }
    _setupTests(TEST_TYPE_FILER, TEST_TYPE_FS_ACCESS);
});

describe(`Browser copy tests from "fs access" to "filer"`, function () {
    if(window.__TAURI__){
        it(`fs access tests are disabled in tauri`, function () {});
        return;
    }
    _setupTests(TEST_TYPE_FS_ACCESS, TEST_TYPE_FILER);
});

describe(`Browser copy tests from "fs access" to "fs access"`, function () {
    if(window.__TAURI__){
        it(`fs access tests are disabled in tauri`, function () {});
        return;
    }
    _setupTests(TEST_TYPE_FS_ACCESS, TEST_TYPE_FS_ACCESS);
});
// between filer and fs access end
