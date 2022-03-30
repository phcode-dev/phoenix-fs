# Phoenix fs

node like `fs` API for the browser that uses indexedDB/ fs access browser APIs for persistence.

## Installation

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


```js
<script src="path/to/dist/virtualfs.js"/>
```
