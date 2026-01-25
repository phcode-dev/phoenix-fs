let expect = chai.expect;

if(expect){
    console.log('test init complete.');
}

window.waitForTrue = async function(checkFn, timeoutMs) {
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
};

if(window.__TAURI__ || window.__ELECTRON__) {
    before(async function () {
        await window.waitForTrue(()=>{return window.isNodeSetup;},1000);
    });
}