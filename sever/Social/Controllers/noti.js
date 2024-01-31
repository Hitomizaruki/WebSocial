const jwt = require("jsonwebtoken")
const Mysql_Connect = require("../Database")


const getNoti=(req, res) => {
    const token=req.headers['accept-token']
    try {
        jwt.verify(token,'mysecretjsontoken',(jwtErr,userInfor)=>{
            if (jwtErr)  throw jwtErr
            const q =
            `SELECT n.type,n.link,u.profileImage,u.Name FROM notifications AS n
            LEFT JOIN users AS u ON(u.id=n.notiFrom) WHERE n.notiTo=${userInfor.id}`
    
            Mysql_Connect.query(q, (err, result) => {
                if (err)  throw err 
                res.status(200).json({result})
            })
        })

    } catch (error) {
        console.log(error)
    }
}

module.exports={
    getNoti:getNoti
}