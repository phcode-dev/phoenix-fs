/* global expect , Filer, fs, waitForTrue*/

describe('Browser filer tests', function () {

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
});
