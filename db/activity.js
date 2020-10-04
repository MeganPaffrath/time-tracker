var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var TimeRangeSchema = require('./time-range');

// Activity Schema
const ActivitySchema = new mongoose.Schema ({
    name: {
        type: String,
        required: [true, "An activity must have a name"]
    },
    times: [TimeRangeSchema]
});
    
const Activity = mongoose.model("ACTIVITY", ActivitySchema);

module.exports = ActivitySchema;