const express = require('express')
const app = express()
const skillRoute = express.Router()
const Skill = require("../models/Skill");
const Tags = require("../models/Addskilltag");

// Skill model
// let Skill = require('../models/Skill')

// Add Skill catagory and sub-catagory
skillRoute.route('/createskill').post((req, res, next) => {
    console.log(req.body.name);
    console.log(req.body.quantities);
    const skillData = Skill({
        name:req.body.name,
        quantities:req.body.quantities
    })
    skillData.save((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Add Skill catagory, sub-catagory and tag
// skillRoute.route('/createskilltag').post((req, res, next) => {
//     console.log(req.body.name);
//     console.log(req.body.quantities);
//     const skillData = Skill({
//         name:req.body.name,
//         quantities:req.body.quantities
//     })
//     skillData.save((error, data) => {
//     if (error) {
//       return next(error)
//     } else {
//       res.json(data)
//     }
//   })
// })


// Add Skill catagory, sub-catagory and tag
skillRoute.post("/addTags", (req, res) => {
  console.log("req.body", req.body);
  console.log(req.body.subCategoryName);
  const {
      categoryName,
      subCategoryName,
      tagsName
  } = req.body;

  console.log("categoryName", categoryName);
  const tag = new Tags({
      category: {
          name: categoryName,
          subCategory: {
              name: subCategoryName,
              tags: {
                  name: tagsName
              }
          }

      }
  });

  tag.save((err, data) => {
      if (err) {
          return res.status(201).json(err);
      }
      if (data) {
          return res.status(200).json(data);
      }
  })



})

// skillRoute.post("/getCategoryTags",(req,res) =>{
    skillRoute.route('/getCategoryTags/:id').get((req, res) => {
    // const {categoryId} = req.body;
    // Skill.findOne({_id:categoryId},(err,data)=>{
        Skill.findById(req.params.id, (err, data) => {
        if(err){
            return res.status(201).json({msg:"Something went wrong"});
        }
        if(data){
            return res.status(200).json(data.quantities);
        }
    })
    
})

// Get All Skills
skillRoute.route('/getskill').get((req, res) => {
    // const skillData = Skill({
    //     name:res.body.name,
    //     quantities:res.body.quantities
    // })
    Skill.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get single Skill
skillRoute.route('/read3/:id').get((req, res) => {
    Skill.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Update Skill
skillRoute.route('/update3/:id').put((req, res, next) => {



  console.log(req.body)
  req.body.forEach((qt,index)=>{
  console.log(index);
  Skill.findByIdAndUpdate(
  req.params.id,
  {
  $set:{ [`quantities.${index}.qty`]:qt},
  },
  (error, data) => {
  console.log(data)
  },
  )
  // return res.status(200).json({
  //   msg: data,
  // })
  })
  return res.status(200).json({
    msg: "Success",
  })
  })

// Delete Skill
skillRoute.route('/delete/:id').delete((req, res, next) => {
    Skill.findOneAndRemove({_id : req.params.id}, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.status(200).json({
        msg: data,
      })
    }
  })
})

module.exports = skillRoute