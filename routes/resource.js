const express = require('express')
const app = express()
const resourceRoute = express.Router()
const Resource = require("../models/Resource");

// Skill model
// let Skill = require('../models/Skill')

// Add Skill catagory and sub-catagory
resourceRoute.route('/createresource').post((req, res, next) => {
    console.log(req.body.name);
    console.log(req.body.quantities);
    const resourceData = Resource({
        name:req.body.name,
        quantities:req.body.quantities
    })
    resourceData.save((error, data) => {
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
resourceRoute.post("/addTags", (req, res) => {
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
  resourceRoute.route('/getCategoryTags/:id').get((req, res) => {
    // const {categoryId} = req.body;
    // Skill.findOne({_id:categoryId},(err,data)=>{
      Resource.findById(req.params.id, (err, data) => {
        if(err){
            return res.status(201).json({msg:"Something went wrong"});
        }
        if(data){
            return res.status(200).json(data.quantities);
        }
    })
    
})

// Get All Skills
resourceRoute.route('/getresource').get((req, res) => {
    // const skillData = Skill({
    //     name:res.body.name,
    //     quantities:res.body.quantities
    // })
    Resource.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get single Skill
resourceRoute.route('/read4/:id').get((req, res) => {
  Resource.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Update Skill
resourceRoute.route('/update4/:id').put((req, res, next) => {
    console.log(req.body)
    req.body.forEach((qt,index)=>{
    console.log(index);
    Resource.findByIdAndUpdate(
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
resourceRoute.route('/delete/:id').delete((req, res, next) => {
  Resource.findOneAndRemove({_id : req.params.id}, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.status(200).json({
        msg: data,
      })
    }
  })
})

module.exports = resourceRoute
