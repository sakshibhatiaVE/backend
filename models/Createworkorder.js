const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let Createworkorder = new Schema({
   //  cust_0: {
   //    type: String
   // },
   // cust_1: {
   //    type: String
   // },
   // cust_2: {
   //    type: String
   // }
   user_id:{
    // type: Schema.Types.ObjectId,
    // ref: "users"
    type: String
 },
   common_data:{
       type: Array
 },
 tags_main_catagory:{
    type: Array
 },
 resource_main_catagory:[{
      name: {
         type: String
      },
      qty: {
        type: String
     }
   }  
   ],

}, 
{
   collection: 'createworkorders'
})

module.exports = mongoose.model('Createworkorder', Createworkorder)