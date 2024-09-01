const mysql=require('mysql2');
const conn=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'test',
    port:3306
});
// check database connection
conn.connect(err =>{
    if(err){console.log(err)}
    console.log("Database connected successfully");
   
});
module.exports=conn;