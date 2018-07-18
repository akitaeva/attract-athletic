// routes/event-routes.js
const express = require("express");
const eventRoutes = express.Router();

const passport = require("passport");
const ensureLogin = require("connect-ensure-login");
const Event = require("../models/event");
const Activity = require("../models/activity");
const User = require("../models/user");

//show new event form 
actRoutes.get("/add-new-event", (req, res, next) => {
    res.render("events/addNewEvent");
  });

//save new event form 
actRoutes.post("/add-new-new", (req, res, next) => { 
  const newEvent = new Event ({
    name:         req.body.name,
    activity:     req.body.activity,
    location:     req.body.location,
    address:      req.body.address,
    startDate:    req.body.startDate,
    cost:         req.body.cost,
  })

newEvent.save()
  .then((response)=>{
      res.redirect('/events')
  })
  .catch((err)=>{
      next(err);
  }) 
});


module.exports = eventRoutes;