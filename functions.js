const crypto = require('crypto');
const fs = require('fs');
const path = require('path')


function hashing() {
    const hashes = [];
    const folderName = path.join(__dirname, 'uploads/');
    const files = fs.readdirSync(folderName);


    for (let i = 0; i < files.length; i++) {
        const fullPath = path.join(folderName, files[i]);
        const stat = fs.statSync(fullPath);
        if (stat.isFile()) {
            
            const hash = crypto.createHash('md5').update(fs.readFileSync(fullPath)).digest('hex');
            hashes.push(hash);
        }
    }
    return hashes;
}

function compare(array) {
    const duplicates = [];
    for (let i = 0; i < array.length; i++) {
        for (let j = i + 1; j < array.length; j++) {
            if (array[i] === array[j]) {
                duplicates.push(array[i]);
            }
        }
    }
    return duplicates;
}


module.exports = {
    hashing,
    compare
}