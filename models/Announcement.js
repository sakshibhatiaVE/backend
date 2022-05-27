const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let Announcement = new Schema({
    addannouncement: {
      type: String
   },
   addannouncementbegin: {
      type: String
   },
   addannouncementend: {
      type: String
   },
   userpriority: {
      type: String
   },
   usertimezone: {
      type: String
   }
}, 
{
   collection: 'announcements'
})

module.exports = mongoose.model('Announcement', Announcement)