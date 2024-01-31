const jwt = require("jsonwebtoken")
const Mysql_Connect = require("../Database")

// Follow and Following Friends

const addRequest=(req, res) => {
    const {friendId}=req.body
    const token=req.headers['accept-token']
    try {
        jwt.verify(token,'mysecretjsontoken',(jwtErr,userInfor)=>{
            if (jwtErr)  throw jwtErr
            const q =`INSERT INTO relations ( followerUserID, followedUserID) VALUES (${userInfor.id},${friendId})`

            Mysql_Connect.query(q, (err, result) => {
            if (err)  throw err 
                res.status(200).json("reqFriend was uploaded")
            })
        })
                  
    } catch (error) {
        console.log(error)
    }
}

const deleteRequest=(req, res) => {
    const {userID,friendId}=req.body
    try {
        const q =
        `DELETE FROM relations WHERE followerUserID=${userID} AND followedUserID=${friendId}`
        Mysql_Connect.query(q, (err, result) => {
        if (err)  throw err 
            res.status(200).json("requestFriend was Deleted")
        })
                  
    } catch (error) {
        console.log(error)
    }
}
module.exports = {
    addRequest:addRequest,
    deleteRequest:deleteRequest
}
