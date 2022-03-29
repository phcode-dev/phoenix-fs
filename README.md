# Phoenix fs

node like `fs` API for the browser that uses indexedDB/ fs access browser APIs for persistence.

## Installation

To build it:

```bash
npm install
npm run build
```

To Test:
While developing, use test or testDist script to open browser tests.
* test runs tests against the src folder and
* testDist runs tests against the release build
```bash
npm run test 
npm run testDist 
```


The js library will be built in `dist/nohost-sw.js`. 
NOTE: you can also use `npm run dev` to also start a web server for development.


```js
<script src=""/>
```
