const express = require('express');
const router = express.Router();
const db = require("../db/index");
const conn = require('../db/index');

router.get("/getadmininfo/:id", function (req, res) {
    var user=req.url.split('/')[2];
    db.query("SELECT * FROM  admin where username=?",[user], function (err, result) {
        if (err) {
            res.send({ success: false, message: "error" });
        }
        else if (result.length>0) { 
            res.send({ data: result,});
        }
        else {
            res.send({ success: false, message: "no data found!!!.." });
        }

    });

});

router.get("/getuser/:code", function (req, res) {
let usercode=req.url.split('/')[2];
    db.query("SELECT * FROM  sellerregistration where usercode=?",[usercode], function (err, result) {
        if (err){
            res.send({ success: false, message: "error" });
        }
        else if (result.length>0) { 
            res.send({ data: result,});
        }
        else {
            res.send({ success: false, message: "no data found!!!.." });
        }

    });

});

router.post("/seller", function (req, res) {
    const { usercode, password } = req.body;
    console.log(req.body)
    db.query("select * from sellerregistration where usercode=? and password=?", [usercode, password], (err, results) => {
        if (err) {
            res.send({ message: err, });
        }
        
        else if (results.length>0) {
            const name=results[0]["name"];
            const usercode=results[0]["usercode"];
            res.send({ submit: true, data: results,name ,usercode});
        }
        else {
            res.send({ submit: false });
        }
    });
});
router.post("/admin", function (req, res) {
    const { username, password } = req.body;
    db.query("select * from admin where username=? and password=?", [username, password], (err, result2) => {
        if (err) {
            res.send({ message: err, });
            console.log(err);
        }
        else if (result2.length > 0) {
            const name=result2[0]["name"];
            res.send({ submit: true,data:name });
        }
        else {
            res.send({ submit: false, });
        }
    });
});

router.get("/getcollection/:uid",(req,res)=>{
     let usercode=req.params.uid;
    db.query("select * from milkcollection where usercode=?",[usercode],(err,ressult)=>{
        if (err) throw err;
        else if (ressult.length>0){
            res.send({submit:true,details:ressult});
        }
        else{
            res.send({submit:false,});
        }
    }); 
      
});
router.get("/getpay/:payid",(req,res)=>{
    let usercode=req.params.payid; 
   db.query("select * from payments where usercode=?",[usercode],(err,result12)=>{
       if (err) throw err;
       else if (result12.length>0){
           res.send({submit:true,paydetails:result12});
       }
       else{
           res.send({submit:false,message:"no such user found"});
       }
   });
     
});

router.post("/sellerregister", (req, res) => {
    db.query("insert into sellerregistration set?", req.body, (err, result4) => {
        if (err) {
            console.log(err);
            res.send({ message: err });
        }
        else {
            console.log(result4);
            res.send({ submit: true, });
        }

    });
});

router.get("/sellerdata/:user", function (req, res) {
    var user=req.url.split('/')[2];
    db.query("select * from  sellerregistration where username=?",[user], (err, result) => {
        if (err) {
            res.send({ message: err, });
        }
        else if (result.length > 0) {
            res.send({ submit: true, data: result });
        }
        else {
            res.send({ submit: false, });
        }
    });
});


router.delete("/deluser/:delid", function (req, res) {
    let id = req.params.delid;
    db.query("delete  from sellerregistration where usercode=?", [id], (err, res3) => {
        if (err) {
            res.send({ message: err });
        }
        else {
            res.send({ submit: true, message: "deleted successfull" });

        }
    });
});

router.put("/update/:upid", function (req, res) {
    let id = req.params.upid;
    let name = req.body.name;
    let email = req.body.email;
    let username = req.body.username;
    let password = req.body.password;
    let phoneno = req.body.phoneno;
    let street = req.body.street;
    let village = req.body.village;
    let mandal = req.body.mandal;
    let District = req.body.District;
    let state = req.body.state;
    let zipcode = req.body.zipcode;
    let gender = req.body.gender;
    db.query("update  sellerregistration set name=?,email=?,username=?,password=?,phoneno=?,street=?,village=?,mandal=?,District=?,state=?,zipcode=?,gender=? where usercode=?", [name, email, username, password, phoneno, street, village, mandal, District, state, zipcode, gender, id], (err, result3) => {
        if (err) {
            res.send({ message: err });
        }
        else {
            res.send({ submit: true });
        }
    });
});



