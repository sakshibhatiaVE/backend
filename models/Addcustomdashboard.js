const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let Addcustomdashboard = new Schema({
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
   modules:[{
      label: {
         type: String
      },
      img: {
         type: String
      }
   }  
   ],
   label: {
      type: String
   },
   img: {
      type: String
   }

}, 
{
   collection: 'addcustomdashboards'
})

module.exports = mongoose.model('Addcustomdashboard', Addcustomdashboard)