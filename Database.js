//jshint esversion:6

// For database
const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/timeTracker", { useNewUrlParser: true, useUnifiedTopology: true});

// Export funcitons
module.exports.newUser = newUser;

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
    })

// Activity Schema
const activitySchema = new mongoose.Schema ({
    name: {
      type: String,
      required: [true, "An activity must have a name"]
    },
    times: [timeRangeSchema]
})

const Activity = mongoose.model("ACTIVITY", activitySchema);

// User Schema
const userSchema = new mongoose.Schema ({
    username: {
      type: String,
      required: [true, "A user must have a username."]
    },
    activities: [activitySchema]
})

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
          console.log("Successfully added activity: " + newAct)
        }
      });
}

// appendActivity("meganpaffrath", "guitar");

// Generate fake time from total minutes
function fullDateFromTime(date, totalMinutes) {
  hours = Math.floor(totalMinutes/60);
  let hourStr = "";
  if (hours == 0) {
      hourStr = "00";
  } else if (hours < 10) {
      hourStr = "0" + String(hours);
  } else {
      hourStr = String(hours);
  }
  console.log("\nHOurs: " + hourStr);

  minutes = totalMinutes%60;
  console.log(minutes);
  minutesStr = "";
  if (minutes == 0) {
      minutesStr = "00";
  } else if (minutes < 10) {
      minutesStr = "0" + String(minutes);
  } else {
      minutesStr = String(minutes);
  }

  console.log("minutesStr: " + minutesStr);

  endDateString = String(date) + "T" + hourStr + ":" + minutesStr + ":00Z";
  console.log("\nEnd Date: " + endDateString);
  const endD = new Date(endDateString);
  return endD;
}

// Insert unkown time range for a date
function insertUnknownTimeLog(username, activity, date, totalMinutes) {
    const startD = new Date("2020-09-20");
    const endDate = fullDateFromTime(date, totalMinutes);
    console.log("Generated: " + endDate);


    // console.log("Start: " + startD + " End: " + String(endDate));
    // const newTimeRange = newTime({
    //     start: 0,
    //     end: 0,
    //     total: totalTime
    // })
}
insertUnknownTimeLog("meganpaffrath", "guitar", "2020-09-20", 116);



// Date: new Date(Date.UTC(year, month, day, hour, minute, second))



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
