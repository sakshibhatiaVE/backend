const express = require('express')
const app = express()
const addcustomdashboardRoute = express.Router()

// Roll model
let Addcustomdashboard = require('../models/Addcustomdashboard')


// Add Selected customize section
addcustomdashboardRoute.route('/adddashcustom').post((req, res, next) => {
  console.log("req.body - addcustomdashboardRoute", req.body);
  // console.log("req.user", req);

  let moduleData = {
    user_id : req.body.id,
    modules : req.body.data
  }
  console.log("----------------------------",moduleData);
  // return false;
    Addcustomdashboard.create(moduleData, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})



// Get All Role
addcustomdashboardRoute.get('/getcustomsection',(req, res) => {
  Addcustomdashboard.find((error, data) => {
    if (error) {
      return res.status(201).json(error)
    } else {
      res.status(200).json(data)
    }
  })
})

// Get single setting value
addcustomdashboardRoute.route('/customsection/:id').get((req, res) => {
  
  Addcustomdashboard.findById(req.params.id, (error, data) => {
    console.log("customsection/:id", req.data);
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Update Custom Dashboard
addcustomdashboardRoute.route('/updatecustdashboard/:id').put((req, res, next) => {

  console.log("--------req.body--------------------",req.body);

  let moduleData = {
    user_id : req.body.id,
    modules : req.body.data
  }
  console.log("----------------------------",moduleData);
    Addcustomdashboard.findByIdAndUpdate(
      
    req.params.id,
    {
      $set: moduleData,
    },
    (error, data) => {
      if (error) {
        return next(error)
        console.log(error)
      } else {
        res.json(data)
        console.log("updatecustdashboard/:id", req.data);
        console.log('Data updated successfully')
      }
    },
  )
})

// Update role
// addcustomdashboardRoute.route('/update1/:id').put((req, res, next) => {
//     Role.findByIdAndUpdate(
//     req.params.id,
//     {
//       $set: req.body,
//     },
//     (error, data) => {
//       if (error) {
//         return next(error)
//         console.log(error)
//       } else {
//         res.json(data)
//         console.log('Data updated successfully')
//       }
//     },
//   )
// })

// Delete role
// addcustomdashboardRoute.route('/delete1/:id').delete((req, res, next) => {
//   console.log("req.params.id", req.params.id);

//     Role.findOneAndRemove({_id : req.params.id}, (error, data) => {
//     if (error) {
//       return next(error)
//     } else {
//       res.status(200).json({
//         msg: data,
//       })
//     }
//   })
// })

module.exports = addcustomdashboardRoute
