const mongoose = require("mongoose");
var Schema = mongoose.Schema;
const ActivitySchema = require("./activityModel").schema;

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    minlength: 5
  }, 
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    minlength: 7
  },
  activities: {
    type: [ActivitySchema],
    required: true
  },
  accountCreated: {
    type: Date,
    required: true,
    default: new Date()
  },
  lastSeen: {
    type: Date,
    required: true,
    default: new Date()
  },
  verified: {
    type: Boolean,
    required: true,
    default: false
  }
});

module.exports = User = mongoose.model("user", userSchema);