router.put("/uprate/:fid", function (req, res) {
    const { fat, snf1, snf2, snf3, snf4 } = req.body;
    const id2 = req.params.fid;
    const query = `UPDATE ratechart SET  \`8.70\`=?, \`8.80\`=?, \`8.90\`=?, \`9.00\`=? WHERE fat=?`;
    const values = [snf1, snf2, snf3, snf4, id2];

    db.query(query, values, (err, result) => {
        if (err) {
            res.send({ message: err });
            console.log(err);
        } else {
            res.send({ submit: true });
        }
    });
});


router.post("/ratecharts", function (req, res) {
    const { fat, snf1, snf2, snf3, snf4 } = req.body;
    const query = `INSERT INTO ratechart (fat, \`8.70\`, \`8.80\`, \`8.90\`, \`9.00\`)
                   VALUES (${fat}, ${snf1}, ${snf2}, ${snf3}, ${snf4})`;
    db.query(query, (err, result) => {
        if (err) {
            res.send({ message: err });
            console.log(err);
        }
        else {
            res.send({ submit: true, });
        }

    });
});

router.post("/milkcollect", (req, res) => {
    const { usercode, date,timings,milktype, fat, snf, quantity ,username} = req.body;
    console.log(usercode, fat, snf, quantity,timings,milktype);
    //fetch ratechart information 
    const ratechartquery = 'select  *  from ratechart where fat =? ';
    db.query(ratechartquery, [fat], (err, results3) => {
        if (err) {
            console.error(err);
        }
        else{
            if(results3.length===0){
                res.status(400).send('Error retrieving rate chart data');

            }
            else{
                const { '8.70': r870, '8.80': r880, '8.90': r890, '9.00': r900 } = results3[0];
                let price = null;
                if (snf >= 8.70 && snf < 8.80) {
                  price = r870;
                } else if (snf >= 8.80 && snf < 8.90) {
                  price = r880;
                } else if (snf >= 8.90 && snf < 9.00) {
                  price = r890;
                } else if (snf >= 9.00) {
                  price = r900;
                }
                if(price===null){
                    res.status(400).send("invalid snf value");
                }
                else{
                    const Amount=quantity*price;
                    db.query("insert into milkcollection (usercode,date,timings,milktype,fat,snf,quantity,price,Amount,username) values(?,?,?,?,?,?,?,?,?,?)", [usercode, date,timings,milktype, fat, snf, quantity, price,Amount,username], (err, res1) => {
                        if (err) {
                            res.send({ message: err });
                            console.log(err);
                        }
                        else {
                            res.send({ submit: true, });
                            console.log(res1);
                        }
                    })
                }
            }
        }
      
       
    })

});

router.get("/getmilk/:uname", function (req, res) {
    var u=req.url.split('/')[2];
    db.query("select * from milkcollection where username = ?",[u], (err, res9) => {
        if (err) {
            res.send({ message: err });
        }
        else if (res9.length > 0) {
            res.send({ submit: true, milkdata: res9 });
        }
        else {
            res.send({ submit: false });
        }
    })
});


router.post("/genbill/:user",function(req,res){
    const  {usercode,date1,date2}=req.body;
    const user=req.url.split('/')[2];
    db.query("select m.usercode,s.Name,sum(m.quantity) as Liters,sum(Distinct m.amount) as Totalamount  from milkcollection m join sellerregistration s on m.usercode=s.usercode where m.username=? and date>=? and date<=? and m.usercode=?  ",[user,date1,date2,usercode],(err,result5)=>{
        if(err){
            res.send({message:err});
        }
        else{
               db.query("select sum(amount) from payments where  username=? and usercode=? and date>=? and date<=?",[user,usercode,date1,date2],(err,result6)=>{
                if(err) throw err;
                else {
                    const balance=result5[0]["Totalamount"]-result6[0]["sum(amount)"];
                     console.log(balance);
                     if(balance>0){
                        res.send({submit:true,bill:result5,bal:balance});
                     }
                     else{
                        const balance=0;
                        res.send({submit:true,bill:result5,bal:balance});
                        console.log(balance);
                     }
                   
                }
               })
        }
       
    })

});
router.post("/payment/:uid",function(req,res){
    const {usercode,date,Amount}=req.body;
    console.log(usercode,date,Amount);
    const k=req.url.split('/')[2];
    db.query("select sum(Distinct Amount) as Amount from milkcollection where usercode=? and username=?",[usercode,k],(err,resu3)=>{
        if(err) throw err;
        else if(resu3.length==0){
            res.send({submit:false,})
        }
        else{
            const bill=resu3[0]["Amount"];
            db.query("insert into payments (usercode,date,amount,username) values (?,?,?,?)",[usercode,date,Amount,k],(err,result32)=>{
                        if(err) throw err;
                        else{
                            res.send({submit:true,});
                        }
                    })
            

        }
    })
})

