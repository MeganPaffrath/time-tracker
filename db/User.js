// SCHEMAS -------------------------------------------------------------------
// Time DB Schema
const timeRangeSchema = new mongoose.Schema ({
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

const TimeRange = mongoose.model("TIMERANGE", timeRangeSchema);

// Activity Schema
const activitySchema = new mongoose.Schema ({
name: {
    type: String,
    required: [true, "An activity must have a name"]
},
times: [timeRangeSchema]
});

const Activity = mongoose.model("ACTIVITY", activitySchema);

// User Schema
let UserSchema = new mongoose.Schema ({
username: {
    type: String,
    required: [true, "A user must have a username."]
},
activities: [activitySchema]
});

export const User = mongoose.model("USER", userSchema);