const express = require('express')
const multer = require('multer') // Install multer
const path = require('path')
const app = express()
const port = 3000

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
    const abb = req.files
    res.send({ msg: abb });
})
 

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
