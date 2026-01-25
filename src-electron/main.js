const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const { spawn } = require('child_process');
const path = require('path');
const readline = require('readline');
const fs = require('fs');
const fsp = require('fs/promises');
const os = require('os');
const { identifier: APP_IDENTIFIER } = require('./package.json');

let mainWindow;
let processInstanceId = 0;
// Map of instanceId -> { process, terminated }
const spawnedProcesses = new Map();

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

// Spawn a child process and forward stdio to the calling renderer.
// Returns an instanceId so the renderer can target the correct process.
ipcMain.handle('spawn-process', async (event, command, args) => {
    const instanceId = ++processInstanceId;
    const sender = event.sender;
    console.log(`Spawning: ${command} ${args.join(' ')} (instance ${instanceId})`);

    const childProcess = spawn(command, args, {
        stdio: ['pipe', 'pipe', 'pipe']
    });

    const instance = { process: childProcess, terminated: false };
    spawnedProcesses.set(instanceId, instance);

    const rl = readline.createInterface({
        input: childProcess.stdout,
        crlfDelay: Infinity
    });

    rl.on('line', (line) => {
        if (!sender.isDestroyed()) {
            sender.send('process-stdout', instanceId, line);
        }
    });

    childProcess.stderr.on('data', (data) => {
        if (!sender.isDestroyed()) {
            sender.send('process-stderr', instanceId, data.toString());
        }
    });

    childProcess.on('close', (code, signal) => {
        instance.terminated = true;
        console.log(`Process (instance ${instanceId}) exited with code ${code} and signal ${signal}`);
        if (!sender.isDestroyed()) {
            sender.send('process-close', instanceId, { code, signal });
        }
    });

    childProcess.on('error', (err) => {
        console.error(`Failed to start process (instance ${instanceId}):`, err);
    });

    return instanceId;
});

// Write data to a specific spawned process stdin
ipcMain.handle('write-to-process', (event, instanceId, data) => {
    const instance = spawnedProcesses.get(instanceId);
    if (instance && !instance.terminated) {
        instance.process.stdin.write(data);
    }
});

ipcMain.handle('quit-app', (event, exitCode) => {
    console.log('Quit requested with exit code:', exitCode);
    gracefulShutdown(exitCode);
});

ipcMain.on('console-log', (event, message) => {
    console.log('Renderer:', message);
});

// CLI args (mirrors Tauri's cli.getMatches for --quit-when-done / -q)
ipcMain.handle('get-cli-args', () => {
    return process.argv;
});

// App path (repo root when running from source)
ipcMain.handle('get-app-path', () => {
    return app.getAppPath();
});

// Directory APIs
ipcMain.handle('get-documents-dir', () => {
    return path.join(os.homedir(), 'Documents');
});

ipcMain.handle('get-app-data-dir', () => {
    // Match Tauri's appLocalDataDir which uses the bundle identifier "fs.phcode"
    // Linux: ~/.local/share/fs.phcode/
    // macOS: ~/Library/Application Support/fs.phcode/
    // Windows: %LOCALAPPDATA%/fs.phcode/
    const home = os.homedir();
    switch (process.platform) {
        case 'darwin':
            return path.join(home, 'Library', 'Application Support', APP_IDENTIFIER);
        case 'win32':
            return path.join(process.env.LOCALAPPDATA || path.join(home, 'AppData', 'Local'), APP_IDENTIFIER);
        default:
            return path.join(process.env.XDG_DATA_HOME || path.join(home, '.local', 'share'), APP_IDENTIFIER);
    }
});

// Get Windows drive letters (returns null on non-Windows platforms)
ipcMain.handle('get-windows-drives', async () => {
    if (process.platform !== 'win32') {
        return null;
    }
    // On Windows, check which drive letters exist by testing A-Z
    const drives = [];
    for (let i = 65; i <= 90; i++) { // A-Z
        const letter = String.fromCharCode(i);
        const drivePath = `${letter}:\\`;
        try {
            await fsp.access(drivePath);
            drives.push(letter);
        } catch {
            // Drive doesn't exist
        }
    }
    return drives.length > 0 ? drives : null;
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

// Electron IPC only preserves Error.message when errors cross the IPC boundary (see
// https://github.com/electron/electron/issues/24427). To preserve error.code for FS
// operations, we catch errors and return them as plain objects {error: {code, message}}.
// The preload layer unwraps these back into proper Error objects.
function fsResult(promise) {
    return promise.catch(err => {
        return { __fsError: true, code: err.code, message: err.message };
    });
}

// FS operations
ipcMain.handle('fs-readdir', async (event, dirPath) => {
    return fsResult(
        fsp.readdir(dirPath, { withFileTypes: true })
            .then(entries => entries.map(e => ({ name: e.name, isDirectory: e.isDirectory() })))
    );
});

ipcMain.handle('fs-stat', async (event, filePath) => {
    return fsResult(
        fsp.stat(filePath).then(stats => ({
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
        }))
    );
});

ipcMain.handle('fs-mkdir', (event, dirPath, options) => fsResult(fsp.mkdir(dirPath, options)));
ipcMain.handle('fs-unlink', (event, filePath) => fsResult(fsp.unlink(filePath)));
ipcMain.handle('fs-rmdir', (event, dirPath, options) => fsResult(fsp.rm(dirPath, options)));
ipcMain.handle('fs-rename', (event, oldPath, newPath) => fsResult(fsp.rename(oldPath, newPath)));
ipcMain.handle('fs-read-file', (event, filePath) => fsResult(fsp.readFile(filePath)));
ipcMain.handle('fs-write-file', (event, filePath, data) => fsResult(fsp.writeFile(filePath, Buffer.from(data))));

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

    for (const [, instance] of spawnedProcesses) {
        if (!instance.terminated) {
            try {
                instance.process.kill();
            } catch (e) {
                // Process may already be terminated
            }

            await waitForTrue(() => instance.terminated, 1000);
        }
    }

    app.exit(exitCode);
}

app.whenReady().then(async () => {
    await createWindow();
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
