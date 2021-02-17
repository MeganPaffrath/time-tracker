const mongoose = require("mongoose");

const logSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true
  }, 
  activity: {
    type: String,
    required: true
  },
  startTime: {
    type: Date,
    required: true
  }, 
  endTime: {
    type: Date,
    required: true
  }
});

module.exports = Log = mongoose.model("log", logSchema);