const express = require("express");
const actRoutes = express.Router();
const Activity = require("../models/activity");
const User = require("../models/user");
const cloudinary = require('cloudinary');
// const multer = require('multer');
const uploadCloud = require('../config/cloudinary');

//show sign-up form 
actRoutes.get("/activities/create", (req, res, next) => {
    res.render("activities/addNewActivity");
  });

actRoutes.post("/activities/create", uploadCloud.array('pic', 3), (req, res, next) => { 
    console.log(req.files);
    const newActivity = new Activity ({
    name:         req.body.name,
    description:  req.body.description,
    about:        req.body.about,
    funFact:      req.body.funFact,
    image:        []
  })

  const pics = req.files;
  pics.forEach(eachPic =>{
      console.log("the info for each image:", eachPic);
      newActivity.image.push(eachPic.url);
  })

 newActivity.save()
  .then(()=>{
      res.redirect('/activities')
  })
  .catch((err)=>{
      next(err);
  }) 
});

actRoutes.get("/activities", (req, res, next)=>{
    Activity.find()
    .then((allActivities)=>{
        let isAdmin = false;
        if(req.user){
        User.findById(req.user._id)
        .then(foundUser => {
            if(foundUser.role === 'admin'){
                isAdmin = true
            }
            res.render('activities/allActivities',  {allActivities, isAdmin});
        })
        .catch( err => next(err)) 
    } else {
       res.render("activities/allActivities", {allActivities})
    }
    })
    .catch((err)=>{
        next(err);
    })
  
});

//handling editing an activity info
actRoutes.get('/activities/:activityId/edit', (req, res, next)=>{
    Activity.findById(req.params.activityId)
    .then((theActivity)=>{
        res.render('activities/editActivity', {theActivity: theActivity})
    })
    .catch((err)=>{
        next(err);
    })
 })  

//saving an activity profile
actRoutes.post('/activities/:activityId/update', uploadCloud.array('updPic', 3), (req, res, next)=>{
    Activity.findById(req.params.activityId)
    .then((theActivity)=>{
        theActivity.name = req.body.updName,    
        theActivity.description = req.body.updDescription,
        theActivity.about =req.body.updAbout,
        theActivity.funFact =  req.body.updFunFact,
        req.files.forEach(eachPic =>{
          theActivity.image.push(eachPic.url);
          theActivity.save()
          .then( () => {
              res.redirect('/activities/'+ theActivity._id);
          })
          .catch( err=>next(err));
          })  
    })
    .catch(err=>next(err));
});

actRoutes.post('/activities/:activityId/delete', (req, res, next)=>{
    const id = req.params.activityId;
      Activity.findByIdAndRemove(id)
      .then(() =>{
          res.redirect('/activities');
      })
      .catch( err => console.log("Error while deleting the activity type", err))
  }); 

actRoutes.get('/activities/:activityId', (req, res, next) => {
    const id = req.params.activityId;
    Activity.findById(id)
    .then((theActivity)=>{
        let isAdmin = false;
        if(req.user){
        User.findById(req.user._id)
        .then(foundUser => {
            if(foundUser.role === 'admin'){
                isAdmin = true
            }
            res.render('activities/activityDetails',  {theActivity: theActivity, isAdmin});
        } )
        .catch( err => next(err)) 
    } else {
        res.render('activities/activityDetails',  {theActivity: theActivity});
    }
    })
    .catch((err)=>{
       next(err); 
    })
});

module.exports = actRoutes;