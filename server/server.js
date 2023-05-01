

const express = require('express')
const app=express()
const mongoose = require('mongoose')
const data = require('./data')
fs = require('fs')
url = require('url');

var bodyParser = require('body-parser'); 
var multer = require('multer')
const { stringify } = require('querystring')
var multParse = multer()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/',(rq,res,next)=>{
    res.send(JSON.parse(data))
})

app.get("/api",(req,res) => {
    res.json(data)
    console.log('sample');
})

app.post("/check", multParse.none(),(req,res) => {
    console.log(req.body);
    let name = req.body.name
    let password = req.body.password

    console.log(JSON.parse(data));
    JSON.parse(data).forEach(e=>{
        console.log(e.uname,name);
        if(e.uname == name && e.password == password){
            return res.json({'auth':true,'name':name,'password':password})
        }
    })
    return res.json({'auth':false})
    
})

app.post("/userdetail", multParse.none(),(req,res) => {
    console.log(req.body);
    let name = req.body.name
    let password = req.body.password

    JSON.parse(data).forEach(e=>{
        if(e.uname == name && e.password == password){
            return res.json(e)
        }
    })
    return res.json({'message':'no user found'})
    
})

app.get("/alluser",(req,res) => {
   
    let userdata=[]

    JSON.parse(data).forEach(e=>{
        userdata.push({
            'first_name':e.fname,
            'second_name':e.sname,
            'dob':e.dob,
            'user_name':e.uname,
            'role':e.role
        })
        
    })
    return res.json(userdata)
    
})


app.post('/resigter',multParse.none(), (req, res) => {

   

    let olddata = JSON.parse(data)
    let newarray = []
    let finalcontent = olddata.concat(newarray)
  
    let alreadytakenflag = false
    finalcontent.forEach(e=>{
        console.log(e.uname,req.body.u_name);
        if(e.uname.trim() == req.body.u_name.trim()){
            alreadytakenflag=true
        }
    })



    

   
    console.log(alreadytakenflag);
    if(alreadytakenflag == false){
        finalcontent.push({
            'fname':req.body.f_name,
            'sname':req.body.s_name,
            'dob':req.body.dob,
            'uname':req.body.u_name,
            'password':req.body.password,
            'role':req.body.role
        })

        fs.writeFile('./data.js', `const logindata= '${JSON.stringify(finalcontent)}' ;\n\n module.exports = logindata;`, (err) => {
            if (err) {
              console.error(err);
            } else {
              console.log('new user added successfully');
            }
          });
          res.json({msg:'sucessfully created'})
    }
    else{
        return  res.json({msg:'username already taken'})
    }


  });

app.listen(5000,()=>{console.log("Server started on port 5000")})