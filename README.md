# Phoenix fs

node like `fs` API for the browser that uses indexedDB/ fs access browser APIs for persistence.

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
