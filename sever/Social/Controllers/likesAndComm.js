const Mysql_Connect = require("../Database")

const like=(req,res)=>{
    try {
        const { userId, postId } = req.body;
            const q1 = `INSERT INTO likes(clientID,postID) VALUES (${userId},${postId});
            SELECT * FROM likes WHERE postID=${postId}`
            Mysql_Connect.query(q1, (err1, result1) => {
            if (err1) { throw err1 }
               
            const q2= `UPDATE  posts SET likeCount=${result1[1].length}  WHERE id=${postId}`
            Mysql_Connect.query(q2, (err2, result2) => {
            if (err2) { throw err2 }
            res.status(200).json("uploaded like")

            })
            })



    } catch (error) {
        console.log(error)
    }
}
const deleteLike=(req,res)=>{
    try {
        const { userId, postId } = req.body;
        
            const q1 = `DELETE FROM likes WHERE clientID=${userId} AND postID=${postId};
            SELECT * FROM likes WHERE postID=${postId}`
            Mysql_Connect.query(q1, (err1, result1) => {
            if (err1) { throw err1 }
               
            const q2= `UPDATE  posts SET likeCount=${result1[1].length}  WHERE id=${postId}`
            Mysql_Connect.query(q2, (err2, result2) => {
            if (err2) { throw err2 }
            res.status(200).json("deleted like")

            })
            })



    } catch (error) {
        console.log(error)
    }
}

const comment=(req,res)=>{
    try {
        const { userId, postId,comments,createDate } = req.body;
          
            const q1 = `INSERT INTO comments(clientID,postID,comments,createDate) VALUES (${userId},${postId},'${comments}','${createDate}');
            SELECT * FROM comments WHERE postID=${postId}`
            Mysql_Connect.query(q1, (err1, result1) => {
            if (err1) { throw err1 }
               
            const q2= `UPDATE  posts SET commentCount=${result1[1].length} WHERE id=${postId}`
            Mysql_Connect.query(q2, (err2, result2) => {
            if (err2) { throw err2 }
            res.status(200).json("uploaded comment")

            })
            })



    } catch (error) {
        console.log(error)
    }
}
module.exports={
    like:like,
    deleteLike:deleteLike,
    comment:comment
}