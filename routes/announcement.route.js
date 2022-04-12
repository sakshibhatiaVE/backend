const express = require('express')
const app = express()
const announcementRoute = express.Router()

// Employee model
let Announcement = require('../models/Announcement')

// Add Employee
announcementRoute.route('/create2').post((req, res, next) => {
    Announcement.create(req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get All Employees
announcementRoute.route('/').get((req, res) => {
    Announcement.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get single employee
announcementRoute.route('/read2/:id').get((req, res) => {
    Announcement.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Update employee
announcementRoute.route('/update2/:id').put((req, res, next) => {
    Announcement.findByIdAndUpdate(
    req.params.id,
    {
      $set: req.body,
    },
    (error, data) => {
      if (error) {
        return next(error)
        console.log(error)
      } else {
        res.json(data)
        console.log('Data updated successfully')
      }
    },
  )
})

// Delete employee
announcementRoute.route('/delete2/:id').delete((req, res, next) => {
    Announcement.findOneAndRemove(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.status(200).json({
        msg: data,
      })
    }
  })
})

module.exports = announcementRoute
