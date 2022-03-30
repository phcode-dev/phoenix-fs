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

```js
// using CDN link in your html file
<script src="https://unpkg.com/@phcode/fs@latest/dist/virtualfs.js"/>

// OR to get a particular version, change latest to the version you need:
<script src="https://unpkg.com/@phcode/fs@1.0.4/dist/virtualfs.js"/>

// OR if you did npm install
<script src="<project_root>/node_modules/@phcode/fs/dist/virtualfs.js"/>
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

## Development

To build it:

```bash
npm install
npm run build
```

To Test:
While developing, use test script to open browser tests.
* Test runs tests against the release build.
* You should `npm run build` if any changes were made to the src folder
```bash
npm run build
npm run test 
```


The js library will be built in `dist/nohost-sw.js`. 
NOTE: you can also use `npm run dev` to also start a web server for development.

