const express = require("express");
const router = express.Router();
var mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const shortid = require("shortid");

const multer  = require('multer')
const picPath = require("path");

const Avatar = require("../models/Avatar");
const UpdateAvatar = require("../models/UpdateAvatar");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, picPath.join(picPath.dirname(__dirname), "public"));
  },
  filename: function (req, file, cb) {
    cb(null, shortid.generate() + "-" + file.originalname);
  },
});

const upload = multer({ storage });



router.post("/login",(req,res) =>{
    console.log(req.body);
    const {email,password} = req.body; 
    User.findOne({email:email})
         .exec(async(err,data)=>{


            if(err){
                console.log("------------------------")
                return res.status(201).json({msg:"Something went wrong"});
            }
            if(data){
                console.log(data.email)
                console.log(data.password)
                // const checkPassword = await data.authenticate(password);
                if(data.password===password){
                    const token = jwt.sign({_id:data._id},process.env.port,{expiresIn:"1d"})
                    res.cookie("token",token,{expiresIn:"1d"})
                    const {_id,email} = data;
                    const userDetail = {token,user:{_id,email}};
                    return res.status(200).json(userDetail);
                }
                else{
                    res.status(400).json({status:400,data:null,message:"Passowrd is not correct"});
                    // res.status(400).json({msg:"Passowrd is not correct"});
                      // throw new Error("Passowrd is not correct");
                   }
            }else{
            //    return responseError(res,201,10);
            // return res.status(201).json({msg: "error msg in login rsatya"});
            res.status(400).json({status:400,data:null,message:"User not registered in system."});
            }
         })
})
router.get("/getProfileDetails/:id,",(req,res) =>{ 
    const userId = req.params.id; 
    User.findOne({_id:userId},(err,data)=>{
        if(err){
            return res.status(201).json({msg:"Something went wrong"});
        }
        if(data){
            return res.status(200).json(data);
        }
    })
         
})


router.post("/updateProfileDetails",(req,res) =>{ 
    
  const{name, fname,lname,address,city,country,postalcode,about} = req.body; 
    const {userId} = req.body; 
    User.updateMany({_id:userId}, { $set: { name,fname,lname,address,city,country,postalcode,about} },(err,data)=>{
        if(err){
            return res.status(201).json({msg:"Something went wrong"});
        }
        if(data){
            return res.status(200).json(data);
        }
    })
         
})

router.post("/reg",(req,res)=>{
    const {name,username,fname,lname,postalcode,city,about,country,address,email,password} = req.body;
    const userData = User({
      email,password,fname,lname,name,city,username,postalcode,about,address,country
 })
 userData.save((err,data)=>{
 if(err){
 return res.status(201).json({msg:"Something went wrong"});
 }
 if(data){
 return res.status(200).json(data)}
 })
 })


 router.post("/uploadAvatar",upload.single('csvFile'),(req,res)=>{
    const host = "http://localhost:4000/public/"
    const fileData = host+req.file.filename;


    const avatarData = Avatar({
        avatarName:fileData
    })
    console.log('storage location is',req.file.path);
    avatarData.save((err,data)=>{
        if(err){
            return res.status(201).json({"msg":"Smething went wrong"});
        }
        if(data){
            return res.status(200).json(data);
        }
    })

});

router.post("/uploadUpdateAvatar",upload.single('csvFile'),(req,res)=>{
    // console.log(req.body)
    const host = "http://localhost:4000/public/"
    const fileData = host+req.file.filename;
    const id= req.body.id;
      console.log(id)
      console.log(fileData)
    // console.log('storage location is',req.file.path);
    UpdateAvatar.updateMany({updateId:id},{$set:{updatAvatarName:fileData}},(err,data)=>{
        if(err){
            return res.status(201).json({"msg":"Smething went wrong"});
        }
        if(data){
            return res.status(200).json(data);
        }
    })

});

router.get("/getAvatar",(req,res)=>{
    Avatar.find({},(err,data)=>{
        if(err){
            return res.status(201).json({"msg":"Something went wrong"})
        }
        if(data){
            return res.status(200).json(data);
        }
    })
})

router.post("/updateAvatar",(req,res)=>{
    const id = req.body.id;
    const name=req.body.name;
    console.log(req.body)
    UpdateAvatar.findOne({updateId:id},(err,data)=>{
        if(err){
            return res.status(201).json("Something went wrong");
        }
        if(!data){
            console.log(data+"!!");
            const saveData=UpdateAvatar({
                updateId:id,
                updatAvatarName:name
            })
            saveData.save((errData,saveData)=>{
                
            })
        }
        if(data){
            console.log(data);
             UpdateAvatar.updateMany({updateId:id},{$set:{updatAvatarName:name}},(err,data)=>{
        if(err){
            console.log(err)
        }
        if(data){
            console.log(data);
            return res.status(200).json(data);
        }
    })
        }
    })
   
})


router.post("/getUpdateAvatar",(req,res)=>{
    const id = req.body.id;
    UpdateAvatar.findOne({updateId:id},(err,data)=>{
        if(err){
            return res.status(201).json("Something went wrong");
        }
        if(data){
            return res.status(200).json(data);
        }
    })
})
router.post("/deleteAvatar",(req,res)=>{
    const id = req.body.id;
    console.log(id)
    Avatar.remove({_id:id},(err,data)=>{
        if(err){
            return res.status(201).json("Something went wrong");
        }
        if(data){
            return res.status(200).json(data);
        }
    })
})

module.exports = router;