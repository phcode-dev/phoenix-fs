const path = require('path');
const {copy} = require("./copyFile");

copy(path.join(process.cwd(), 'dist', 'virtualfs.js'), path.join(process.cwd(), 'dist', 'virtualfs-debug.js'));
copy(path.join(process.cwd(), 'dist', 'virtualfs.js.map'), path.join(process.cwd(), 'dist', 'virtualfs-debug.js.map'));