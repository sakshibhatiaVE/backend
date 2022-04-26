const express = require("express");
const router = express.Router();
var mongoose = require('mongoose');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

router.post("/login",(req,res) =>{
    console.log(req.body);
    const {email,password} = req.body; 
    User.findOne({username:email})
         .exec(async(err,data)=>{


            if(err){
                console.log("------------------------")
                return res.status(201).json({msg:"Something went wrong"});
            }
            if(data){
                console.log("------------------------")
                const checkPassword = await data.authenticate(password);
                if(checkPassword){
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
router.post("/getProfileDetails",(req,res) =>{ 
    const {userId} = req.body; 
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
    User.updateMany({_id:userId}, { $set: { name,fname,lname,address,city,ountry,ostalcode,about} },(err,data)=>{
        if(err){
            return res.status(201).json({msg:"Something went wrong"});
        }
        if(data){
            return res.status(200).json(data);
        }
    })
         
})

module.exports = router;