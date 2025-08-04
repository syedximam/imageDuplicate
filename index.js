const express = require('express')
const crypto = require('crypto');
const fs = require('fs');
const multer = require('multer') // Install multer
const path = require('path')
const app = express()
const port = 3000


// Function for hashing images
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

// Storing the uploaded files with same extension in uploads folder
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        const originalName = file.originalname;
        const uniqueName = Date.now() + '-' + originalName;
        cb(null, uniqueName)
    }
})
// Defining variable for storage(uploads)
const upload = multer({ storage })


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
})
app.post("/profile", upload.array('image'), (req, res) => {
    const hashed = hashing();
    console.log(hashed);
    const compared = compare(hashed);
    console.log(compared)
    res.send({ msg: `You have ${compared.length} duplicate files ${compared}`});
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
