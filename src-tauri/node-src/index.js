const readline = require('readline');
const http = require('http');
const net = require('net');
const PhoenixFS = require('./phoenix-fs');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

let serverPortResolve;
const serverPortPromise = new Promise((resolve) => {serverPortResolve = resolve;});

let orphanExitTimer = setTimeout(()=>{
    process.exit(1);
}, 60000);
async function processCommand(line) {
    try{
        let jsonCmd = JSON.parse(line);
        switch (jsonCmd.commandCode) {
        case "terminate": process.exit(0); return;
        case "heartBeat":
            clearTimeout(orphanExitTimer);
            orphanExitTimer = setTimeout(()=>{
                process.exit(1);
            }, 60000);
            return;
        case "ping": console.log(JSON.stringify({message: "pong", commandId: jsonCmd.commandId}) + "\n"); return;
        case "getPort": console.log(JSON.stringify({message: {port: await serverPortPromise}, commandId: jsonCmd.commandId}) + "\n"); return;
        default: console.error("unknown command: "+ line);
        }
    } catch (e) {
        console.error(e);
    }
}

rl.on('line', (line) => {
    processCommand(line);
});

function getFreePort() {
    return new Promise((resolve)=>{
        const server = net.createServer();

        server.listen(0, () => {
            const port = server.address().port;
            server.close(() => {
                resolve(port);
            });
        });
    });
}

// Create an HTTP server
const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('WebSocket server running');
});

getFreePort().then((port) => {
    serverPortResolve(port);
    console.log('Server Opened on port: ', port);

    PhoenixFS.setDebugMode(true);
    PhoenixFS.CreatePhoenixFsServer(server);
    // Start the HTTP server on port 3000
    server.listen(port, () => {
        console.log(`Server running on http://localhost:${port}`);
    });

});
