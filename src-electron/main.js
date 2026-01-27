const { app, BrowserWindow } = require('electron');
const path = require('path');

const { registerAppIpcHandlers, terminateAllProcesses } = require('./main-app-ipc');
const { registerFsIpcHandlers } = require('./main-fs-ipc');

let mainWindow;

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

async function gracefulShutdown(exitCode = 0) {
    console.log('Initiating graceful shutdown...');
    await terminateAllProcesses();
    app.exit(exitCode);
}

// Register all IPC handlers
registerAppIpcHandlers();
registerFsIpcHandlers();

// Handle quit request from renderer
app.on('quit-requested', (exitCode) => {
    gracefulShutdown(exitCode);
});

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
