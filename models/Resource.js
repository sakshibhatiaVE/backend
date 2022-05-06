const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let Resource = new Schema({
//     catagoryname: {
//       type: String
//    },
//    subcatagoryname: {
//     type: String
//  }
      name: {type: String
      }, 
      quantities      : [{
         qty :  {
            type: String
         }
     }]
}, 
{
   collection: 'resources'
})

module.exports = mongoose.model('Resource', Resource)