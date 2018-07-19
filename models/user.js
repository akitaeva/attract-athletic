// models/user.js
const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  username: {type: String, unique: true, required: [true, "can't be blank"]},
  password: {type: String},
  role: {type: String, default: "user"},
  email: {type: String, required: true},
  phoneNumber: {type: String, unique: true},
  activity: [{type: Schema.Types.ObjectId, ref: 'Activity', default: "all"}],
  attending: [{type: Schema.Types.ObjectId, ref: 'Event'}]

}, 
{
  usePushEach: true
}, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

const User = mongoose.model("User", userSchema);

module.exports = User;



