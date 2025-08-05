const express = require('express')
const multer = require('multer') // Install multer
const path = require('path')
const { hashing, compare } = require('./functions');
const app = express()
const port = 3000


// Function for hashing images



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
