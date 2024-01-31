const jwt = require("jsonwebtoken")
const Mysql_Connect = require("../Database")

const getProfile=(req, res) => {
    const userID=req.params.id
    const token=req.headers['accept-token']
    try {
        jwt.verify(token,'mysecretjsontoken',(jwtErr,userInfor)=>{
            if (jwtErr)  throw jwtErr 
            const q =`SELECT * FROM users WHERE id=${userID};

            SELECT p.*,u.Name,u.profileImage FROM posts AS p
            LEFT JOIN users AS u ON(u.id=p.createUser) WHERE u.id=${userID};

            SELECT u.id,u.Name,u.profileImage FROM friends AS f
            LEFT JOIN users AS u ON(u.id=f.friendId) WHERE f.clientID=${userID};

            SELECT u.Name FROM relations AS r
            LEFT JOIN users AS u ON(u.id=r.followerUserID) WHERE r.followedUserID=${userInfor.id};

            SELECT u.Name FROM relations AS r
            LEFT JOIN users AS u ON(u.id=r.followedUserID) WHERE r.followerUserID=${userInfor.id};

            SELECT u.Name FROM friends AS fo
            LEFT JOIN users AS u ON(u.id=fo.friendId) WHERE fo.clientID=${userInfor.id}`

            
            Mysql_Connect.query(q, (ISFRIENDS_ERR, result) => {
            if (ISFRIENDS_ERR)  throw ISFRIENDS_ERR 
                res.status(200).json({
                    MYID:userInfor.id,
                    profile:result[0][0],
                    posts:result[1],
                    friends:result[2],
                    requests:result[3].map(e=>e.Name),
                    myRequests:result[4].map(e=>e.Name),
                    isFriends:result[5].map(e=>e.Name)
                })
            })
        })

    } catch (error) {
        console.log(error)
    }
}
const addProfile=(req, res) => {
    const token=req.headers['accept-token']
    try {
        jwt.verify(token,'mysecretjsontoken',(jwtErr,userInfor)=>{
            if (jwtErr)  throw jwtErr 
            const q =req.file?`UPDATE users SET Name='${req.body.name}', profileImage='${req.file.filename}' WHERE id=${userInfor.id}`
            :`UPDATE users SET Name='${req.body.name}' WHERE id=${userInfor.id}`
            Mysql_Connect.query(q, (err, result) => {
            if (err)  throw err 
                res.status(200).json("success")
            })
        })
    } catch (error) {
        res.status(500).json("sever error")
    }
  
    
}
module.exports = {
    getProfile:getProfile,
    addProfile,addProfile
}
