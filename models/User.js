const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema({
    name: {
      type: String
   },
   email: {
      type: String
   },
   username: {
      type: String
   },
   password: {
      type: String
   },
   fname: {
      type: String
   },
   lname: {
      type: String
   },
   address: {
      type: String
   },
   city: {
      type: String
   },
   country: {
      type: String
   },
   postalcode: {
      type: Number
   },
   about: {
      type: String
   }

},{timestamps:true})



// userSchema.virtual("fullname").get(()=>{
// return(`${this.fname} ${this.lname}`);
// });

// userSchema.methods = {
//    authenticate : async function(password){
//        return await bcrypt.compare(password,this.hashPassword);
//    }
//    userSchema.methods = {
//       authenticate : async function(password){
//          //  return await bcrypt.compare(password,this.hashPassword);
//          if(password===this.password){
//             return true;
//          }
//       }
// }

module.exports = mongoose.model("user",userSchema);