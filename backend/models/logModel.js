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
  date: {
    type: Date,
    required: true
  }, 
  minutes: {
    type: Number,
    required: true,
    min: 1
  }
});

module.exports = Log = mongoose.model("log", logSchema);