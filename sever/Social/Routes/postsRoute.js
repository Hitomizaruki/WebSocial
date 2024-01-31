const express = require("express")
const {getPosts,getPostInfo, addPost}=require('../Controllers/posts')
const router = express.Router()
const multer = require("multer")

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        return cb(null, "./Social/ImgData")
    },
    filename: (req, file, cb) => {
        const ext = file.mimetype.split("/")[1];
        cb(null, `admin-${file.fieldname}-${Date.now()}.${ext}`)
    }
})

const upload = multer({
    storage: storage
})


router.get('/',getPosts)
router.get('/:PostID',getPostInfo)
router.post('/', upload.array("images"),addPost)

module.exports = router
