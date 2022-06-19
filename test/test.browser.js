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

    it('Should load Phoenix fs in browser',async function () {
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
    });

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
});
