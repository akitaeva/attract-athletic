const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const activitySchema = new Schema({
    name:         {type: String, required: true},
    description:  {type: String, required: true},
    about:        {type: String},
    image:        [{type: String}],
    funFact:      {type: String},

}, {
    timestamps: true
  });

  const Activity = mongoose.model("Activity", activitySchema);

  module.exports = Activity;