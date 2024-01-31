const jwt = require("jsonwebtoken")
const Mysql_Connect = require("../Database")


const getSearch=(req, res) => {
    const token=req.headers['accept-token']
    const searchValue=req.params.id
    try {
        jwt.verify(token,'mysecretjsontoken',(jwtErr,userInfor)=>{
            if (jwtErr)  throw jwtErr
            const q =
            `SELECT * FROM users WHERE Name LIKE'%${searchValue}%';
            SELECT * FROM posts WHERE captions LIKE'%${searchValue}%'`
    
            Mysql_Connect.query(q, (err, result) => {
                if (err)  throw err 
                res.status(200).json({people:result[0],posts:result[1]})
            })
        })

    } catch (error) {
        console.log(error)
    }
}

module.exports={
    getSearch:getSearch
}