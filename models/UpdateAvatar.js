const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const updatAvatarSchema = new mongoose.Schema({
    updateId:{
      type:String
    },
    updatAvatarName: {
      type: String
   },  

},{timestamps:true})


module.exports = mongoose.model("updatAvatar",updatAvatarSchema);