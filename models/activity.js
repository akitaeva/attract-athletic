const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const activitySchema = new Schema({
    name:         {type: String, required: true, unique: true},
    description:  {type: String, required: true},
    about:        {type: String},
    image:        [{type: String}],
    funFact:      {type: String},

    }, 
    {
        usePushEach: true
    },
    {
        qtimestamps: true
  });

  const Activity = mongoose.model("Activity", activitySchema);

  module.exports = Activity;