const path = require('path');
const {copy} = require("./copyFile");

copy(path.join(process.cwd(), 'dist', 'virtualfs.js'), path.join(process.cwd(), 'test', 'virtualfs.js'));
copy(path.join(process.cwd(), 'dist', 'virtualfs-debug.js'), path.join(process.cwd(), 'test', 'virtualfs-debug.js'));
copy(path.join(process.cwd(), 'dist', 'virtualfs.js.map'), path.join(process.cwd(), 'test', 'virtualfs.js.map'));
copy(path.join(process.cwd(), 'dist', 'virtualfs-debug.js.map'), path.join(process.cwd(), 'test', 'virtualfs-debug.js.map'));
