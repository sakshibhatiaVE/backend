const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let Announcement = new Schema({
    addannouncement: {
      type: String
   },
   addnnouncementbegin: {
      type: Date
   },
   addannouncementend: {
      type: Date
   }
}, 
{
   collection: 'announcements'
})

module.exports = mongoose.model('Announcement', Announcement)