var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ActivitySchema = require('./activity');

// User Schema
let UserSchema = new mongoose.Schema ({
username: {
    type: String,
    required: [true, "A user must have a username."]
},
activities: [ActivitySchema]
});

const User = mongoose.model("USER", UserSchema);

module.exports = UserSchema;