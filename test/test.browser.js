/* global expect , Filer, fs*/

describe('Browser main tests', function () {
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

    it('Should load Filer in browser', function () {
        expect(Filer).to.exist;
        expect(Filer.fs).to.exist;
        expect(Filer.Shell).to.exist;
        expect(Filer.fs.name).to.equal('local');
    });

    it('Should load clean Phoenix fs in browser',async function () {
        expect(fs).to.exist;
        expect(fs.name).to.equal('phoenixFS');
        // setup test folders
        console.log('cleaning: ', window.virtualTestPath);
        let cleanSuccess = false;
        fs.unlink(window.virtualTestPath, ()=>{
            cleanSuccess = true;
        });
        await waitForTrue(()=>{return cleanSuccess;},10000);
        console.log('cleaning: ', window.mountTestPath);
        cleanSuccess = false;
        fs.unlink(window.mountTestPath, ()=>{
            cleanSuccess = true;
        });
        await waitForTrue(()=>{return cleanSuccess;},10000);

        console.log('mkdir: ', window.virtualTestPath);
        cleanSuccess = false;
        fs.mkdirs(window.virtualTestPath, 777 ,true, ()=>{
            cleanSuccess = true;
        });
        await waitForTrue(()=>{return cleanSuccess;},10000);
        console.log('mkdir: ', window.mountTestPath);
        cleanSuccess = false;
        fs.mkdirs(window.mountTestPath,  777 ,true,()=>{
            cleanSuccess = true;
        });
        await waitForTrue(()=>{return cleanSuccess;},10000);
    }, 10000);

    it('Should phoenix native write in browser', async function () {
        let writeSuccess = false;
        fs.writeFile(`${window.mountTestPath}/browserWrite.txt`, 'hello World', 'utf8', (err)=>{
            if(!err){
                writeSuccess = true;
            }
        });
        await waitForTrue(()=>{return writeSuccess;},10000);
        expect(writeSuccess).to.be.true;
    });

    it('Should phoenix native read in browser', async function () {
        let readSuccess = false;
        fs.readFile(`${window.mountTestPath}/browserWrite.txt`, 'utf8', (err)=>{
            if(!err){
                readSuccess = true;
            }
        });
        await waitForTrue(()=>{return readSuccess;},1000);
        expect(readSuccess).to.be.true;
    });

    it('Should phoenix native read dir', async function () {
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

    it('Should phoenix native read dir with withFileTypes', async function () {
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

    it('Should phoenix native delete in browser', async function () {
        let delSuccess = false;
        fs.unlink(`${window.mountTestPath}/browserWrite.txt`, (err)=>{
            if(!err){
                delSuccess = true;
            }
        });
        await waitForTrue(()=>{return delSuccess;},1000);
        expect(delSuccess).to.be.true;
    });

    it('Should phoenix mkdir(path,cb) in browser if it doesnt exist', async function () {
        // mount fs
        let createSuccess = false;
        fs.mkdir(`${window.mountTestPath}/testDir`, (err)=>{
            if(!err){
                createSuccess = true;
            }
        });
        await waitForTrue(()=>{return createSuccess;},1000);
        expect(createSuccess).to.be.true;
        // virtual fs
        createSuccess = false;
        fs.mkdir(`${window.virtualTestPath}/testDir`, (err)=>{
            if(!err){
                createSuccess = true;
            }
        });
        await waitForTrue(()=>{return createSuccess;},1000);
        expect(createSuccess).to.be.true;
    });

    it('Should phoenix mount:mkdir(path,mode, cb) in browser if it doesnt exist', async function () {
        // mount fs
        let createSuccess = false;
        fs.mkdir(`${window.mountTestPath}/testDir1`, 777, (err)=>{
            if(!err){
                createSuccess = true;
            }
        });
        await waitForTrue(()=>{return createSuccess;},1000);
        expect(createSuccess).to.be.true;
    });
    it('Should phoenix virtual:mkdir(path,mode, cb) in browser if it doesnt exist', async function () {
        // virtual fs
        let createSuccess = false;
        fs.mkdir(`${window.virtualTestPath}/testDir1`, 777, (err)=>{
            if(!err){
                createSuccess = true;
            }
        });
        await waitForTrue(()=>{return createSuccess;},1000);
        expect(createSuccess).to.be.true;
    });

    it('Should phoenix fail mount:mkdir(path,mode, cb) if already exists', async function () {
        // mount fs
        let failed = false;
        fs.mkdir(`${window.mountTestPath}/testDir1`, 777, (err)=>{
            if(err){
                failed = true;
            }
        });
        await waitForTrue(()=>{return failed;},1000);
        expect(failed).to.be.true;
    });

    it('Should phoenix fail virtual:mkdir(path,mode, cb) if already exists', async function () {
        // virtual fs
        let failed = false;
        fs.mkdir(`${window.virtualTestPath}/testDir1`, 777, (err)=>{
            if(err){
                failed = true;
            }
        });
        await waitForTrue(()=>{return failed;},1000);
        expect(failed).to.be.true;
    });

    it('Should phoenix rename fail if dst is a subpath of src', async function () {
        let errored = false;
        fs.rename('/a', '/a/b', (err)=>{
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
        fs.copy(srcPath, dstPath, (err)=>{
            if(!err){
                success = true;
            }
        });
        await waitForTrue(()=>{return success;},1000);
        expect(success).to.be.true;
        expectedPath = expectedPath || dstPath;
        expect(await _shouldExist(`${expectedPath}/a.txt`)).to.be.true;
        expect(await _shouldExist(`${expectedPath}/y`)).to.be.true;
        expect(await _shouldExist(`${expectedPath}/y/c.txt`)).to.be.true;
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

});
