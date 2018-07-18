const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const eventSchema = new Schema({
    name:         {type: String, required: true},
    activity:     {type: Schema.Types.ObjectId, ref: 'Activity'},
    location:     {type: String, required: true},
    address:      {type: String, required: true},
    startDate:    {type: Date, required: true},
    cost:         {type: Number, default: 0},
    upcoming:     {type: Boolean, default: true},
    images:       [{type: String}],
    attendees:    [{type: Schema.Types.ObjectId, ref: 'User'}],
    comments:     [{type: String}]

}, {
  timestamps: true
});

const Event = mongoose.model("Event", eventSchema);

module.exports = Event;

