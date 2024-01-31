const express = require("express")
const {getSearch}=require('../Controllers/search')
const router = express.Router()

router.get('/:id',getSearch)


module.exports = router
