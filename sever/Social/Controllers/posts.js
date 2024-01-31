const jwt = require("jsonwebtoken")
const Mysql_Connect = require("../Database")


const getPosts=(req, res) => {
    const token=req.headers['accept-token']
    try {
        jwt.verify(token,'mysecretjsontoken',(jwtErr,userInfor)=>{
            if (jwtErr)  throw jwtErr
            const GET_POSTS =
            `SELECT p.*,u.profileImage,u.Name FROM posts AS p
            LEFT JOIN users AS u ON(u.id=p.createUser)
            LEFT JOIN friends AS f ON(p.createUser=f.friendId) WHERE f.clientID=${userInfor.id}`
    
            Mysql_Connect.query(GET_POSTS, (POSTS_ERR, POSTS_DATA) => {
                if (POSTS_ERR)  throw POSTS_ERR 
                res.status(200).json({posts:POSTS_DATA})
            })
        })

    } catch (error) {
        console.log(error)
    }
}
const getPostInfo=(req, res) => {
    const PostID=req.params.PostID
    const token=req.headers['accept-token']
    try {
        jwt.verify(token,'mysecretjsontoken',(jwtErr,userInfor)=>{
            if (jwtErr)  throw jwtErr
            const GET_POSTS =
            `SELECT p.*,u.Name,u.profileImage FROM posts AS p
            LEFT JOIN users AS u ON(u.id=p.createUser) WHERE p.id=${PostID}`
            Mysql_Connect.query(GET_POSTS, (POSTS_ERR, POSTS_DATA) => {
            if (POSTS_ERR)  throw POSTS_ERR 

            const GET_LIKES =
            `SELECT u.id,u.Name,u.profileImage FROM likes AS l
            LEFT JOIN users AS u ON(u.id=l.clientID) WHERE l.postID=${PostID}`
            Mysql_Connect.query(GET_LIKES, (LIKES_ERR, LIKES_DATA) => {
            if (LIKES_ERR)  throw LIKES_ERR 

            const GET_COMMENTS =
            `SELECT c.*,u.Name,u.profileImage FROM comments AS c
            LEFT JOIN users AS u ON(u.id=c.clientID) WHERE c.postID=${PostID}`
            Mysql_Connect.query(GET_COMMENTS, (COMMENTS_ERR, COMMENTS_DATA) => {
                if (COMMENTS_ERR)  throw COMMENTS_ERR 

                res.status(200).json({
                userID:userInfor.id,
                posts:POSTS_DATA,
                likes:LIKES_DATA,
                comments:COMMENTS_DATA
                })
                
            })

            })

            })
        })

    } catch (error) {
        console.log(error)
    }
}
const addPost=async(req, res) => {
    const token=req.headers['accept-token']
    try {
        const {caption} = req.body;
        const post_imgs=req.files
        let D=[]
        await post_imgs.map(t=>{
            D.push(t.filename)
        })

        jwt.verify(token,'mysecretjsontoken',(jwtErr,userInfor)=>{
            if (jwtErr)  throw jwtErr
            const q = `INSERT INTO posts(createUser,photo,captions,createDate) VALUES (?,?,?,?)`

            Mysql_Connect.query(q, [userInfor.id, JSON.stringify(D), caption, Date.now()], (err, result) => {
                if (err) { throw err }
                res.status(200).json("Posts have  Finished")
            })
        })
    } catch (error) {
        console.log(error)
    }
}
module.exports={
    getPosts:getPosts,
    getPostInfo:getPostInfo,
    addPost:addPost
}