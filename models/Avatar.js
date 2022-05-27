const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const avatarSchema = new mongoose.Schema({
    avatarName: {
      type: String
   },  

},{timestamps:true})


module.exports = mongoose.model("avatar",avatarSchema);