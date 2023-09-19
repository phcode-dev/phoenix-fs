const path = require('path');
const {copy} = require("./copyFile");

copy(path.join(process.cwd(), 'src-tauri', 'node-src', 'phoenix-fs.js'), path.join(process.cwd(), 'dist', 'phoenix-fs.js'));
