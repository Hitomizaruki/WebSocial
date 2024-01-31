const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const Mysql_Connect = require("../Database")
var nodemailer = require('nodemailer');
const OTP_generator = require("otp-generator")

const salt = 10

var transporter = nodemailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "06dcb45ee48225",
        pass: "8f6c050d2074d8"
    }
});
const GetOtp= (req, res) => {
    try {
        const { Email } = req.body;
        let OTP = OTP_generator.generate(6, {
            upperCaseAlphabets: false,
            specialChars: false,
            digits: true,
            lowerCaseAlphabets: false
        });
        var mailOptions = {
            from: "nina.collins70@ethereal.email",
            to: Email,
            subject: 'OTP Codes From BenSocial',
            text: `Your OTP code is ${OTP}`
        };
        
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error, Email);
                res.status(401).json(`OTP code has not been delievered. OTPCode:${OTP}`)

            } else {
                console.log('Email sent: ' + info.response);
                res.status(200).json(OTP)
            }
        });
    }

    catch (error) {
        console.log(error)
    }
}

const register=(req,res)=>{
    try {
        const { email, password, name } = req.body;
        bcrypt.hash(password.toString(), salt, (b_err, hash) => {
            if (b_err) { throw b_err }
            const q = `INSERT INTO users(Email,Password,Name,profileImage) VALUES (?,?,?,?)`

            Mysql_Connect.query(q, [email, hash, name,'profileImage.png'], (err, result) => {
                if (err) { throw err }
                const token = jwt.sign({ id: result.insertId }, "mysecretjsontoken")
                return res.status(200).json({ token: token })

            })

        })


    } catch (error) {
        console.log(error)
    }
}

 const login=(req, res) => {
    try {
        const { email, password } = req.body;
        console.log( email, password)

        const q = `SELECT * FROM users WHERE Email=?`
        Mysql_Connect.query(q,[email], (err, result) => {
            if (err) { throw err }

            if (result.length > 0) {
                bcrypt.compare(password.toString(), result[0].Password, (b_err, hash) => {
                    if (b_err) { throw b_err }

                    if (hash) {
                        const token = jwt.sign({ id: result[0].id }, "mysecretjsontoken")
                        return res.status(200).json({ token: token, hash: hash })
                    }
                    else if (!hash) {
                        return res.status(401).json({ hash: hash })
                    }
                })
            } else {
                return res.status(500).json("account is not found")
            }

        })

    } catch (error) {
        console.log(error)
    }
}
const getClient=(req,res)=>{
    const token=req.headers['accept-token']
    try {
        jwt.verify(token,'mysecretjsontoken',(jwtErr,userInfor)=>{
            if (jwtErr)  throw jwtErr 
            const q =`SELECT * FROM users WHERE id=${userInfor.id};
            SELECT * FROM notifications  WHERE notiTo=${userInfor.id}`
            Mysql_Connect.query(q, (err, result) => {
                if (err) { throw err }
                if(result[0].length>0){
                    res.status(200).json({user:result[0][0],noti:result[1].length})
    
                }else{
                    res.status(404).json("user is not found")
                }
            })
            
        })
    }catch(err){
        res.status(401).json("token is invalid !")
    }
}
module.exports={
    register:register,
    login:login,
    getClient:getClient,
    GetOtp:GetOtp
}