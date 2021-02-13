const User = require("../models/userModel");
const Log = require("../models/logModel");
const router = require("express").Router();
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
// const moment = require("moment");


/*
Add new activity
header:
  key: x-auth-token
  value: <token>
body:
{
  "activity": "<name>",
  "date": "<UTC date>",
  "minutes": <number>
}
returns: the new log
*/
router.post("/new", async (req, res) => {
  try {
    const { activity, date, minutes} = req.body;
    const utcDate = new Date(date);

    // check date
    if (isNaN(utcDate)) {
      return res
        .status(500)
        .json({msg: "server failed to have date in utc format."});
    }

    // check minutes
    if (minutes > 1440) {
      return res
        .status(400)
        .json({msg: "Succeeded total minutes in a day"});
    }

    // verify token
    const token = req.header("x-auth-token");
    if (!token) {
      return res
        .status(400)
        .json({msg: "token was lost"});
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) {
      return res
        .status(400)
        .json({msg: "Token verification failure."});
    }

    // verify user
    const user = await User.findById(verified.id);
    if (!user) {
      return res
        .status(400)
        .json({msg: "User not found"});
    }

    // create log for user
    const newLog = new Log({
      username: user.username,
      activity,
      date,
      minutes
    });

    const savedLog = await newLog.save();
    res.json({
      savedLog
    });

  } catch (err) {
    res.status(500).json({error: err.message});
  }
  

});

router.delete("/delete", async (req, res) => {
  // get verified token
  const token = req.header("x-auth-token");
  if (!token) {
    return res
      .status(400)
      .json({msg: "token was lost"});
  }

  // get verified user
  const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) {
      return res
        .status(400)
        .json({msg: "Token verification failure."});
    }

  // get username tied to log, make sure same as user
  const user = await User.findById(verified.id);
  if (!user) {
    return res
      .status(400)
      .json({msg: "User not found"});
  }
  const username = user.username;
  console.log(username);

  // make sure user is tied to this log
  const logFound = await Log.findById(req.body.id);
  console.log(logFound);
  if (logFound.username != user.username) {
    return res
      .status(400)
      .json({msg: "bad user"});
  }

  // delete log
  try {
    const deletedLog = await Log.findByIdAndDelete(req.body.id);
    res.status(200).json(deletedLog);
    // res.status(200).json({msg: "kk"})
  } catch (err) {
    res.status(500).json({error: error.message});
  }
});



router.get("/getlogs", async (req, res) => {
  try {
    // figure out user from token
    // verify token
    const token = req.header("x-auth-token");
    if (!token) {
      return res
        .status(400)
        .json({msg: "token was lost"});
    }


    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) {
      return res
        .status(400)
        .json({msg: "Token verification failure."});
    }

    // verify user
    const user = await User.findById(verified.id);
    if (!user) {
      return res
        .status(400)
        .json({msg: "User not found"});
    }

    console.log("user found...");

    // return all logs for that user
    const items = await Log.find({"username": user.username});

    // var jsonData = [];

    // items.forEach(element => {
    //   console.log(element.date);
    //   var singleLog = {
    //     "activity": element.activity,
    //     "date": element.date,
    //     "minutes": element.minutes
    //   }
    //   jsonData.push(singleLog);
    // });

    // console.log("Data: ");
    // console.log(jsonData);
    
    return res
      .status(200)
      .json(items);

  } catch (err) {
    return req.res.status(500).json({error: err.message});
  }
  
})


module.exports = router;