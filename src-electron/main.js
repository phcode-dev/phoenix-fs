const { app, BrowserWindow, ipcMain } = require('electron');
const { spawn } = require('child_process');
const path = require('path');
const readline = require('readline');

let mainWindow;
let nodeProcess;
let nodeWSPort = null;
let isNodeTerminated = false;

// Promise that resolves when node server port is available (similar to Tauri's serverPortPromise)
let nodePortResolve;
const nodePortPromise = new Promise((resolve) => { nodePortResolve = resolve; });

const NODE_COMMANDS = {
    TERMINATE: "terminate",
    PING: "ping",
    GET_PORT: "getPort",
    HEART_BEAT: "heartBeat"
};

let commandId = 0;
const pendingCommands = {};

function execNode(commandCode) {
    return new Promise((resolve, reject) => {
        if (!nodeProcess || isNodeTerminated) {
            reject(new Error('Node process not running'));
            return;
        }
        const newCommandID = commandId++;
        const cmd = JSON.stringify({ commandCode, commandId: newCommandID }) + "\n";
        nodeProcess.stdin.write(cmd);
        pendingCommands[newCommandID] = { resolve, reject };
    });
}

function startNodeServer() {
    return new Promise((resolve, reject) => {
        const nodeSrcPath = path.join(__dirname, '..', 'src-tauri', 'node-src', 'index.js');

        console.log('Starting Node server from:', nodeSrcPath);

        nodeProcess = spawn('node', [nodeSrcPath], {
            stdio: ['pipe', 'pipe', 'pipe']
        });

        const rl = readline.createInterface({
            input: nodeProcess.stdout,
            crlfDelay: Infinity
        });

        rl.on('line', (line) => {
            if (line && line.trim().startsWith("{")) {
                try {
                    const jsonMsg = JSON.parse(line);
                    if (pendingCommands[jsonMsg.commandId]) {
                        pendingCommands[jsonMsg.commandId].resolve(jsonMsg.message);
                        delete pendingCommands[jsonMsg.commandId];
                    }
                } catch (e) {
                    console.log('Node:', line);
                }
            } else if (line) {
                console.log('Node:', line);
            }
        });

        nodeProcess.stderr.on('data', (data) => {
            console.error('Node Error:', data.toString());
        });

        nodeProcess.on('close', (code, signal) => {
            isNodeTerminated = true;
            console.log(`Node process exited with code ${code} and signal ${signal}`);
        });

        nodeProcess.on('error', (err) => {
            console.error('Failed to start Node process:', err);
            reject(err);
        });

        // Node-src's GET_PORT command waits for serverPortPromise internally,
        // so no timeout needed - it will respond once the server is ready
        execNode(NODE_COMMANDS.GET_PORT)
            .then((result) => {
                nodeWSPort = result.port;
                nodePortResolve(nodeWSPort);
                console.log('Node WebSocket server running on port:', nodeWSPort);
                resolve(nodeWSPort);
            })
            .catch((err) => {
                reject(err);
            });
    });
}

// Heartbeat to keep Node server alive
let heartbeatInterval;
function startHeartbeat() {
    heartbeatInterval = setInterval(() => {
        if (!isNodeTerminated) {
            execNode(NODE_COMMANDS.HEART_BEAT).catch(() => {});
        }
    }, 10000);
}

function stopHeartbeat() {
    if (heartbeatInterval) {
        clearInterval(heartbeatInterval);
        heartbeatInterval = null;
    }
}

async function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 800,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            contextIsolation: true,
            nodeIntegration: false
        },
        icon: path.join(__dirname, '..', 'src-tauri', 'icons', 'icon.png')
    });

    // Load the test page from the http-server
    mainWindow.loadURL('http://localhost:8081/test/index.html');

    // Open DevTools for debugging
    mainWindow.webContents.openDevTools();

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
}

// IPC handlers
ipcMain.handle('get-node-ws-port', async () => {
    // Wait for node server to be ready before returning port
    return await nodePortPromise;
});

ipcMain.handle('quit-app', (event, exitCode) => {
    console.log('Quit requested with exit code:', exitCode);
    gracefulShutdown(exitCode);
});

ipcMain.on('console-log', (event, message) => {
    console.log('Renderer:', message);
});

function waitForTrue(fn, timeout) {
    return new Promise((resolve) => {
        const startTime = Date.now();
        function check() {
            if (fn()) {
                resolve(true);
            } else if (Date.now() - startTime > timeout) {
                resolve(false);
            } else {
                setTimeout(check, 50);
            }
        }
        check();
    });
}

async function gracefulShutdown(exitCode = 0) {
    console.log('Initiating graceful shutdown...');

    stopHeartbeat();

    if (!isNodeTerminated && nodeProcess) {
        // Send terminate command (don't await - node exits without responding)
        try {
            const cmd = JSON.stringify({ commandCode: NODE_COMMANDS.TERMINATE, commandId: -1 }) + "\n";
            nodeProcess.stdin.write(cmd);
        } catch (e) {
            // Process may already be terminated
        }

        // Wait for node process to terminate (like Tauri does)
        await waitForTrue(() => isNodeTerminated, 1000);

        if (!isNodeTerminated) {
            nodeProcess.kill();
        }
    }

    app.exit(exitCode);
}

app.whenReady().then(async () => {
    try {
        await startNodeServer();
        startHeartbeat();
        await createWindow();
    } catch (err) {
        console.error('Failed to start:', err);
        app.exit(1);
    }
});

app.on('window-all-closed', () => {
    gracefulShutdown(0);
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

// Handle process termination signals
process.on('SIGINT', () => gracefulShutdown(0));
process.on('SIGTERM', () => gracefulShutdown(0));
