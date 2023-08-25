# Phoenix fs
node like `fs` API for the browser that uses indexedDB/ fs access browser APIs/ tauri fs APIs/ Node fs apis for persistence.

<!-- TOC -->
* [Phoenix fs](#phoenix-fs)
  * [Installation](#installation)
    * [Getting the code locally](#getting-the-code-locally)
    * [Usage in browser](#usage-in-browser)
    * [Usage in web-worker in browser](#usage-in-web-worker-in-browser)
    * [Usage in Tauri](#usage-in-tauri)
  * [Development](#development)
  * [Tests in Browser](#tests-in-browser)
  * [Tests in tauri](#tests-in-tauri)
    * [Publishing to npm](#publishing-to-npm)
* [API Docs](#api-docs)
  * [`fs.mountNativeFolder` Function](#fsmountnativefolder-function)
    * [Parameters:](#parameters)
    * [Example Usage:](#example-usage)
      * [1. Using the Directory Picker:](#1-using-the-directory-picker)
      * [2. Using a Provided Directory Handle:](#2-using-a-provided-directory-handle)
  * [`fs.openTauriFilePickerAsync` Function](#fsopentaurifilepickerasync-function)
    * [Parameters:](#parameters-1)
    * [Returns:](#returns)
    * [Example Usage:](#example-usage-1)
  * [`fs.openTauriFileSaveDialogueAsync` Function](#fsopentaurifilesavedialogueasync-function)
    * [Parameters:](#parameters-2)
    * [Returns:](#returns-1)
    * [Example Usage:](#example-usage-2)
  * [`fs.showSaveDialog` Function](#fsshowsavedialog-function)
  * [`fs.getTauriPlatformPath(phoenixFSPath)` function](#fsgettauriplatformpathphoenixfspath-function)
    * [Parameters](#parameters-3)
    * [Returns](#returns-2)
    * [Throws](#throws)
    * [Examples](#examples)
  * [`fs.getTauriVirtualPath` function](#fsgettaurivirtualpath-function)
    * [Parameters](#parameters-4)
    * [Returns](#returns-3)
    * [Throws](#throws-1)
    * [Example](#example)
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

<!--// OR to get a particular version, change latest to the version you need:-->
<script src="https://unpkg.com/@phcode/fs@1.0.4/dist/virtualfs.js"/>

<!--// OR if you did npm install-->
<script src="<project_root>/node_modules/@phcode/fs/dist/virtualfs.js"/>

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
tauri-plugin-fs-extra = { git = "https://github.com/tauri-apps/plugins-workspace", branch = "v1" }
```
Then in `src-tauri/src/main.rs`, make the following changes depending on your main file.

```rust
fn main() {
    tauri::Builder::default()
        .plugin(tauri_plugin_fs_extra::init())
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
```

## Development

To build it:

```bash
npm install
npm run build:dev
```

## Tests in Browser
While developing, use test script to open browser tests.
* Test runs tests against the built artifacts in dist folder.
* You should `npm run build` if any changes were made to the src folder
```bash
npm run build:dev
npm run test-browser
```

NOTE: you can also use `npm run serve` to also start a web server for development.

## Tests in tauri
Again, Test runs tests against the built artifacts in dist folder.
To develop tests in tauri, run the following commands: 
1. First, build the artifacts in the `dist` folder by running:

```bash
npm run build:dev
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

## `fs.mountNativeFolder` Function

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
const dirHandle = /* ... fs access directory handle https://developer.mozilla.org/en-US/docs/Web/API/FileSystemDirectoryHandle ... */;
fs.mountNativeFolder(dirHandle, function(error, [mountPath]) {
    if (error) {
        console.error("Error mounting directory:", error);
    } else {
        console.log("Directory mounted at:", mountPath);
    }
});
```

## `fs.openTauriFilePickerAsync` Function

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

## `fs.openTauriFileSaveDialogueAsync` Function

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

- `Error`: If the provided path doesn't start with `/tauri/` or cannot resolve to system path.

### Examples

On a Windows system:
```javascript
fs.getTauriPlatformPath('/tauri/c/users/user/a.txt');  // Returns: 'c:\users\user\a.txt'
```

On a *nix system:
```javascript
fs.getTauriPlatformPath('/tauri/home/user/a.txt');  // Returns: '/home/user/a.txt'
```

## `fs.getTauriVirtualPath` function

Converts platform-specific Tauri paths to Phoenix virtual file system path. 

- For Windows: `c:\d\a.txt` will be translated to `/tauri/c/d/a.txt`.
- For *nix systems (Linux/Mac/Unix): `/x/y/a.txt` will be translated to `/tauri/x/y/a.txt`.

### Parameters

- **platformPath** (`string`): The platform-specific path that needs to be converted.

### Returns

- `string`: The corresponding Phoenix virtual file system path.

### Throws

- If the provided path cannot be converted to a Phoenix FS path.

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
