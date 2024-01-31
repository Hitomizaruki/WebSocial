const express = require("express")
const {getFriends,deleteFriend,addFriend}=require('../Controllers/friend')
const router = express.Router()

router.get('/',getFriends)
router.post('/',addFriend)
router.delete('/:id',deleteFriend)


module.exports = router
