var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Activity Schema
const ActivitySchema = new mongoose.Schema ({
    activity: {
        type: String,
        required: [true, "An activity must have a name"]
    }
});

module.exports = Activity = mongoose.model("activity", ActivitySchema);