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
        this.timeout(15000); // Increase mocha timeout for Node WebSocket setup
        // Wait up to 10 seconds for Node WebSocket to be ready
        // This is important for slower systems or first-time loads
        let ready = await window.waitForTrue(()=>{return window.isNodeSetup;}, 10000);
        if (!ready) {
            throw new Error('Timeout waiting for Node WebSocket setup');
        }
    });
}