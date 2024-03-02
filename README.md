# Phoenix Browser Virtual File System

The Phoenix Browser Virtual File System (VFS) is a virtualized,
Linux-inspired file system directly within your browser. This library
brings  Node.js `fs` APIs to the browser.

Phoenix VFS is designed with platform neutrality in mind.
This ensures that if you use phoenix vfs as your file system layer, then the code written for browser environments works consistently across popular browsers like Chrome, Edge, Firefox, and Safari, as well as native platforms such as Mac, Windows, and Linux (via Tauri).

The fs lib is available across all browser contexts: the main browser window,
web workers, shared workers, and service workers.

The library supports file read and write in all encodings(Eg. utf8, utf16, latin1, ...) supported by [iconv](https://www.npmjs.com/package/iconv-lite) library. 

## File System Structure & Organization

Here's a closer look at the Phoenix VFS organization:

- **Root File System (`/`)**: At its core, the root file system is backed by IndexedDB. Additional paths, such as those from Tauri or `fs` access, will be automatically mounted to this root when detected.

- **Fs Access APIs (`/mnt`)**: If your environment supports `fs` access APIs, you'll find them conveniently mounted under the `/mnt` path. use `fs.mountNativeFolder` API to add more platform folders.

- **Tauri APIs Integration**:
  - When Tauri APIs are active, you gain direct access to your local machine's file system through the `/tauri/` path.
  - **Windows Example**: `/tauri/c/Program Files/` could represent the C drive's "Program Files" directory.
  - **Linux/macOS Example**: `/tauri/usr/bin/` might be an accessible directory, akin to native paths you'd expect on these platforms.

- **Node Websocket Connector Integration**:
  - The `/tauri/` paths can be accessed via websockets. This integration is much more
    performant than Tauri's fs rust APIs(generally 4x faster and 10x faster for large files).
  - As we use websockets to connection to a node process that executes the actual fs operations,
    the ws backed `/tauri/` apis are available in all web/shared/service workers.
  - This is recommended to use in main browser window as well, as this will relieve the main thread
    of tauri fs access apis that typically leads to blocking/freezing js window on large file access.
  - Supports filesystem watcher APIs that behaves consistently across all platforms.

By adopting Phoenix VFS, you're not just leveraging a file system; you're integrating a dynamic, adaptable layer that bridges the web and native worlds, making your web applications more powerful and reduces development time and costs.

<!-- TOC -->
* [Phoenix Browser Virtual File System](#phoenix-browser-virtual-file-system)
  * [File System Structure & Organization](#file-system-structure--organization)
  * [Installation](#installation)
    * [Getting the code locally](#getting-the-code-locally)
    * [Usage in browser](#usage-in-browser)
    * [Usage in web-worker in browser](#usage-in-web-worker-in-browser)
    * [Usage in Tauri](#usage-in-tauri)
  * [Usage in Tauri with Node Websocket Connector](#usage-in-tauri-with-node-websocket-connector)
    * [Example: Setting Up Your Own `phoenix-fs` Server in Node.js](#example-setting-up-your-own-phoenix-fs-server-in-nodejs)
  * [Development](#development)
  * [Tests in Browser](#tests-in-browser)
    * [Debug Symbols in tests.](#debug-symbols-in-tests)
  * [Tests in tauri](#tests-in-tauri)
    * [Publishing to npm](#publishing-to-npm)
* [API Docs](#api-docs)
  * [Error Codes](#error-codes)
  * [Supported file encodings](#supported-file-encodings)
  * [`fs.utils`](#fsutils)
    * [Usage of encoding in `fs.readFile` API](#usage-of-encoding-in-fsreadfile-api)
    * [Use `fs.BYTE_ARRAY_ENCODING` for binary files](#use-fsbytearrayencoding-for-binary-files)
  * [`fs.Buffer`](#fsbuffer)
    * [Buffer Encodings support](#buffer-encodings-support)
  * [`EventEmitter`](#eventemitter)
  * [`fs.mountNativeFolder(optionalDirHandle?, callback)` Function](#fsmountnativefolderoptionaldirhandle-callback-function)
    * [Parameters:](#parameters)
    * [Example Usage:](#example-usage)
      * [1. Using the Directory Picker:](#1-using-the-directory-picker)
      * [2. Using a Provided Directory Handle:](#2-using-a-provided-directory-handle)
  * [`fs.openTauriFilePickerAsync(options?)` Function](#fsopentaurifilepickerasyncoptions-function)
    * [Parameters:](#parameters-1)
    * [Returns:](#returns)
    * [Example Usage:](#example-usage-1)
  * [`fs.openTauriFileSaveDialogueAsync(options?)` Function](#fsopentaurifilesavedialogueasyncoptions-function)
    * [Parameters:](#parameters-2)
    * [Returns:](#returns-1)
    * [Example Usage:](#example-usage-2)
  * [`fs.showSaveDialog` Function](#fsshowsavedialog-function)
  * [`fs.getTauriPlatformPath(phoenixFSPath)` function](#fsgettauriplatformpathphoenixfspath-function)
    * [Parameters](#parameters-3)
    * [Returns](#returns-2)
    * [Throws](#throws)
    * [Examples](#examples)
  * [`fs.getTauriVirtualPath(platformPath)` function](#fsgettaurivirtualpathplatformpath-function)
    * [Parameters](#parameters-4)
    * [Returns](#returns-3)
    * [Throws](#throws-1)
    * [Example](#example)
  * [`fs.mkdir(path, mode?, callback?)` function](#fsmkdirpath-mode-callback-function)
  * [`fs.mkdirs(path, mode?, recursive?, callback?)` function](#fsmkdirspath-mode-recursive-callback-function)
  * [`fs.readdir(path, options?, callback)` function](#fsreaddirpath-options-callback-function)
    * [Parameters](#parameters-5)
    * [Examples](#examples-1)
  * [`fs.rename(oldPath, newPath, callback)` function](#fsrenameoldpath-newpath-callback-function)
  * [`fs.copy(src, dst, callback)` function](#fscopysrc-dst-callback-function)
  * [`fs.SUPPORTED_ENCODINGS` Property](#fssupportedencodings-property)
  * [`fs.isEncodingSupported(encodingStr)` function](#fsisencodingsupportedencodingstr-function)
  * [`fs.stat(path, callback)`](#fsstatpath-callback)
    * [Parameters](#parameters-6)
    * [Stat Object](#stat-object)
    * [Example](#example-1)
  * [`fs.readFile(path, options?, callback)` Function](#fsreadfilepath-options-callback-function)
  * [`fs.writeFile(path, data, options?, callback)` Function](#fswritefilepath-data-options-callback-function)
    * [Parameters:](#parameters-7)
    * [Example:](#example-2)
  * [`fs.setNodeWSEndpoint(websocketEndpoint)`](#fssetnodewsendpointwebsocketendpoint)
  * [`fs.forceUseNodeWSEndpoint(use)`](#fsforceusenodewsendpointuse)
  * [`fs.preferNodeWSEndpoint(use)`](#fsprefernodewsendpointuse)
  * [`fs.watchAsync(pathToWatch, gitIgnorePaths)`](#fswatchasyncpathtowatch-gitignorepaths)
    * [Parameters](#parameters-8)
    * [Returns](#returns-4)
    * [Example](#example-3)
  * [`fs.unwatchAsync(eventEmitter)`](#fsunwatchasynceventemitter)
<!-- TOC -->

## Installation
The library can be either installed using npm or using the CDN link (See usage in browser below ).

### Getting the code locally
Install the library can be downloaded locally with the following command:

```bash
npm install @phcode/fs
```

Once installed, the `virtualfs.js` lib will be present in the following location
```bash
<project_root>/node_modules/@phcode/fs/dist/virtualfs.js
```
### Usage in browser
Put the below script tag in your html file. A Global `fs` object
will be created with the necessary fs APIs. 
* The fs apis have compatibility with nodejs like fs APIs.
See filer docs for API docs: https://filer.js.org/

```html
<!--// using CDN link in your html file-->
<script src="https://unpkg.com/@phcode/fs@latest/dist/virtualfs.js"/>

<!--// using CDN link in your html file if you want to debug the file system internals-->
<script src="https://unpkg.com/@phcode/fs@latest/dist/virtualfs-debug.js"/>

<!--// OR to get a particular version, change latest to the version you need:-->
<script src="https://unpkg.com/@phcode/fs@2.0.3/dist/virtualfs.js"/>

<!--// OR if you did npm install-->
<script src="<project_root>/node_modules/@phcode/fs/dist/virtualfs.js"/>

<!--// OR if you did npm install and want to debug the file system internals-->
<script src="<project_root>/node_modules/@phcode/fs/dist/virtualfs-debug.js"/>

<!--If you want to enable debug mode add this before the import script line-->
<script type="text/javascript">
    window.debugMode = true; // if you want to enable debug mode
    // alternatively set your URL query string parameter, https://yoursite?debugMode=true
</script>

```

### Usage in web-worker in browser
Inside your web-worker, import the library as below. There are some limitations for 
web workers with native fs mount points to keep in mind:
1. Native fs aceess based APIs are only available in chrome. This is a platform limitation and firefox have not
started supporting the API yet.
2. Use fs.mountNativeFolder to mount a local directory.
3. After mounting, access the files using the mountPath returned
```js
importScripts('<project_root>/node_modules/@phcode/fs/dist/virtualfs.js');
// OR from CDN directly as
importScripts('https://unpkg.com/@phcode/fs@latest/dist/virtualfs.js');

fs.mountNativeFolder((err, mountPathArray)=>{
    console.log(err, mountPathArray);
});
```

### Usage in Tauri

Make sure to use tauri with [`withglobaltauri`](https://tauri.app/v1/api/config/#buildconfig.withglobaltauri) option set in tauri config.
Install the required Tauri plugin by adding the following to your Cargo.toml file:
```toml
[dependencies]
winapi = { version = "0.3", features = ["fileapi"] }
tauri-plugin-fs-extra = { git = "https://github.com/tauri-apps/plugins-workspace", branch = "v1" }
serde = "1.0"
serde_json = "1.0"
```
Then:  
1. Copy `src-tauri/src/platform.rs` to the same folder of your tauri main file.
2. Copy all `#[tauri::command]` from `src-tauri/src/main.rs` to your tauri main file.
3. Update your `tauri::Builder::default()` section in your tauri `main fn()`

## Usage in Tauri with Node Websocket Connector

Tauri APIs are accessible exclusively from the main thread.
As a workaround, we provide a unique connector that facilitates communication with Node.js
through websockets directly from the browser, granting access to the file system from webWorkers.
This setup ensures flexibility, enabling the utilization of this library from both the primary browser tab and any worker threads.

For a detailed Node.js implementation, refer to this repository.
If the requirement arises to bundle your Node binary, the tauri sidecar feature can be used to bundle node with your tauri app.

### Example: Setting Up Your Own `phoenix-fs` Server in Node.js

Below is a quick guide to get your Phoenix-FS server up and running.

```javascript
// If you're using CommonJS syntax:
const { CreatePhoenixFsServer , setDebugMode} = require('@phcode/fs/dist/phoenix-fs');

// If you prefer ES6 module syntax, use the import statement instead:
// import { CreatePhoenixFsServer } from '@phcode/fs/dist/phoenix-fs';

// Initialize an HTTP server
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('WebSocket server is operational');
});

// set debug mode to true if you want to see more logs
setDebugMode(true); // remove this in production!
// Attach the Phoenix websocket server to the HTTP server. 
// By default, the WebSocket server endpoint will be `ws://localhost:3000/phoenixFS`
CreatePhoenixFsServer(server);

// If you wish to use a custom path, pass it as the second argument:
// CreatePhoenixFsServer(server, "/yourCustomPath");

// Activate the HTTP server on port 3000
const port = 3000;
server.listen(port, () => {
  console.log(`Server is live on http://localhost:${port}`);
});
```

Save the code above in a file, run it, and you'll have both an HTTP server and WebSocket server running concurrently.

## Development
This segment is dedicated to those contributing or modifying the codebase of this repository.
If you are just using this as a library, please skip this section.

To build it:

```bash
npm install
npm run build
```

The `npm run build` command will create two files `dist/virtualfs.js` and `dist/virtualfs-debug.js`.
Use `dist/virtualfs-debug.js` if you want to debug the phoenix filesystem lib itself.

## Tests in Browser
While developing, use test script to open browser tests.
* Test runs tests against the built artifacts in dist folder.
* You should `npm run build` if any changes were made to the src folder
```bash
npm run build
npm run test-browser
```

NOTE: you can also use `npm run serve` to also start a web server for development.

### Debug Symbols in tests.
By default, tests are run against the release build `test/virtualfs.js`. As it is heavily optimized it might be hard to debug with the release lib. 

If you want to debug the tests with more debug symbols, search for `<script src="virtualfs-debug.js"></script>` in file `test/index.html` and follow steps there.

## Tests in tauri
Again, Test runs tests against the built artifacts in dist folder.
To develop tests in tauri, run the following commands: 
1. First, build the artifacts in the `dist` folder by running:

```bash
npm run build
```

2. Next, initiate the tests by executing:

```bash
npm run test-tauri
```
This command will build the Tauri app and run the tests against the built artifacts.

While developing tests, keep the following points in mind:
- After making changes to the files in the `test` folder, press the `F5` key to reload and apply the changes to the tests.
- If you modify any files in the `src` folder, generate the `virtualfs.js` dist files by running `npm run build`,
  and then press `F5` to reload the changes for testing.
- For debugging purposes, you can open the developer tools by pressing `F12`, `Ctrl-Shift-i`, or `Cmd-Shift-i`,
  depending on your operating system.

### Publishing to npm

Inorder to publish the package to npm, do the following

1. run `npm run relese` and push changes to main branch.
2. raise a pull request from `main` branch to `npm` branch. Once the pull request is merged
and the code pushed to npm branch, GitHub actions will automatically publish the library to npm.

# API Docs

## Error Codes
 The `fs.ERR_CODES` object has all the stantard error codes used by the APIs. Here is a list:
```json
[
    "ENOENT",
    "EOF",
    "EACCES",
    "EAGAIN",
    "EBADF",
    "EBUSY",
    "EINVAL",
    "EMFILE",
    "ENFILE",
    "ENOBUFS",
    "ENOTDIR",
    "EISDIR",
    "ENOSYS",
    "ECHARSET",
    "EEXIST",
    "ENAMETOOLONG",
    "EPERM",
    "ELOOP",
    "EXDEV",
    "ENOTEMPTY",
    "ENOSPC",
    "EIO",
    "EROFS",
    "ESPIPE",
    "ECANCELED"
]
```

You can use for example `fs.ERR_CODES.EIO` to compare the error code you got from
any of the below APIs if there are some errors.

## Supported file encodings
When using file read and write apis, use `fs.SUPPORTED_ENCODINGS.*` to get a supported encoding.

The [iconv](https://www.npmjs.com/package/iconv-lite) library can also be directly accessed under `fs.utils.iconv` variable for advanced uses.

```js
// Examples:
// Convert from an encoded buffer to a js string.
str = fs.utils.iconv.decode(Buffer.from([0x68, 0x65, 0x6c, 0x6c, 0x6f]), 'win1251');

// Convert from a js string to an encoded buffer.
buf = fs.utils.iconv.encode("Sample input string", 'win1251');

// Check if encoding is supported
fs.utils.iconv.encodingExists("us-ascii")
```

## `fs.utils`
`fs.utils` houses several file related utilities. 
1. [`fs.utils.iconv`](https://www.npmjs.com/package/iconv-lite) - iconv-lite: Pure JS character encoding conversion library. See API docs here: https://www.npmjs.com/package/iconv-lite
2. [`fs.utils.picomatch`](https://www.npmjs.com/package/picomatch) - Javascript module to match a string against a regular expression, glob, string, or function that takes the string as an argument and returns a truthy or falsy value. https://www.npmjs.com/package/picomatch
3. [`fs.utils.ignore`](https://www.npmjs.com/package/ignore) - To filter filenames according to a .gitignore file. https://www.npmjs.com/package/ignore

### Usage of encoding in `fs.readFile` API

```js
// here you can use `utf16` encoding with `readFile` API to read a UTF16 file.
fs.readFile("/tauri/path/utf16.txt",
        "utf16", (e,contentStr)=>{console.log(contentStr);})
fs.readFile("/tauri/path/utf16.txt",
        fs.SUPPORTED_ENCODINGS.UTF16, (e,contentStr)=>{console.log(contentStr);})
```

### Use `fs.BYTE_ARRAY_ENCODING` for binary files
When working with binary files in the `fs.readFile` and `fs.writeFile` APIs,
you can utilize the `fs.BYTE_ARRAY_ENCODING` encoding. Using this encoding yields
an `ArrayBuffer`, which is a native browser structure. Using this approach offers
enhanced performance compared to the polyfilled `Buffer` object yielded when using just the `binary` encoding. 

```js
// here you can use `utf16` encoding with `readFile` API to read a UTF16 file.
fs.readFile("/tauri/path/utf16.txt",
        fs.BYTE_ARRAY_ENCODING, (e,contentStr)=>{console.log(contentStr);})
```

## `fs.Buffer`
This is similar to nodejs buffer APIs implemented in the browser to work with binary files.
It is available both in the global scope as `Buffer` or `fs.Buffer`.
See Examples:

```js
// see more APIs in https://nodejs.org/dist/latest-v6.x/docs/api/buffer.html#buffer_class_buffer
const buf = fs.Buffer.from([0x62, 0x75, 0x66, 0x66, 0x65, 0x72]);
```

### Buffer Encodings support
`fs.Buffer.from` and `fs.Buffer.toString` APIs do not support all the encodings. So it is recommended
to use iconv to work with custom file encodings and then use the buffer.

```js
// to get a buffer from string, instead of doing Buffer.from, use iconv.encode 
buf = Buffer.from("Sample input string", 'win1251'); // not supported/recommended and wont work even if it works for some cases
buf = fs.utils.iconv.encode("Sample input string", 'win1251'); // recommended way to create buffer for encoding

// to convert buffer to string, use iconv as well
str = buf.toString('win1251'); // not supported/recommended and wont work even if it works for some cases
str = fs.utils.iconv.decode(buf, 'win1251'); // recommended way
```

## `EventEmitter`
This library provides a global utility, `EventEmitter`, which is accessible via `window.EventEmitter`,
`self.EventEmitter`, or simply `EventEmitter`, depending on the context. This utility replicates the
functionality of the Node.js event emitter API, offering a handy tool for incorporating familiar
Node.js-style event handling in your browser environment.

For a quick introduction on using the event emitter, refer to: [Node.js EventEmitter Guide](https://nodejs.dev/en/learn/the-nodejs-event-emitter/).

## `fs.mountNativeFolder(optionalDirHandle?, callback)` Function

Mounts an fs access folder to the `/mnt` dir, prompting the user with a directory picker.

### Parameters:
- **optionalDirHandle** (Object or null, optional):
    - An optional directory handle to use for mounting. If not provided, the function will prompt the user to select a directory.

- **callback** (Function):
    - A callback function that will be called once the mounting process completes or fails. The callback will be passed two parameters: an error (or null if no error) and an array containing the mounted path (or null if mounting failed).

### Example Usage:

#### 1. Using the Directory Picker:
```javascript
fs.mountNativeFolder(function(error, [mountPath]) {
    if (error) {
        console.error("Error mounting directory:", error);
    } else {
        console.log("Directory mounted at:", mountPath);
    }
});
```

#### 2. Using a Provided Directory Handle:
```javascript
const dirHandle = someHandle;/* ... fs access directory handle https://developer.mozilla.org/en-US/docs/Web/API/FileSystemDirectoryHandle ... */;
fs.mountNativeFolder(dirHandle, function(error, [mountPath]) {
    if (error) {
        console.error("Error mounting directory:", error);
    } else {
        console.log("Directory mounted at:", mountPath);
    }
});
```

## `fs.openTauriFilePickerAsync(options?)` Function

Opens the Tauri file picker asynchronously with given options. If options aren't provided, defaults to picking a single file. If the `defaultPath` option isn't provided, it will default to the user's document directory.

### Parameters:
- **options** (Object, optional): Configuration options for the Tauri file picker.
  - **directory** (boolean, default: `false`): Whether it is a directory or file to be picked.
  - **multiple** (boolean, default: `false`): Whether to allow picking multiple files.
  - **defaultPath** (string, optional): Default directory to open in the file picker. Defaults to the document directory if not provided.
  - **title** (string, optional): The title of the dialogue window.
  - **filters** (Array, optional): Extension filters for the file dialog. Example filter:
    ```javascript
    [{
      name: 'Image',
      extensions: ['png', 'jpeg']
    }]
    ```

### Returns:
- A promise that resolves to:
  - `null` if the user dismissed the dialogue.
  - a `string` representing the selected filepath.
  - an `Array` of strings for multiple selected filepaths.

### Example Usage:
1. **Default File Picker**:
   ```javascript
   fs.openTauriFilePickerAsync().then(result => {
     console.log(result);
   });
   ```

2. **Select Multiple Image Files**:
   ```javascript
   fs.openTauriFilePickerAsync({
     multiple: true,
     filters: [{
       name: 'Images',
       extensions: ['png', 'jpeg', 'jpg']
     }]
   }).then(files => {
     console.log(files);
   });
   ```

3. **Select Directory**:
   ```javascript
   fs.openTauriFilePickerAsync({
     directory: true
   }).then(directory => {
     console.log(directory);
   });
   ```

## `fs.openTauriFileSaveDialogueAsync(options?)` Function

Opens the Tauri file save dialogue asynchronously using the provided options. If the `defaultPath` option isn't provided, it defaults to the user's document directory.

### Parameters:

- **options** (Object, optional): Configuration options for the Tauri file save dialogue.
  - **defaultPath** (string, optional): Initial directory or file path. If it's a directory path, the dialog interface will change to that folder. If it's not an existing directory, the file name will be set to the dialog's file name input and the dialog will be set to the parent folder. If not provided, defaults to the user's document directory.
  - **title** (string, optional): The title of the dialog window.
  - **filters** (Array<{name: string, extensions: string[]}>, optional): Extension filters for the file dialog. For example:
    ```javascript
    filters: [{
      name: 'Image',
      extensions: ['png', 'jpeg']
    }]
    ```

### Returns:

A promise that resolves to the selected file path if a location was chosen, or `null` if the dialogue was cancelled.

### Example Usage:

```javascript
fs.openTauriFileSaveDialogueAsync({
    defaultPath: '/path/to/example.txt',
    filters: [{ name: 'Text Files', extensions: ['txt'] }]
}).then(savePath => {
    if (savePath) {
        console.log("File will be saved at:", savePath);
    } else {
        console.log("Save dialogue was cancelled");
    }
});
```

## `fs.showSaveDialog` Function
Same as `fs.openTauriFileSaveDialogueAsync` Function if executed in Tauri browser main window. Not supported in Tauri web workers.

Throws not implemented error in non-tauri environments.

## `fs.getTauriPlatformPath(phoenixFSPath)` function

Convert Phoenix virtual file system path to platform-specific paths.

- For Windows, `/tauri/c/d/a.txt` will correspond to `c:\d\a.txt`.
- For *nix systems (Linux/Mac/Unix), `/tauri/x/y/a.txt` will correspond to `/x/y/a.txt`.

### Parameters

- `phoenixFSPath` (`string`): The Phoenix virtual file system path to be converted.

### Returns

- (`string`): The platform-specific path.

### Throws

- `Errors.EINVAL`: If the provided path doesn't start with `/tauri/` or cannot resolve to system path.

### Examples

On a Windows system:
```javascript
fs.getTauriPlatformPath('/tauri/c/users/user/a.txt');  // Returns: 'c:\users\user\a.txt'
```

On a *nix system:
```javascript
fs.getTauriPlatformPath('/tauri/home/user/a.txt');  // Returns: '/home/user/a.txt'
```

## `fs.getTauriVirtualPath(platformPath)` function

Converts platform-specific Tauri paths to Phoenix virtual file system path. 

- For Windows: `c:\d\a.txt` will be translated to `/tauri/c/d/a.txt`.
- For *nix systems (Linux/Mac/Unix): `/x/y/a.txt` will be translated to `/tauri/x/y/a.txt`.

### Parameters

- **platformPath** (`string`): The platform-specific path that needs to be converted.

### Returns

- `string`: The corresponding Phoenix virtual file system path.

### Throws

- `Errors.EINVAL`: If the provided path cannot be converted to a Phoenix FS path.

### Example

On a Windows system:
```javascript
fs.getTauriVirtualPath('c:\\users\\user\\a.txt');  
// Returns: '/tauri/c/users/user/a.txt'
```

On a *nix system:
```javascript
fs.getTauriVirtualPath('/home/user/a.txt');  
// Returns: '/tauri/home/user/a.txt'
```

## `fs.mkdir(path, mode?, callback?)` function

Creates a directory at given path. Not that the parent dir should exist for this to work. else use `fs.mkdirs`.

- **Parameters:**
  - `path` _(string)_ - The path where the directory should be created.
  - `mode` _(number|function)_ (Optional, default: `0o777`) - The directory permissions.
  - `callback` _(function)_ (Optional) - Callback to execute once directory creation is done. Called with an error as the first argument on failure, and null on success.

- **Examples:**
  ```javascript
  // Create directory with default mode, and a callback.
  fs.mkdir("/tauri/some/path", callback);

  // Create directory with specified mode and a callback.
  fs.mkdir("/tauri/some/path", 0o755, callback);
  
  // Create directory without mode and without a callback.
  fs.mkdir("/tauri/some/path");
  ```

- **Returns:**
  - `void`


## `fs.mkdirs(path, mode?, recursive?, callback?)` function

Creates a directory with optional mode and recursion (create all intermediate directories if those don't exist).

- **Parameters:**
  - `path` _(string)_ - The path where the directory should be created.
  - `mode` _(number|function)_ (Optional, default: `0o777`) - The directory permissions.
  - `recursive` _(boolean|function)_ (Optional, default: `false`) - Whether to create directories recursively.
  - `callback` _(function)_ (Optional) - Callback to execute once directory creation is done. Called with an error as the first argument on failure, and null on success.

- **Examples:**
  ```javascript
  // Create directory without recursion and with default mode, and a callback.
  fs.mkdirs("/tauri/some/path", callback);

  // Create directory with specified mode, without recursion, and a callback.
  fs.mkdirs("/tauri/some/path", 0o755, callback);

  // Create directory with specified mode, with recursion, and a callback.
  fs.mkdirs("/tauri/some/path", 0o755, true, callback);

  // Create directory without recursion, without mode, and without a callback.
  fs.mkdirs("/tauri/some/path");
  ```

- **Returns:**
  - `void`

## `fs.readdir(path, options?, callback)` function

Reads the contents of a directory. This method will list all the
entries of a directory as an array of strings (filenames, directory names, or symbolic link names). If the `withFileTypes` option is set to `true`, it will return file stat objects array instead of strings.

### Parameters

- **path** (string): The path to the directory that needs to be read.
- **options** (Object, optional): Options for reading the directory.
  - **withFileTypes** (boolean, default: `false`): Set to `true` to return stats of each content file/dir.
- **callback** (function): A callback function to execute once the directory is read. This function gets two arguments: (err, entries). `err` will be set if an error occurred during reading. `entries` is an array of file names or fs stat objects.

### Examples

Using `withFileTypes` option:

```javascript
fs.readdir("/tauri/some/path", { withFileTypes: true }, function(err, entries) {
  if (err) throw err;
  console.log(entries); // Outputs file stats
});
```

Without specifying `withFileTypes` option:

```javascript
fs.readdir("/tauri/some/path", function(err, entries) {
  if (err) throw err;
  console.log(entries); // Outputs an array of file/dir names
});
```

## `fs.rename(oldPath, newPath, callback)` function

Renames (or moves) a file or directory. If the destination already exists, the operation will fail.

**Parameters:**

- `oldPath` (**string**): The current path of the file or directory.
- `newPath` (**string**): The new path to rename the file or directory to.
- `callback` (**function**): A callback function to be executed once the rename operation is complete. This function receives a single argument:
  - `err`: An error which will be set if an error occurred during the rename.

**Example:**

```javascript
fs.rename("/tauri/some/path", "/tauri/new/path", function(err) {
  if (err) throw err;
  console.log('Rename complete');
});
```

**Returns:**
`void`

## `fs.copy(src, dst, callback)` function

Asynchronously copies a source file or directory to a destination.

- If the source is a file, it will be copied to the specified destination (the destination file doesn't exist).
- If the source is a directory, the directory will be copied recursively to the destination.

**Parameters**:

- `src` (string): The path to the source file or directory.
  
- `dst` (string): The path to the destination. 
  - If the source is a file, this should be the full path to the destination file.
  - If the source is a directory, this should be the destination directory where the source directory's contents should be copied.
  - If the destination directory exists, the source folder will be copied as a child of the destination folder.

- `callback` (function): Callback function called once the copy operation completes.
  - The first argument is an error if any occurred during the copy operation or `null` if the copy was successful.
  - The second argument is the path to the copied file or directory if the copy was successful.

**Exceptions**:

- Throws `Errors.ENOENT` When the source doesn't exist.
- Throws `Errors.EIO` For I/O related errors.
- Throws `Errors.EEXIST` When the destination file or directory already exists.

**Example**:
```javascript
fs.copy('/path/to/src', '/path/to/dest', (err, copiedPath) => {
  if (err) {
    console.error('Copy failed:', err);
  } else {
    console.log('Copy succeeded:', copiedPath);
  }
});
```

**Returns**: `void`

## `fs.SUPPORTED_ENCODINGS` Property

**Description:**  
This property holds an array of encodings that are compatible with the `fs.readFile` and `fs.readDir` APIs.

**Note:**  
The encodings within this list are in lowercase. If you need to verify the support for an encoding irrespective of its case (e.g., both `utf8` and `UTF8`), utilize the `fs.isEncodingSupported` method.


## `fs.isEncodingSupported(encodingStr)` function

**Description:**  
Determines if a given encoding is supported.

**Parameters:**
- `encoding` (string): The encoding format to check.

**Returns:**  
A boolean value. Returns `true` if the encoding is supported, otherwise returns `false`.

**Examples:**
```javascript
if (fs.isEncodingSupported('utf8')) {
   // perform operation with utf8 encoding
}

const supported = fs.isEncodingSupported('LATIN1');  // returns true
const notSupported = fs.isEncodingSupported('oopshehe');  // returns false
```

## `fs.stat(path, callback)`

Retrieves the status of a file or directory. Once the operation is complete, the result will be an object with detailed information. The provided callback function is executed with the status details.

### Parameters

- **path**: `string`
  - The path to the file or directory to retrieve the status for.

- **callback**: `function`
  - The callback function executed when the operation is complete.
  - Receives two arguments:
    1. An error object if an error occurred, otherwise null.
    2. The stat object containing the details about the file or directory.

### Stat Object

The returned `stat` object contains the following properties:

- **name**: The base name of the file or directory.
- **isFile()**, **isDirectory()**, and **isSymbolicLink()**: Functions to determine the type of the node.
- **type**: Indicates the type of the node, which can be a string indicating directory, file, or symbolic link. Prefer above `isFile()` type check over this.
- **size**: The size of the file in bytes.
- **mode**: The file's mode (integer representing the file's permission mode).
- **readonly**: Boolean value indicating if the file is read-only.
- **ctime**: Time the file was created (milliseconds since the POSIX Epoch).
- **atime**: Time the file was last accessed (milliseconds since the POSIX Epoch).
- **mtime**: Time the file was last modified (milliseconds since the POSIX Epoch).
- **nlinks**: The number of hard links.

### Example

```javascript
fs.stat("/tauri/some/path", function(err, statObj) {
  if (err) throw err;
  console.log(statObj);
});
```

## `fs.readFile(path, options?, callback)` Function

**Description**:  
Reads the contents of a file.

**Parameters**:

- **path** (`string`):  
  The path of the file to read.

- **options** (`Object|string`):  
  This can either be a string representing the encoding or an object with more specific options.
  - If provided as a `string`, it determines the encoding. The default encoding is `'binary'`, which returns a `'Buffer'`. To obtain content as a `UTF8` string, specify it as `utf8`. A list of all supported encodings can be found in `'fs.SUPPORTED_ENCODINGS'`.

    Note: When reading binary files from paths like `/tauri/` or using `fsAccess` from `/mnt/`, it's advisable to use `'fs.BYTE_ARRAY_ENCODING'` instead of the `'binary'` encoding. This ensures improved performance during binary reads. The result would be an `ArrayBuffer` native to the browser rather than using the 'Buffer' polyfill.
  - If provided as an `object`, it can have the following keys:
    - `encoding` (`string`): The type of encoding. Default is `'binary'`. Supported encodings can be seen in `'fs.SUPPORTED_ENCODINGS'`.
    - `flag` (`string`): The file system flag. Default is `'r'`.

- **callback** (`function`):  
  The callback function to execute once the file read operation concludes.
  - This callback receives two arguments:
    1. An error object (or null if there were no errors).
    2. The data read from the file (its type is based on the encoding option).

**Example**:
```javascript
fs.readFile("/path/to/file", { encoding: 'utf8' }, function(err, data) {
   if (err) throw err;
   console.log(data);
});
// or
fs.readFile("/path/to/file", 'utf8', function(err, data) {
  if (err) throw err;
  console.log(data);
});
```

**Returns**:  
`void` (This function does not return anything)

## `fs.writeFile(path, data, options?, callback)` Function

Writes data to a file, replacing the file if it already exists.

### Parameters:

- **path**: (`string`)
  - The path of the file where data should be written.

- **data**: (`ArrayBuffer|Buffer|string|number`)
  - The data to write. This can be an `ArrayBuffer`, `Buffer`, `string`, or `number`.

- **options**: (`Object|string`) [Optional]
  - If provided as a `string`, it determines the encoding. Default is `'binary'`, which writes the buffer as is.
    Retrieve the list of all supported encodings from `'fs.SUPPORTED_ENCODINGS'`.
    If writing binary files from within `/tauri/` or `fsAccess(`/mnt/`)` paths, then instead of `'binary'` encoding, prefer `'fs.BYTE_ARRAY_ENCODING'` with `ArrayBuffer` data.
  - If provided as an `object`, it can have the following properties:
    - `encoding` (`string`): The type of encoding. Default is `'binary'`.
    - `flag` (`string`): The file system flag. Default is `'w'`.
    - `mode` (`number`): (Optional, default: `0o666`) - The permissions.

- **callback**: (`function`)
  - The callback function executed once the file write operation concludes.
    - Receives one argument: An error object (or `null` if there were no errors).

### Example:

```javascript
fs.writeFile("/path/to/file", "Hello World", { encoding: 'utf8' }, function(err) {
   if (err) throw err;
   console.log("File written successfully!");
});
// or
fs.writeFile("/path/to/file", "Hello World", 'utf8', function(err) {
  if (err) throw err;
  console.log("File written successfully!");
});
```


## `fs.setNodeWSEndpoint(websocketEndpoint)`

Sets the websocket endpoint and returns a promise that resolves
when the tauri node fs connection is open. It ensures the socket remains
open across failures and automatically reconnects as necessary.

- **Parameters:**
  - `websocketEndpoint` : string. Eg.: `ws://localhost:3000/phoenixFS` 

- **Returns:**
  - Promise<void>


## `fs.forceUseNodeWSEndpoint(use)`

Forces the usage of the Node WebSocket endpoint.
Throws an error if the Node WebSocket endpoint is not set.

- **Parameters**
  - `use`: Boolean
    - If `true`, forces the use of the Node WebSocket endpoint.

- **Throws**
  - Throws an error if the Node WebSocket endpoint has not been set.
  - Call `fs.setNodeWSEndpoint(websocketEndpoint)` before calling this API.

---

## `fs.preferNodeWSEndpoint(use)`

Sets the preference to use the Node WebSocket endpoint if available.
Throws an error if the Node WebSocket endpoint is not set.
If a Node connection is not available, it falls back to Tauri.
To always force the library to use the Node WebSocket endpoint for all FS APIs, use `fs.forceUseNodeWSEndpoint`.

- **Parameters**
  - `use`: Boolean
    - If `true`, prefers the use of the Node WebSocket endpoint when available.

- **Throws**
  - Throws an error if the Node WebSocket endpoint has not been set.
  - Call `fs.setNodeWSEndpoint(websocketEndpoint)` before calling this this API.

## `fs.watchAsync(pathToWatch, gitIgnorePaths)`

Watch a specific path asynchronously for filesystem changes.

This function returns a promise that resolves an `EventEmitter` that will emit the following events:

- `fs.WATCH_EVENTS.ADD_FILE`: When a file is created.
- `fs.WATCH_EVENTS.ADD_DIR`: When a directory is created.
- `fs.WATCH_EVENTS.UNLINK_FILE`: When a file is deleted.
- `fs.WATCH_EVENTS.UNLINK_DIR`: When a directory is deleted.
- `fs.WATCH_EVENTS.CHANGE`: When a file is changed.

The watcher will ignore all files matching patterns in the provided gitignore.


> **NOTE:** Behavior differs between paths within `/tauri/` and other paths. Within Tauri, every file and folder modification is emitted as a distinct event. However, for other paths, the events are aggregated to the nearest discernible parent directory.
> **Examples:**
>
> 1. **Within Tauri Paths:**
>   If you rename a parent directory named `parentDir` to `newDir` containing two files (`file1.txt` and `file2.txt`), you will receive six separate events:
>   - 2 Events for `UNLINK_DIR` `parentDir` and `ADD_DIR` `newDir`
>   - 2 Event for the `UNLINK_FILE` `parentDir/file1.txt` and `parentDir/file2.txt` due to its parent's renaming.
>   - 2 Event for the `ADD_FILE` `newDir/file1.txt` and `newDir/file2.txt` due to its parent's renaming.
> 2. **Other Paths:**
>   Using the same scenario as above (renaming `parentDir` with two files inside), you will receive just two event(`UNLINK_DIR` and `ADD_DIR`) indicating the change in the `parentDir`. The individual changes to `file1.txt` and `file2.txt` are aggregated under the parent directory's event.
>
> This means developers working with Tauri paths should design their event handlers to accommodate individual events for each file and directory change.


### Parameters

- **pathToWatch** (string): The path to watch for filesystem changes.

- **gitIgnorePaths** (string or Array<string>, optional, default=""): The patterns to ignore, either provided as a string (representing the content of a `.gitignore` file) or an array of individual patterns. The watcher will adhere to the standard `.gitignore` specification as detailed at [git-scm](https://git-scm.com/docs/gitignore). It's important to note that if a parent directory is excluded from watching, its child directories will also be excluded, regardless of any `un-ignore` patterns in git ignore file (e.g., `!node_modules/dont_ignore_dir`).

### Returns

- **EventEmitter**: The event emitter that will notify of filesystem changes.

### Example

```javascript
// In the below watcher, we provide a gitignore formatted text to ignore 'node_modules' folder
// See https://git-scm.com/docs/gitignore for details.
const watcher = await fs.watchAsync('/path/to/watch', 'node_modules');

watcher.on(Constants.WATCH_EVENTS.ADD_FILE, (event) => {
  console.log(`File created: ${event.path}`);
});

watcher.on(Constants.WATCH_EVENTS.UNLINK_DIR, (event) => {
  console.log(`Directory deleted: ${event.path}`);
});
```


## `fs.unwatchAsync(eventEmitter)`

Stops watching for filesystem changes on a previously set path.

Once you've stopped watching using `unwatchAsync`, any further operations on the event emitter will throw an error. If you wish to start watching again, you will need to call `fs.watchAsync`.

- **Parameters**
  - `eventEmitter` - The event emitter returned by `fs.watchAsync` that you wish to stop watching.
- **Throws**
  - Throws an error (`Errors.EINVAL`) if the watcher is already closed or if operations are attempted after closing.

**Example**:

```javascript
const watcher = await fs.watchAsync('/path/to/watch', 'node_modules');

// Listen to an event.
watcher.on(fs.WATCH_EVENTS.ADD_FILE, (event) => {
  console.log(`File created: ${event.path}`);
});

// ... After some time, stop watching.
await unwatchAsync(watcher);

// Throws error since the watcher is closed.
watcher.on(fs.WATCH_EVENTS.ADD_FILE, (event) => {
  console.log(`File created: ${event.path}`);
});
```
