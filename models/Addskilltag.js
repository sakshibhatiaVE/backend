const mongoose = require("mongoose");
const tagSchema = new mongoose.Schema({
category: {
    name:{type:String},
    subCategory:{
    name:{type:Array},
    tags:{
    name:{type:Array}
    }

}
}
},{timestamps:true})

module.exports = mongoose.model("tagCategory",tagSchema);