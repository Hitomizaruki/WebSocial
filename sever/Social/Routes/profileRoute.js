const express = require("express")
const {getProfile, addProfile}=require('../Controllers/profile')
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

router.get('/:id',getProfile)
router.post('/',upload.single("profileImg"),addProfile)

module.exports = router
