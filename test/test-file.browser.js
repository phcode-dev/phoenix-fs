/* global expect , Filer, fs, waitForTrue, TEST_TYPE_FS_ACCESS, TEST_TYPE_FILER*/

function _setupTests(testType) {
    let testPath;
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

    async function _writeTestFile() {
        let writeSuccess = false;
        fs.writeFile(`${testPath}/browserWrite.txt`, `hello World`, `utf8`, (err)=>{
            if(!err){
                writeSuccess = true;
            }
        });
        await waitForTrue(()=>{return writeSuccess;},10000);
        expect(writeSuccess).to.be.true;
    }

    it(`Should phoenix ${testType} write in browser`, async function () {
        await _writeTestFile();
    });

    it(`Should phoenix ${testType} read in browser`, async function () {
        await _writeTestFile();
        let readSuccess = false;
        fs.readFile(`${testPath}/browserWrite.txt`, `utf8`, (err)=>{
            if(!err){
                readSuccess = true;
            }
        });
        await waitForTrue(()=>{return readSuccess;},1000);
        expect(readSuccess).to.be.true;
    });


    it(`Should phoenix ${testType} delete file in browser`, async function () {
        await _writeTestFile();
        let delSuccess = false;
        fs.unlink(`${testPath}/browserWrite.txt`, (err)=>{
            if(!err){
                delSuccess = true;
            }
        });
        await waitForTrue(()=>{return delSuccess;},1000);
        expect(delSuccess).to.be.true;
    });

    it(`Should phoenix ${testType} read dir`, async function () {
        await _writeTestFile();
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

    it(`Should phoenix ${testType} read dir with withFileTypes`, async function () {
        await _writeTestFile();
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
}

describe(`File: Browser virtual fs tests: filer paths`, function () {
    _setupTests(TEST_TYPE_FILER);
});

if(window.supportsFsAccessAPIs){
    describe(`File: Browser virtual fs tests: fs access mount point paths`, function () {
        if(window.__TAURI__){
            it('fs access tests are disabled in tauri', function () {});
            return;
        }
        _setupTests(TEST_TYPE_FS_ACCESS);
    });
}