router.post("/contact",function(req,res){
  db.query("insert into enquired set?",req.body,(err,res8)=>{
    if (err) throw err;
    else{
        res.send({submit:true,});
    }
  });
});
router.post("/getpayments/:user",function(req,res){
    const usercode=req.body["searchvalue"];
    console.log(usercode);
    var username=req.url.split('/')[2];
    console.log(username);
    db.query("select * from payments where usercode=? and username=? ",[usercode,username],(err,results)=>{
        if(err) throw err;
        else if(results.length==0){
            res.send({submit:false,message:"No data found"});
        }
        else{
            res.send({submit:true,resultset:results,});
            
        }
    })
})
router.post("/adminprofile/:id",function(req,res){
    const {name,username,password,chpass}=req.body;
    console.log(name,username,password,chpass);
    var usercode=req.url.split('/')[2];
    db.query("update admin  set name=?,password=? where username=? and password=?",[name,chpass,usercode,password],(err,results2)=>{
        if(err) throw err;
        else if(results2.length==0){
            res.send({submit:false,message:"No data found"});
        }
        else{
           
            res.send({submit:true,name});
        }
    })
})
router.get("/getdetails",function(req,res){
    db.query("select * from enquired",(err,results4)=>{
        if (err) throw err;
        else if(results4.length>0){
            res.send({submit:true,details:results4});
        }
        else{
            res.send({submit:false,});
        }
    });
});
router.post("/getinfo",function(req,res){
    const {name,usercode,password,chpass}=req.body;
    console.log(name,usercode,password,chpass);
    db.query("update sellerregistration  set name=?,password=? where usercode=? and password=?",[name,chpass,usercode,password],(err,results2)=>{
        if(err) throw err;
        else if(results2.length==0){
            res.send({submit:false,message:"No data found"});
        }
        else{
           
            res.send({submit:true,name});
        }
    })
});
router.get("/getall/:id",function(req,res){
    const usercode=req.url.split('/')[2];
     db.query("select count(*),sum(amount),sum(quantity) from milkcollection where usercode=? ",[usercode],(err,result13)=>{
           if(err) throw err;
            else{
                db.query("select sum(amount) from payments where usercode=?",[usercode],(err,result14)=>{
                    if (err) throw err;
                    else {
                        const rm=result13[0]['sum(amount)']-result14[0]['sum(amount)'];
                        res.send({submit:true,
                            days:result13[0]['count(*)'],
                            amount:result14[0]['sum(amount)'],
                            remain:rm,
                            liters:result13[0]['sum(quantity)']

                        })
                    } 
                })
            }
     });
});
router.get("/getvalues/:id",function(req,res){
    const username=req.url.split('/')[2];
    db.query("select count(*) from sellerregistration where username=? ",[username],(err,res1)=>{
        if(err){
            res.send({message:err});
        }
        else{
                db.query("select sum(Amount) from milkcollection where username=?",[username],(err,res2)=>{
                    if(err){
                        res.send({message:err});
                    }
                    else{
                        db.query("select sum(quantity) from milkcollection where username=?",[username],(err,res3)=>{
                            if(err){
                                res.send({message:err});
                            }
                            else{
                                db.query("select max(price) from milkcollection where username=?",[username],(err,res4)=>{
                                    if(err){
                                        res.send({message:err});
                                    }
                                    else{
                                        res.send({submit:true,
                                            nousers:res1,
                                            amount:res2,
                                            totalmilk:res3,
                                            milkprice:res4,
                                        });
                                    }
                                });
                            }
                        });
                    }
                });
        }
    });
});
router.get('/checkucode',(req,res)=>{
    
    
    
    var uname=req.query['uname'];
    var ucode=req.query['ucode'];
    console.log(uname,ucode,'hii');
    db.query("select count(*) from sellerregistration where usercode = ? and username = ?",[ucode,uname],(err,result)=>{
        if(err){res.json({err:err});}
        else{
            res.json({result:result});
        }
    });


});

module.exports = router;