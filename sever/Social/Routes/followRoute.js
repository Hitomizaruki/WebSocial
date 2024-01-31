const express = require("express")
const {addRequest,deleteRequest}=require('../Controllers/follow')
const router = express.Router()


// Follow and Following Friends
router.post('/',addRequest)
router.post('/deleteRequest',deleteRequest)

module.exports = router