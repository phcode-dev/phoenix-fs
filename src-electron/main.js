const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const { spawn } = require('child_process');
const path = require('path');
const readline = require('readline');
const fs = require('fs');
const fsp = require('fs/promises');
const os = require('os');

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

// Directory APIs
ipcMain.handle('get-documents-dir', () => {
    return path.join(os.homedir(), 'Documents');
});

ipcMain.handle('get-app-data-dir', () => {
    // Returns app-specific data directory similar to Tauri's appLocalDataDir
    // Linux: ~/.local/share/<app-name>/
    // macOS: ~/Library/Application Support/<app-name>/
    // Windows: %APPDATA%/<app-name>/
    return app.getPath('userData');
});

// Dialogs
ipcMain.handle('show-open-dialog', async (event, options) => {
    const result = await dialog.showOpenDialog(mainWindow, options);
    return result.filePaths;
});

ipcMain.handle('show-save-dialog', async (event, options) => {
    const result = await dialog.showSaveDialog(mainWindow, options);
    return result.filePath;
});

// FS operations
ipcMain.handle('fs-readdir', async (event, dirPath) => {
    const entries = await fsp.readdir(dirPath, { withFileTypes: true });
    return entries.map(e => ({ name: e.name, isDirectory: e.isDirectory() }));
});

ipcMain.handle('fs-stat', async (event, filePath) => {
    const stats = await fsp.stat(filePath);
    return {
        isFile: stats.isFile(),
        isDirectory: stats.isDirectory(),
        isSymbolicLink: stats.isSymbolicLink(),
        size: stats.size,
        mode: stats.mode,
        ctimeMs: stats.ctimeMs,
        atimeMs: stats.atimeMs,
        mtimeMs: stats.mtimeMs,
        nlink: stats.nlink,
        dev: stats.dev
    };
});

ipcMain.handle('fs-mkdir', (event, dirPath, options) => fsp.mkdir(dirPath, options));
ipcMain.handle('fs-unlink', (event, filePath) => fsp.unlink(filePath));
ipcMain.handle('fs-rmdir', (event, dirPath, options) => fsp.rm(dirPath, options));
ipcMain.handle('fs-rename', (event, oldPath, newPath) => fsp.rename(oldPath, newPath));
ipcMain.handle('fs-read-file', async (event, filePath) => {
    const buffer = await fsp.readFile(filePath);
    return buffer; // Electron serializes Buffer automatically
});
ipcMain.handle('fs-write-file', (event, filePath, data) => fsp.writeFile(filePath, Buffer.from(data)));

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
