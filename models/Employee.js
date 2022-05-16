const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let Employee = new Schema({
   fname: {
      type: String
   },
   lname: {
      type: String
   },
   email: {
      type: String
   },
   phoneno: {
      type: Number
   },
   compname: {
      type: String
   },
   position: {
      type: String
   },
   uname: {
      type: String
   },
   password: {
      type: String
   },
   note: {
      type: String
   },
   sfee: {
      type: Number
   },
   userroles: {
      type: String
   },
   skill: {
      type: String
   }
   // name: {
   //    type: String
   // },
   // email: {
   //    type: String
   // },
   // fname: {
   //    type: String
   // },
   // lname: {
   //    type: String
   // },
   // address: {
   //    type: String
   // },
   // city: {
   //    type: String
   // },
   // country: {
   //    type: String
   // },
   // postalcode: {
   //    type: Number
   // },
   // about: {
   //    type: String
   // }
}, 
{
   collection: 'employees'
})

module.exports = mongoose.model('Employee', Employee)