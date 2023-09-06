describe(`node ws fs tests`, function () {
    const COMMAND_TERMINATE = "terminate",
        COMMAND_PING = "ping";
    let command, child, closed = false;
    before(async function () {
        const nodeSrcPath = await __TAURI__.path.resolveResource("node-src/index.js")
        command = new __TAURI__.shell.Command('node', nodeSrcPath);
        command.on('close', data => {
            closed = true;
            console.log(`Node: command finished with code ${data.code} and signal ${data.signal}`)
        });
        command.on('error', error => console.error(`Node: command error: "${error}"`));
        command.stdout.on('data', line => {
            console.log(`Node: "${line}"`);
            if(line){
                const jsonMsg = JSON.parse(line);
                pendingCommands[jsonMsg.commandId].resolve(jsonMsg.message);
                delete pendingCommands[jsonMsg.commandId];
            }
        });
        command.stderr.on('data', line => console.log(`Node: "${line}"`));
        child = await command.spawn();
    });

    let commandId = 0, pendingCommands = {};
    function _execNode(commandCode) {
        const newCommandID = commandId ++;
        child.write(JSON.stringify({commandCode: commandCode, commandId: newCommandID}) + "\n");
        let resolveP, rejectP;
        const promise = new Promise((resolve, reject) => {resolveP = resolve; rejectP=reject;});
        pendingCommands[newCommandID]= {resolve:resolveP, reject:rejectP};
        return promise;
    }

    after(async function () {
        _execNode(COMMAND_TERMINATE);
        await waitForTrue(()=>{return closed;},1000);
    });

    it(`Node be present and ping pong`, async function () {
        let message = await _execNode(COMMAND_PING);
        expect(message).to.equal("pong");
    });

});