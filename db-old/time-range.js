var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const TimeRangeSchema = new mongoose.Schema ({
    start: {
        type: Date,
        require: [true, "A timeRange must have a start time"]
    },
    end: {
        type: Date,
        require: [true, "A timeRange must have a end time"]
    },
    minutes: {
        type: Number,
        require: [true, "A time range must have a calculated total of minutes"]
    }
});
    
const TimeRange = mongoose.model("TIMERANGE", TimeRangeSchema);

module.exports = TimeRangeSchema;