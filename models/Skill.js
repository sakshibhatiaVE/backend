const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let Skill = new Schema({
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
   collection: 'skills'
})

module.exports = mongoose.model('Skill', Skill)