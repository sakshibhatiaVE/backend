const express = require('express')
const app = express()
const createworkorderRoute = express.Router()

// Announcement model
let Createworkorder = require('../models/Createworkorder')

// Add Announcement
createworkorderRoute.route('/createworkorder').post((req, res, next) => {
    let moduleData = {
        user_id : req.body.id,
        common_data : req.body.common_data,
        tags_main_catagory : req.body.tags_main_catagory,
        resource_main_catagory : req.body.resource_main_catagory,
      }
Createworkorder.create(moduleData, (error, data) => {
    if (error) {
      return next(error)
    } else {
      console.log("Add create work order", data);
      res.json(data)
    }
  })
})



module.exports = createworkorderRoute
