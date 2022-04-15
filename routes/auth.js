const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.post("/login",(req,res) =>{
    const {username,password} = req.body;
    console.log(req.body);
    User.findOne({user:username})
        .exec(async(err,data)=>{

            if(err){
                return res.status(201).json({"Msg":"Something went wrong"});
            }
            if(data){
                const checkPassword = password
                if(checkPassword){
                  
                   const {_id,user} = data;
                   const userDetail = {userData:{_id,user}};
                   return res.status(200).json(userDetail);
                }
            }else{
              return responseError(res,201,10);
            }
        })
})

module.exports = router;