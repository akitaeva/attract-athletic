// models/user.js
const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  username: {type: String, unique: true, required: [true, "can't be blank"]},
  password: {type: String},
  role: {type: String, default: "user"},
  email: {type: String, required: true},
  phoneNumber: {type: String},
  activity: [{type: Schema.Types.ObjectId, ref: 'activity', default: "all"}],
  attending: [{type: Schema.Types.ObjectId, ref: 'event'}]

}, {
  timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

const User = mongoose.model("User", userSchema);

module.exports = User;



