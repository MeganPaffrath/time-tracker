const mongoose = require("mongoose");

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
  }
});

module.exports = User = mongoose.model("user", userSchema);