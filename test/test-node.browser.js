/* global expect, execNode, NODE_COMMANDS, fs */

describe(`node ws fs tests`, function () {
    if(!window.__TAURI__){
        return;
    }

    let wssPort, wssEndpoint;

    before(async function () {
        await window.waitForTrue(()=>{return window.isNodeSetup;}, 10000);
        let message = await execNode(NODE_COMMANDS.GET_PORT);
        expect(message.port).to.be.a('number');
        wssPort = message.port;
        wssEndpoint = `ws://localhost:${wssPort}/phoenixFS`;
    });

    it(`Node be present and ping pong`, async function () {
        let message = await execNode(NODE_COMMANDS.PING);
        expect(message).to.equal("pong");
    });

    it(`Node should get node port`, async function () {
        let message = await execNode(NODE_COMMANDS.GET_PORT);
        expect(message.port).to.be.a('number');
        expect(wssPort).to.be.a('number');
    });

    it(`Node should get node wss endpoint`, async function () {
        expect(fs.getNodeWSEndpoint()).to.eql(wssEndpoint);
    });

    it(`Node should ping pong web socket`, async function () {
        await fs.testNodeWsEndpoint(wssEndpoint);
        const echoDataSent = {hello: 'world', arr: [1,2,3,4]};
        const uint8ArraySent = new Uint8Array([65, 20, 30, 40, 50]);
        const arrayBufferSent = (uint8ArraySent).buffer;
        let op = await fs.testNodeWsEndpoint(wssEndpoint, echoDataSent);
        expect(op.echoData).to.eql(echoDataSent);
        expect(op.echoBuffer).to.be.undefined;
        op = await fs.testNodeWsEndpoint(wssEndpoint, echoDataSent, arrayBufferSent);
        expect(op.echoData).to.eql(echoDataSent);
        const uint8ViewOutput = new Uint8Array(op.echoBuffer);
        expect(op.echoBuffer).to.eql(arrayBufferSent);
        expect(uint8ViewOutput).to.eql(uint8ArraySent);
        expect(uint8ViewOutput[0]).to.eql(uint8ArraySent[0]);
    });

    let sizeMBs = [1, 2,4, 8, 16, 32, 50, 100, 250, 500];
    if(location.href.startsWith("http://localhost:8081/test/")){
        // during development, large data transfer seems to get the developer tools stuck. so we only run small tests
        sizeMBs = [1, 2, 4];
        it(`Node should ping pong web socket with 8, 16, 32, 50, 100, 250, 500 MB disabled in dev builds due to possible dev tools crash`, async function () {
            expect(1).to.eql(1);
        });
    }
    for(let sizeMB of sizeMBs) {
        it(`Node should ping pong web socket with ${sizeMB} MB of binary data`, async function () {
            await fs.testNodeWsEndpoint(wssEndpoint);
            const echoDataSent = {hello: 'world', arr: [1,2,3,4]};
            const size = 1024 * 1024 * sizeMB;
            const uint8ArraySent = new Uint8Array(size);
            uint8ArraySent[0] = 156; uint8ArraySent[940] = 223; uint8ArraySent[uint8ArraySent.length - 1] = 42;
            const arrayBufferSent = (uint8ArraySent).buffer;
            const op = await fs.testNodeWsEndpoint(wssEndpoint, echoDataSent, arrayBufferSent);
            expect(op.echoData).to.eql(echoDataSent);
            const uint8ViewOutput = new Uint8Array(op.echoBuffer);
            expect(op.echoBuffer).to.eql(arrayBufferSent);
            expect(uint8ViewOutput).to.eql(uint8ArraySent);
            expect(uint8ViewOutput.length).to.eql(uint8ArraySent.length);
            expect(uint8ViewOutput[0]).to.eql(uint8ArraySent[0]);
            expect(uint8ViewOutput[940]).to.eql(uint8ArraySent[940]);
            expect(uint8ViewOutput[uint8ViewOutput.length-1]).to.eql(uint8ArraySent[uint8ArraySent.length-1]);
        }).timeout(100000);
    }

});
