// routes/event-routes.js
const express     = require("express");
const eventRoutes = express.Router();
const passport    = require("passport");
const ensureLogin = require("connect-ensure-login");
const Event       = require("../models/event");
const Activity    = require("../models/activity");
const User        = require("../models/user");
const cloudinary = require('cloudinary');
const uploadCloud = require('../config/cloudinary');


eventRoutes.get('/events', (req, res, next) => {
 Event.find()
    .populate('activity', 'attendees')
    .then(events => {                             
       res.render('events/allEvents', {events: events});
    })
    .catch(err => console.log('Error getting events from DB', err));
  });

//show new event form 
eventRoutes.get("/events/create", (req, res, next) => {
    Activity.find()
    .then((allTheActivities)=>{
        res.render("events/addNewEvent", {allTheActivities});
    })
    .catch((err)=>{
        next(err);
    })
});

//save new event form 
eventRoutes.post("/events/create", (req, res, next) => {
    console.log('BODY: ', req.body) 
  const newEvent = new Event ({
    name:         req.body.name,
    activity:     req.body.activity,
    description:  req.body.description,
    location:     req.body.location,
    address:      req.body.address,
    startDate:    req.body.startDate,
    cost:         req.body.cost,
    images:       [],
    videos:       [],
    attendees:    [],
    comments:     []

  })

newEvent.save()
  .then(()=>{
      res.redirect('/events')
  })
  .catch((err)=>{
      next(err);
  }) 
});

//handling editing the event 
eventRoutes.get('/events/:eventId/edit', (req, res, next) => {
 Event.findById(req.params.eventId)
 .then((event)=>{
    Activity.find()
    .then((allTheActivities)=>{
       allTheActivities.forEach((activity)=>{
        if(activity._id.equals(event.actvity)){
            activity.yes = true;
        }
       })
       res.render('events/editEvent', {event: event, allTheActivities: allTheActivities})
    })
    .catch(err=>next(err));
 })
 .catch(err=>next(err));
});


//saving the updated event 
eventRoutes.post('/events/:eventId/update', uploadCloud.array('updPic', 5), (req, res, next) => {
    console.log("pleeeeeeaaaaase don't be undefined:", req.files)
    Event.findById(req.params.eventId)
    .then((theEvent)=>{
        theEvent.name        = req.body.updName,
        theEvent.activity    = req.body.updActivity,
        theEvent.description = req.body.updDescription,
        theEvent.location    = req.body.updLocation,
        theEvent.address     = req.body.updAddress,
        theEvent.startDate   = req.body.updStartDate
        theEvent.cost        = req.body.updCost,
        req.files.forEach(eachPic =>{
            console.log("the value for eachPic", eachPic);
            theEvent.images.push(eachPic.url);
            theEvent.save()
            .then(() => {
                res.redirect('/events/'+ theEvent._id);
            })
            .catch(err=>next(err));
        })
    })
    .catch(err=>next(err));
});       


//viewing the event details page
eventRoutes.get('/events/:eventId', (req, res, next) => {
    const eventId = req.params.eventId;
    Event.findById(eventId)
    .populate('activity')
    .populate('attendees')
    .then((event)=>{  
        console.log(' = = == = : ', event)
        res.render('events/eventDetails',  {event: event});
    })
    .catch((err)=>{
       next(err); 
    })

});   


module.exports = eventRoutes;