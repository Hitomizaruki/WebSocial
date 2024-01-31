const express = require("express")
const {register,login,getClient, GetOtp}=require('../Controllers/auth')
const router = express.Router()

router.get('/',getClient)
router.post('/GetOtp',GetOtp)

router.post('/register',register)
router.post('/login',login)

module.exports = router
