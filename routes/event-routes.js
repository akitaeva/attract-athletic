// routes/event-routes.js
const express = require("express");
const eventRoutes = express.Router();

const passport = require("passport");
const ensureLogin = require("connect-ensure-login");
const Event = require("../models/event");
const Activity = require("../models/activity");
const User = require("../models/user");


module.exports = eventRoutes;