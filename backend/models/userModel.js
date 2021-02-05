const mongoose = require("mongoose");
var Schema = mongoose.Schema;
const ActivitySchema = require("./activityModel").schema;

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
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
  }
});

module.exports = User = mongoose.model("user", userSchema);