//jshint esversion:6
const timeCalculator = require(__dirname + "/time-calculator.js");

// For database ------------------------------------
const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/timeTracker", { useNewUrlParser: true, useUnifiedTopology: true});

var UserSchema = require('./user');
var User = mongoose.model('USER', UserSchema);
var ActivitySchema = require('./activity');
var Activity = mongoose.model('ACTIVITY', ActivitySchema);
var TimeRangeSchema = require('./time-range');
var TimeRange = mongoose.model('TIMERANGE', TimeRangeSchema);

// Interacting with Database ------------------------

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

/*
  * Creates a new activity for a user and adds it to the user
  * @param {string} username to which the activity belongs to
  * @param {string} the name of the activity
*/
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

/*
  * Removes an activity from a user
  * @param {string} username to which the activity belongs to
  * @param {string} the name of the activity to remove
*/
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

/*
  * Create timeRange for unkown time range for a date
  * @param {date} iso8061 date in format: "YYYY-MM-DD"
  * @param {intager} the amount of minutes
  * @returns {object} a new time range object
*/
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

/*
  * Append timeRange to a user for an activity
  * @param {string} username to append activity to
  * @param {string} the name of the activity
  * @param {object} a new time range object
*/
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


/*
  * Remove a time
  * @param {string} username to remove time from
  * @param {string} the name of the activity to remove from
  * @param {ID} the id of the object to remove -- IMPROVE LATER
*/
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


// Reading from database

// For a user, get hours
function getHours(username, activityName, month, year) {
  User.findOne({username: username}, 
    function (err, results) {
      if (err) {
          console.log(err);
        } else {
          // console.log("Found user: " + results.activities);
          results.activities.forEach(function(item) {
            // console.log(item);
            if (item.name == activityName) {
              item.times.forEach(function(time) {
                console.log("Start: " + time.minutes + " ON " + time.start);
              });
            }
          });
        }
    }
  );

  // User.find(function (err, users) {
  //   if (err) return console.error(err);
  //   console.log(users);
  // })
}

getHours("meganpaffrath", "guitar", "09", "2020");






// ---------------------------------------------------------------------------------------------------- Current State & reset
// Current State:
// newUser("meganpaffrath");

// appendActivity("meganpaffrath", "guitar");
// appendActivity("meganpaffrath", "code");


// appendActivityTime("meganpaffrath", "code", createUnknownTimeLog("2020-10-01", 60*2));
// appendActivityTime("meganpaffrath", "code", createUnknownTimeLog("2020-10-02", 60*3));

// appendActivityTime("meganpaffrath", "gutiar", createUnknownTimeLog("2020-10-01", 65));
// appendActivityTime("meganpaffrath", "guitar", createUnknownTimeLog("2020-10-02", 66));
// appendActivityTime("meganpaffrath", "guitar", createUnknownTimeLog("2020-10-03", 60));

// Full reset:
// db.users.remove({})

// Pretty View:
// db.users.find().pretty()
// User.find();
// User.find(function (err, users) {
//   if (err) return console.error(err);
//   console.log(users);
// })