const express = require("express");
const actRoutes = express.Router();
const Activity = require("../models/activity");

//show sign-up form 
actRoutes.get("/add-new-activity", (req, res, next) => {
    res.render("activities/addNewActivity");
  });

actRoutes.post("/add-new-activity", (req, res, next) => { 
  const newActivity = new Activity ({
    name:         req.body.name,
    description:  req.body.description,
    about:        req.body.about,
    funFact:      req.body.funFact,

  })


 newActivity.save()
  .then((response)=>{
      res.redirect('/activities')
  })
  .catch((err)=>{
      next(err);
  }) 
});

actRoutes.get("/activities", (req, res, next)=>{
    Activity.find()
    .then((allActivities)=>{
        res.render("activities/allActivities", {allActivities})
    })
    .catch((err)=>{
        next(err);
    })
  
});

//handling editing an activity profile
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
actRoutes.post('/activities/:activityId/update', (req, res, next)=>{
    Activity.findByIdAndUpdate(req.params.activityId, {
        name: req.body.updName,
        description: req.body.updDescription,
        phoneNumber: req.body.updAbout,
        funFact: req.body.updFunFact
        
    })
    .then((theActivity)=>{
        res.redirect('/activities/'+ theActivity._id)
    })
    .catch((err)=>{
        next(err);
    })  
});


actRoutes.get('/activities/:activityId', (req, res, next) => {
    const id = req.params.activityId;
    Activity.findById(id)
    .then((theActivity)=>{    
        res.render('activities/activityDetails',  {theActivity: theActivity});
    })
    .catch((err)=>{
       next(err); 
    })
});

module.exports = actRoutes;