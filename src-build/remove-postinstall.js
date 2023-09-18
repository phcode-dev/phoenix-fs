const fs = require('fs');
const path = require('path');

const packageJsonPath = path.join(__dirname, '../package.json');
const packageData = require(packageJsonPath);

// Remove the postinstall script
if (packageData.scripts && packageData.scripts.postinstall) {
    delete packageData.scripts.postinstall;
}

// Rewrite the package.json without the postinstall script
fs.writeFileSync(packageJsonPath, JSON.stringify(packageData, null, 2) + '\n');