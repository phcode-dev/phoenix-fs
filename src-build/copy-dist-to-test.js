const fs = require('fs');
const path = require('path');

function copy(sourceFile, destinationFile) {
    console.log("copying", sourceFile, "to", destinationFile)
    return new Promise((resolve, reject)=>{
        fs.copyFile(sourceFile, destinationFile, (err) => {
            if (err) {
                console.error('Error copying file:', err);
                reject();
            }
            resolve();
        });
    });
}

copy(path.join(process.cwd(), 'dist', 'virtualfs.js'), path.join(process.cwd(), 'test', 'virtualfs.js'));
copy(path.join(process.cwd(), 'dist', 'virtualfs.js.map'), path.join(process.cwd(), 'test', 'virtualfs.js.map'));