const express = require("express")
const {getNoti}=require('../Controllers/noti')
const router = express.Router()

router.get('/',getNoti)


module.exports = router
