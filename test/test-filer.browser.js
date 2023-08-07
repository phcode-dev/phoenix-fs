/* global expect , Filer, fs*/

describe('Browser filer tests', function () {
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
        console.log('cleaning: ', window.virtualTestPath);
        let cleanSuccess = false;
        fs.unlink(window.virtualTestPath, ()=>{
            cleanSuccess = true;
        });
        await waitForTrue(()=>{return cleanSuccess;},10000);
    }

    beforeEach(async function () {
        // setup test folders
        await _clean();
        console.log('mkdir: ', window.virtualTestPath);
        let cleanSuccess = false;
        fs.mkdirs(window.virtualTestPath, 777 ,true, ()=>{
            cleanSuccess = true;
        });
        await waitForTrue(()=>{return cleanSuccess;},10000);
    });

    afterEach(async function () {
        await _clean();
    });

    it('Should load Filer in browser', function () {
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
        fs.writeFile(`${window.virtualTestPath}/browserWrite.txt`, 'hello World', 'utf8', (err)=>{
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
        let path = `${window.virtualTestPath}/testDir`;
        fs.mkdir(path, (err)=>{
            if(!err){
                createSuccess = true;
            }
        });
        await waitForTrue(()=>{return createSuccess;},1000);
        expect(createSuccess).to.be.true;
        return path;
    }

    it('Should phoenix filer write in browser', async function () {
        await _writeTestFile();
    });

    it('Should phoenix filer read in browser', async function () {
        await _writeTestFile();
        let readSuccess = false;
        fs.readFile(`${window.virtualTestPath}/browserWrite.txt`, 'utf8', (err)=>{
            if(!err){
                readSuccess = true;
            }
        });
        await waitForTrue(()=>{return readSuccess;},1000);
        expect(readSuccess).to.be.true;
    });

    it('Should phoenix filer read dir', async function () {
        await _writeTestFile();
        let readSuccess = false, contentsRead;
        fs.readdir(`${window.virtualTestPath}`, (err, contents)=>{
            if(!err){
                readSuccess = true;
            }
            contentsRead = contents;
        });
        await waitForTrue(()=>{return readSuccess;},1000);
        expect(readSuccess).to.be.true;
        expect(contentsRead.length).to.equal(1);
    });

    it('Should phoenix filer read dir with withFileTypes', async function () {
        await _writeTestFile();
        let readSuccess = false, contentsRead;
        fs.readdir(`${window.virtualTestPath}`, {withFileTypes: true} , (err, contents)=>{
            if(!err){
                readSuccess = true;
            }
            contentsRead = contents;
        });
        await waitForTrue(()=>{return readSuccess;},1000);
        expect(readSuccess).to.be.true;
        expect(contentsRead[0].type).to.exist;
    });

    it('Should phoenix filer delete in browser', async function () {
        await _writeTestFile();
        let delSuccess = false;
        fs.unlink(`${window.virtualTestPath}/browserWrite.txt`, (err)=>{
            if(!err){
                delSuccess = true;
            }
        });
        await waitForTrue(()=>{return delSuccess;},1000);
        expect(delSuccess).to.be.true;
    });

    it('Should phoenix filer mkdir(path,cb) in browser if it doesnt exist', async function () {
        await _writeTestDir();
    });

    it('Should phoenix filer mkdir(path,mode, cb) in browser if it doesnt exist', async function () {
        let createSuccess = false;
        fs.mkdir(`${window.virtualTestPath}/testDir1`, 777, (err)=>{
            if(!err){
                createSuccess = true;
            }
        });
        await waitForTrue(()=>{return createSuccess;},1000);
        expect(createSuccess).to.be.true;
    });

    it('Should phoenix fail filer mkdir(path,mode, cb) if already exists', async function () {
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

    it('Should phoenix rename fail if dst is a subpath of src', async function () {
        let errored = false;
        fs.rename(`${window.virtualTestPath}/a`, `${window.virtualTestPath}/a/b`, (err)=>{
            if(err){
                errored = true;
            }
        });
        await waitForTrue(()=>{return errored;},1000);
        expect(errored).to.be.true;
    });

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
            fs.writeFile(path, 'hello World', 'utf8', (err)=>{
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

    async function _createTestFolderInBasePath(path, folderName) {
        await _createFolder(`${path}/${folderName}`);
        await _createFile(`${path}/${folderName}/a.txt`);
        await _createFile(`${path}/${folderName}/b.txt`);
        await _createFolder(`${path}/${folderName}/y`);
        await _createFolder(`${path}/${folderName}/z`);
        await _createFile(`${path}/${folderName}/y/c.txt`);
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
        expect(await _shouldExist(`${expectedPath}/a.txt`)).to.be.true;
        expect(await _shouldExist(`${expectedPath}/y`)).to.be.true;
        expect(await _shouldExist(`${expectedPath}/y/c.txt`)).to.be.true;
        expect(actualCopiedPath).to.equal(expectedPath);
    }

    it('Should phoenix copy fail if dst is a subpath of src', async function () {
        let errored = false;
        fs.copy('/a', '/a/b', (err)=>{
            if(err){
                errored = true;
            }
        });
        await waitForTrue(()=>{return errored;},1000);
        expect(errored).to.be.true;
    });

    // folder copy tests
    it('Should phoenix copy folder from mount to filer path', async function () {
        await _createTestFolderInBasePath(window.mountTestPath, 'testDir2');
        let srcPath = `${window.mountTestPath}/testDir2`;
        let dstPath = `${window.virtualTestPath}/testDir2`;
        await _verifyCopyFolder(srcPath, dstPath);
    });

    it('Should phoenix copy overwrite folder from mount to filer path if already exist', async function () {
        await _createTestFolderInBasePath(window.mountTestPath, 'testDir3');
        let srcPath = `${window.mountTestPath}/testDir3`;
        let dstPath = `${window.virtualTestPath}/testDir3`;
        let expectedPath = `${window.virtualTestPath}/testDir3/testDir3`;
        await _createFolder(dstPath);
        await _verifyCopyFolder(srcPath, dstPath, expectedPath);
    });

    it('Should phoenix copy folder from filer to mount path', async function () {
        await _createTestFolderInBasePath(window.virtualTestPath, 'testDir4');
        let srcPath = `${window.virtualTestPath}/testDir4`;
        let dstPath = `${window.mountTestPath}/testDir4`;
        await _verifyCopyFolder(srcPath, dstPath);
    });

    it('Should phoenix copy overwrite folder from filer to mount path if already exist', async function () {
        await _createTestFolderInBasePath(window.virtualTestPath, 'testDir5');
        let srcPath = `${window.virtualTestPath}/testDir5`;
        let dstPath = `${window.mountTestPath}/testDir5`;
        let expectedPath = `${window.mountTestPath}/testDir5/testDir5`;
        await _createFolder(dstPath);
        await _verifyCopyFolder(srcPath, dstPath, expectedPath);
    });

    it('Should phoenix copy folder from filer to filer path', async function () {
        await _createTestFolderInBasePath(window.virtualTestPath, 'testDir6');
        let srcPath = `${window.virtualTestPath}/testDir6`;
        let dstPath = `${window.virtualTestPath}/testDir6.5`;
        await _verifyCopyFolder(srcPath, dstPath);
    });

    it('Should phoenix copy overwrite folder from filer to filer path if already exist', async function () {
        await _createTestFolderInBasePath(window.virtualTestPath, 'testDir7');
        let srcPath = `${window.virtualTestPath}/testDir7`;
        let dstPath = `${window.virtualTestPath}/testDir7.5`;
        let expectedPath = `${window.virtualTestPath}/testDir7.5/testDir7`;
        await _createFolder(dstPath);
        await _verifyCopyFolder(srcPath, dstPath, expectedPath);
    });

    it('Should phoenix copy folder from mount to mount path', async function () {
        await _createTestFolderInBasePath(window.mountTestPath, 'testDir8');
        let srcPath = `${window.mountTestPath}/testDir8`;
        let dstPath = `${window.mountTestPath}/testDir8.5`;
        await _verifyCopyFolder(srcPath, dstPath);
    });

    it('Should phoenix copy as sub-folder from mount to mount if dest path already exist', async function () {
        await _createTestFolderInBasePath(window.mountTestPath, 'testDir9');
        let srcPath = `${window.mountTestPath}/testDir9`;
        let dstPath = `${window.mountTestPath}/testDir9.5`;
        let expectedPath = `${window.mountTestPath}/testDir9.5/testDir9`;
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
    it('Should phoenix copy file from mount to filer path', async function () {
        let dir = 'testDir10';
        await _createTestFolderInBasePath(window.mountTestPath, dir);
        let srcPath = `${window.mountTestPath}/${dir}/a.txt`;
        let dstFolder = `${window.virtualTestPath}/${dir}`;
        await _createFolder(dstFolder);
        let dstPath = `${dstFolder}/temp.txt`;
        await _verifyCopyFile(srcPath, dstPath);
    });

    it('Should phoenix copy file from filer to mount path', async function () {
        let dir = 'testDir10.5';
        await _createTestFolderInBasePath(window.virtualTestPath, dir);
        let srcPath = `${window.virtualTestPath}/${dir}/a.txt`;
        let dstFolder = `${window.mountTestPath}/${dir}`;
        await _createFolder(dstFolder);
        let dstPath = `${dstFolder}/temp.txt`;
        await _verifyCopyFile(srcPath, dstPath);
    });

    it('Should phoenix copy file within same mount path', async function () {
        let dir = 'testDir11';
        await _createTestFolderInBasePath(window.mountTestPath, dir);
        let srcPath = `${window.mountTestPath}/${dir}/a.txt`;
        let dstPath = `${window.mountTestPath}/${dir}/lols.txt`;
        await _verifyCopyFile(srcPath, dstPath);
    });

    it('Should phoenix copy file within same virtual fs path', async function () {
        let dir = 'testDir12';
        await _createTestFolderInBasePath(window.virtualTestPath, dir);
        let srcPath = `${window.virtualTestPath}/${dir}/a.txt`;
        let dstPath = `${window.virtualTestPath}/${dir}/lols.txt`;
        await _verifyCopyFile(srcPath, dstPath);
    });

    it('Should phoenix fail copy file if dest mount file exist', async function () {
        let dir = 'testDir13';
        await _createTestFolderInBasePath(window.mountTestPath, dir);
        let srcPath = `${window.mountTestPath}/${dir}/a.txt`;
        let dstFile = `${window.mountTestPath}/${dir}/jj.txt`;
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

    it('Should phoenix fail copy file if dest virtual fs file exist', async function () {
        let dir = 'testDir13';
        await _createTestFolderInBasePath(window.virtualTestPath, dir);
        let srcPath = `${window.virtualTestPath}/${dir}/a.txt`;
        let dstFile = `${window.virtualTestPath}/${dir}/jj.txt`;
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

});
