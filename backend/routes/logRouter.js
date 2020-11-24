const User = require("../models/userModel");
const Log = require("../models/logModel");
const router = require("express").Router();
const jwt = require("jsonwebtoken");
// const auth = require("../middleware/auth");
// const moment = require("moment");

router.post("/new", async (req, res) => {
  try {
    const { logCategory, date, minutes} = req.body;

    const utcDate = new Date(date);

    if (isNaN(utcDate)) {
      return res
        .status(500)
        .json({msg: "server failed to have date in utc format."});
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
      logCategory,
      date,
      minutes
    });

    // return res.json(true);

    const savedLog = await newLog.save();
    res.json({
      savedLog
    });


  } catch (err) {
    res.status(500).json({error: err.message});
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

    // return res.status(300).json({msg: "im lost"});

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

    var jsonData = [];

    items.forEach(element => {
      console.log(element.date);
      var singleLog = {
        "logCategory": element.logCategory,
        "date": element.date,
        "minutes": element.minutes
      }
      jsonData.push(singleLog);
    });

    console.log("Data: ");
    console.log(jsonData);
    
    return res
      .status(200)
      .json(items);

  } catch (err) {
    return req.res.status(500).json({error: err.message});
  }
  
})


module.exports = router;