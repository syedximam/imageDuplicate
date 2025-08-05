const crypto = require('crypto');
const fs = require('fs');
const path = require('path')


function hashing() {
    const hashes = [];
    const onlyHashed = [];
    const folderName = path.join(__dirname, 'uploads/');
    const files = fs.readdirSync(folderName);


    for (let i = 0; i < files.length; i++) {
        const fullPath = path.join(folderName, files[i]);
        const stat = fs.statSync(fullPath);
        if (stat.isFile()) {

            const hash = crypto.createHash('md5').update(fs.readFileSync(fullPath)).digest('hex');
            hashes.push({ path: fullPath, hash });
            onlyHashed.push(hash);
        }
    }
    return [onlyHashed, hashes];
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
// hashedPath, compared
function findAndDelete(hashedWithPath, hashed) {
    // I have two arrays, one with hashed strings of duplicates and another with all hashed with path
    // I have to check each hashed with hashedWithPath and if anything matches then delete that file via the path
    // Add another array to keep track of the hashed we deleted to avoid deleting the original one also
    // Create a double loop for comparison
    // Create a checklist array
    // check if the hash is in the checklist, if no then compare and if yes the don't do anything
    const checkList = [];
    for (let i = 0; i < hashed.length; i++) {
        for (let j = 0; j < hashedWithPath.length; j++) {
            if (!checkList.includes(hashed[i])) {
                if (hashed[i] === hashedWithPath[j].hash) {
                    fs.unlinkSync(hashedWithPath[j].path);
                    checkList.push(hashed[i]);
                }
            }
        }
    }

}



module.exports = {
    hashing,
    compare,
    findAndDelete
}