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

    it('Should load Phoenix fs in browser', function () {
        expect(fs).to.exist;
        expect(fs.name).to.equal('phoenixFS');
    });

    it('Should phoenix native read write in browser', async function () {
        let writeSuccess = false;
        fs.writeFile(`${window.mountTestPath}/browserWrite.txt`, 'hello World', 'utf8', (err)=>{
            if(!err){
                writeSuccess = true;
            }
        });
        waitForTrue(()=>{return writeSuccess;},1);
    });
});
