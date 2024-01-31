let mysql=require("mysql")
const Mysql_Connect=mysql.createConnection({
    host:"localhost",
    password:"",
    user:"root",
    database:"my_social",
    multipleStatements:true
})
module.exports=Mysql_Connect