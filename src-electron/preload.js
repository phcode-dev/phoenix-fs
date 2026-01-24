const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    // Get the WebSocket port for the Node.js file system server
    getNodeWSPort: () => ipcRenderer.invoke('get-node-ws-port'),

    // Quit the app with an exit code (for CI)
    quitApp: (exitCode) => ipcRenderer.invoke('quit-app', exitCode),

    // Log to main process console
    consoleLog: (message) => ipcRenderer.send('console-log', message),

    // Flag to identify Electron environment
    isElectron: true
});
