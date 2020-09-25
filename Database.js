//jshint esversion:6
const timeCalculator = require(__dirname + "/TimeCalculator.js");

// For database
const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/timeTracker", { useNewUrlParser: true, useUnifiedTopology: true});

// Exports
// module.exports.newUser = newUser;


/*
{
  username: "someuser",
  activities: [
    {
      name: "guitar",
      times: []
    },
    {
      name: "code",
      times: []
    }
  ]
}, {
  username: "anotheruser",
  activities: []
}
*/

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
const userSchema = new mongoose.Schema ({
  username: {
    type: String,
    required: [true, "A user must have a username."]
  },
  activities: [activitySchema]
});

export const User = mongoose.model("USER", userSchema);

// export const mongooseMatchUser = mongoose.model('users', matchSchema);

// Functions -----------------------------------------------------------------
// Create a user
function newUser(newUsername) {
  const newUser = new User ({
      username: newUsername
  });

  newUser.save();
  console.log("Saved the user: " + newUser);
}
// newUser("meganpaffrath");

// Create a new activity
function newActivity(newAct) {
  const newActivity = new Activity ({
      name: newAct
  });

  return newActivity;
}

// Create new Activity for a user, and add to the user
function appendActivity(username, newAct) {
  const createdActivity = newActivity(newAct);
  User.updateOne( 
    {username: username}, 
    {$push: {activities: createdActivity}}, 
    function(err) {
      if (err) {
        console.log(err);
      } else {
        console.log("Successfully added activity: " + newAct);
      }
    }
  );
}
// appendActivity("meganpaffrath", "make tea");

// Remove Activity from user
function removeActivity(username, activityName) {
  User.updateOne( 
    {username: username}, 
    {$pull: {"activities": {"name": activityName}}}, 
    function(err) {
      if (err) {
        console.log(err);
      } else {
        console.log("Successfully remove activity: " + activityName);
      }
    }
  );
}

// removeActivity("meganpaffrath", "make tea");


// Create timeRange for unkown time range for a date
function createUnknownTimeLog(date, totalMinutes) {
  // Get Start and end times
  const startDate = new Date(date);
  const endDate = timeCalculator.getEndDateFromTime(date, totalMinutes);
  // console.log("Start: " + startDate + "\nEnd: " + String(endDate));

  // Create a timeRange
  const newTimeRange = new TimeRange({
    start: startDate,
    end: endDate,
    minutes: totalMinutes
  });

  return newTimeRange;
}

// Append timeRange to a user for an activity
function appendActivityTime(username, activityName, newRange) {
  console.log(username, activityName);
  console.log("Trying to add: " + newRange);
  User.updateOne(
    {username: username, "activities.name": activityName},
    { $push: { "activities.$.times": newRange}},
    function (err) {
      if (err) {
          console.log(err);
        } else {
          console.log("Successfully added time range: " + newRange);
        }
    }
  );
}
// appendActivityTime("meganpaffrath", "guitar", createUnknownTimeLog("2020-09-01", 63));



// Remove a time
function removeActivityTime(username, activityName, timeID) {
  User.updateOne(
    {username: username, "activities.name": activityName},
    { $pull: { "activities.$.times": {"_id": timeID}}},
    function (err) {
      if (err) {
          console.log(err);
        } else {
          console.log("Successfully removed ID: " + timeID);
        }
    }
  );
}

// removeActivityTime("meganpaffrath", "guitar", "5f6da620f978ba14ea1fad49");



// ---------------------------------------------------------------------------------------------------- Plans
/*
Implement:
- Basic db interactions
  - Insert Known time range
   - handle time zones for users ind differnt time zones
- sync schema to another file:
  - read from db to generate chart data
*/

// ---------------------------------------------------------------------------------------------------- Current State
// Current State:
// newUser("meganpaffrath");

// appendActivity("meganpaffrath", "guitar");

// appendActivityTime("meganpaffrath", "guitar", createUnknownTimeLog("2020-09-01", 63));
// appendActivityTime("meganpaffrath", "guitar", createUnknownTimeLog("2020-09-02", 73));
// appendActivityTime("meganpaffrath", "guitar", createUnknownTimeLog("2020-09-03", 64));
// appendActivityTime("meganpaffrath", "guitar", createUnknownTimeLog("2020-09-04", 63));
// appendActivityTime("meganpaffrath", "guitar", createUnknownTimeLog("2020-09-05", 67));
// appendActivityTime("meganpaffrath", "guitar", createUnknownTimeLog("2020-09-06", 62));
// appendActivityTime("meganpaffrath", "guitar", createUnknownTimeLog("2020-09-07", 60));
// appendActivityTime("meganpaffrath", "guitar", createUnknownTimeLog("2020-09-08", 61));
// appendActivityTime("meganpaffrath", "guitar", createUnknownTimeLog("2020-09-09", 66));
// appendActivityTime("meganpaffrath", "guitar", createUnknownTimeLog("2020-09-10", 60));


// Full reset:
// db.users.remove({})

// Pretty View:
// db.users.find().pretty()