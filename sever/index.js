const express = require("express")
const path=require("path")
const cors = require("cors")
const bodyParser = require("body-parser")
const Mysql_Connect = require("./Social/Database")
const io=require("socket.io")
// Routes
const authRouter = require("./Social/Routes/authRoute")
const profileRouter = require("./Social/Routes/profileRoute")
const postsRouter = require("./Social/Routes/postsRoute")
const friendsRouter = require("./Social/Routes/friendsRoute")
const followRouter = require("./Social/Routes/followRoute")
const notiRouter = require("./Social/Routes/notiRoute")
const searchRouter=require("./Social/Routes/searchRoute")
const likesAndCommRouter=require("./Social/Routes/likesAndComm")


const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname+"/Social/ImgData")));

// Routes
app.use('/auth',authRouter)
app.use('/profile',profileRouter)
app.use('/posts',postsRouter)
app.use('/friends',friendsRouter)
app.use('/follow',followRouter)
app.use('/noti',notiRouter)
app.use('/search',searchRouter)
app.use('/likesAndComm',likesAndCommRouter)


app.listen(4000,()=>{
    try {
        console.log("Sever is running on Port:4000")
        Mysql_Connect.connect(err=>{
            if(err){throw err}
            console.log("database is running ")
        })
        
    } catch (error) {
        console.log("Error:",error)   
    }
})

