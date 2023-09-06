/* global expect, execNode, NODE_COMMANDS */

describe(`node ws fs tests`, function () {
    it(`Node be present and ping pong`, async function () {
        let message = await execNode(NODE_COMMANDS.PING);
        expect(message).to.equal("pong");
    });
});