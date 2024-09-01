const express=require('express');
const cors=require('cors');
const bodyParser = require('body-parser');
const app=express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
const dbs=require("./db/index");
const routers=require("./routes/userss");
app.get("/",(req,res)=>{
    res.send("welcome to server");
});
 
app.use("/",routers);
app.listen(3000,()=>{
    console.log("server is running on port 3000");
})