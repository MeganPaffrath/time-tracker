//jshint esversion:6
const timeCalculator = require(__dirname + "/TimeCalculator.js");

// For database
const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/timeTracker", { useNewUrlParser: true, useUnifiedTopology: true});

// Export funcitons
module.exports.newUser = newUser;

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

const User = mongoose.model("USER", userSchema);

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
  User.updateOne( {username: username}, {$push: {activities: createdActivity}}, function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log("Successfully added activity: " + newAct);
    }
  });
}
// appendActivity("meganpaffrath", "make tea");



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

// test

// Append timeRange to a user for an activity
// concept: https://stackoverflow.com/questions/38751676/insert-a-new-object-into-a-sub-document-array-field-in-mongoose/38766749
function appendActivityTime(uname, activityName, newRange) {
  console.log(uname, activityName);
  console.log("Trying to add: " + newRange);
  User.updateOne(
    {username: uname, "activities.name": activityName},
    { $push: { "activities.$.times": newRange}},
    function (err) {
      if (err) {
          console.log(err);
        } else {
          console.log("Successfully added time range: " + newRange);
        }
    }
  );
  console.log("end");
}


appendActivityTime("meganpaffrath", "guitar", createUnknownTimeLog("2020-09-20", 116));



/*

Later Implement:
- Remove User
- Remove activity from user
- Remove time logged
- Insert known time range

*/

/*

Figure out:
- handling time zones for users in differing time zones

*/
