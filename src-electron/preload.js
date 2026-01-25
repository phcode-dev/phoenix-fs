const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
    // Process lifecycle
    spawnProcess: (command, args) => ipcRenderer.invoke('spawn-process', command, args),
    writeToProcess: (instanceId, data) => ipcRenderer.invoke('write-to-process', instanceId, data),
    onProcessStdout: (callback) => ipcRenderer.on('process-stdout', (_event, instanceId, line) => callback(instanceId, line)),
    onProcessStderr: (callback) => ipcRenderer.on('process-stderr', (_event, instanceId, line) => callback(instanceId, line)),
    onProcessClose: (callback) => ipcRenderer.on('process-close', (_event, instanceId, data) => callback(instanceId, data)),

    // Quit the app with an exit code (for CI)
    quitApp: (exitCode) => ipcRenderer.invoke('quit-app', exitCode),

    // Log to main process console
    consoleLog: (message) => ipcRenderer.send('console-log', message),

    // Flag to identify Electron environment
    isElectron: true,

    // File system APIs
    getAppPath: () => ipcRenderer.invoke('get-app-path'),
    getDocumentsDir: () => ipcRenderer.invoke('get-documents-dir'),
    getAppDataDir: () => ipcRenderer.invoke('get-app-data-dir'),
    showOpenDialog: (options) => ipcRenderer.invoke('show-open-dialog', options),
    showSaveDialog: (options) => ipcRenderer.invoke('show-save-dialog', options),

    // FS operations (fallback when NodeTauriFS not available)
    fsReaddir: (path) => ipcRenderer.invoke('fs-readdir', path),
    fsStat: (path) => ipcRenderer.invoke('fs-stat', path),
    fsMkdir: (path, options) => ipcRenderer.invoke('fs-mkdir', path, options),
    fsUnlink: (path) => ipcRenderer.invoke('fs-unlink', path),
    fsRmdir: (path, options) => ipcRenderer.invoke('fs-rmdir', path, options),
    fsRename: (oldPath, newPath) => ipcRenderer.invoke('fs-rename', oldPath, newPath),
    fsReadFile: (path) => ipcRenderer.invoke('fs-read-file', path),
    fsWriteFile: (path, data) => ipcRenderer.invoke('fs-write-file', path, data)
});
