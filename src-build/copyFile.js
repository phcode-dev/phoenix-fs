const fs = require('fs');

function copy(sourceFile, destinationFile) {
    console.log("copying", sourceFile, "to", destinationFile)
    fs.copyFileSync(sourceFile, destinationFile);
}

exports.copy = copy;