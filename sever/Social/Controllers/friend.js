const jwt = require("jsonwebtoken")
const Mysql_Connect = require("../Database")

const getFriends=(req, res) => {
    const token=req.headers['accept-token']
    try {
        jwt.verify(token,'mysecretjsontoken',(jwtErr,userInfor)=>{
            if (jwtErr)  throw jwtErr
            console.log(userInfor.id)

            const q=`SELECT u.* FROM relations AS r 
                LEFT JOIN users AS u ON(u.id=r.followerUserID) WHERE r.followedUserID=${userInfor.id};
        
                SELECT followedUserID FROM  relations WHERE followerUserID=${userInfor.id};
                SELECT friendId FROM  friends WHERE clientID=${userInfor.id};
                SELECT * FROM  users WHERE id !=${userInfor.id};
                `
            
            Mysql_Connect.query(q, (err, result) => {
            if (err)  throw err 

                // remove know friends and remove  requests users and my requests users 
                const FILTER_REQ=result[0].map(e=>e.id)
                const FILTER_MYREQ=result[1].map(e=>e.followedUserID)
                const FILTER_Friends=result[2].map(e=>e.friendId)

                // filter know people
                const friends=result[3].filter(e=>{
                    return !FILTER_REQ.includes(e.id) && !FILTER_Friends.includes(e.id) && !FILTER_MYREQ.includes(e.id)
                })
                res.status(200).json({
                    requests:result[0],
                    friends:friends
                })
            })
        })
                  
    } catch (error) {
        console.log(error)
    }
}
const addFriend=(req, res) => {
    const {friendId,type}=req.body
    const token=req.headers['accept-token']
    try {
        jwt.verify(token,'mysecretjsontoken',(jwtErr,userInfor)=>{
            if (jwtErr)  throw jwtErr
            const q =
            `INSERT INTO friends ( clientID, friendId) VALUES (${userInfor.id},${friendId});
            INSERT INTO friends ( clientID, friendId) VALUES (${friendId},${userInfor.id});
            DELETE FROM relations WHERE followedUserID=${userInfor.id} AND followerUserID=${friendId}`
            Mysql_Connect.query(q, (err, result) => {
            if (err)  throw err 

                const notiQ=`INSERT INTO notifications ( notiFrom, notiTo,type,link) VALUES (${userInfor.id},${friendId},'${type}',${userInfor.id})`
                Mysql_Connect.query(notiQ, (notiErr, notiResult) => {
                if (notiErr)  throw notiErr 
                    res.status(200).json("friend was added")
                })

            })
        })
                  
    } catch (error) {
        console.log(error)
    }
}
const deleteFriend=(req, res) => {
    const friendId=req.params.id
    const token=req.headers['accept-token']
    try {
            jwt.verify(token,'mysecretjsontoken',(jwtErr,userInfor)=>{
                if (jwtErr)  throw jwtErr
            const q =
            `DELETE FROM friends WHERE friendId=${userInfor.id} AND clientID=${friendId};
            DELETE FROM friends WHERE friendId=${friendId} AND clientID=${userInfor.id}
            `
            Mysql_Connect.query(q, (err, result) => {
            if (err)  throw err 
                res.status(200).json("friend was Deleted")
            })
        })
                  
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getFriends:getFriends,
    deleteFriend:deleteFriend,
    addFriend:addFriend
}
