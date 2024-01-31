const express = require("express")
const {deleteLike,like,comment}=require('../Controllers/likesAndComm')
const router = express.Router()

router.post('/postLike',like)
router.post('/deleteLike',deleteLike)
router.post('/comments',comment)


module.exports = router
