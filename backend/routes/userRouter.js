const User = require("../models/userModel");
const Activity = require("../models/activityModel");
const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const { update } = require("../models/userModel");
const { json } = require("express");

// find user by id
router.get("/", auth, async (req, res) => {
  const user = await User.findById(req.user);
  res.json({
    username: user.username,
    id: user._id,
    activities: user.activities
  });
});

// register a user
router.post("/register", async (req, res) => {
  try {
    // gather request
    const {username, password, verifyPassword, email} = req.body;

    // any null fields?
    if (!username || !password || !verifyPassword || !email) {
      return res
        .status(400)
        .json({msg: "Not all fields were filled."});
    }

    // valid username format?
    if (username.length < 5) {
      return res
        .status(400)
        .json({msg: "Username must be at least 5 characters long"});
    }

    // valid username format?
    if (password.length < 7) {
      return res
        .status(400)
        .json({msg: "Password must be at least 7 characters long."});
    }
    
    // valid password format?
    if (password.length < 7) {
      return res
        .status(400)
        .json({msg: "Password must be at least 7 characters long."});
    }

    // passwords don't match?
    if (password !== verifyPassword) {
      return res
        .status(400)
        .json({msg: "Passwords don't match."})
    }

    // user already in system?
    const usernameExists = await User.findOne({username: username});
    const emailExists = await User.findOne({email: email});

    if (usernameExists || emailExists) {
      return res
        .status(400)
        .json({msg: "An account with this username or email already exists."});
    }

    // user is valid, hash password and store in db
    const salt = await bcrypt.genSalt();
    const hashedPass = await bcrypt.hash(password, salt);
    const newUser = new User({
      email,
      username,
      password: hashedPass
    });
    const savedUser = await newUser.save();
    console.log("Saved User:");

    console.log(savedUser);
    // res.json(savedUser);


    res.json({
        id: savedUser._id,
        username: savedUser.username
      })


  } catch (err) {
    // internal server error
    return res 
      .status(500)
      .json({error: err.message});
  }
});

// sign in
router.post("/login", async (req, res) => {
  try {
    const {username, password} = req.body;

    console.log(username);

    // any empty fields?
    if (!username || !password) {
      return res
        .status(400)
        .json({msg: "Please fill out all fields."});
    }

    // find user & validate
    const user = await User.findOne({username: username});

    if (!user) {
      return res.status(400).json({msg: "Invalid login"});
    }

    // validate password
    const validLogin =  await bcrypt.compare(password, user.password);

    // if not valid
    if (!validLogin) {
      return res
        .status(400)
        .json({msg: "Invalid login"});
    }

    // otherwise valid, respond w/ user data
    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        activities: user.activities
      }
    });

  } catch (err) {
    return res.status(500).json({error: err.message});
  }
});


router.post("/validateToken", async (req,res) => {
  try {
    // verify token
    const token = req.header("x-auth-token");
    if (!token) return res.json(false);

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) return res.json(false);

    // verify user
    const user = await User.findById(verified.id);
    if (!user) return res.json(false);

    return res.json(true);
  } catch (err) {
    return res.status(500).json({error: err.message});
  }
});




/*
Get user activities
header:
  key: x-auth-token
  value: <token>
returns: json array list of activity names
*/
router.get("/activities", async(req, res) => {
  try {
    console.log("get acts");
    // verify token
    const token = req.header("x-auth-token");
    console.log("token" +  token);
    if (!token) return res.json(false);

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) {
      return res.json(false)
    }

    // get user, then activities
    const user = await User.findById(verified.id);
    let activities = user.activities.map( i => i.activity);

    return res.json(activities);
  } catch (err) {
    return res.status(500).json({error: err.message});
  }
});

/*
Update user activity
header:
  key: x-auth-token
  value: <token>
body:
{
  "activity": "<name>"
}
returns: activity name added
*/
router.put("/addactivity", async (req, res) => {
  let {activity} = req.body;
  activity = await activity.toLowerCase();

  // activity cannot be "all" or "new"
  if (activity === 'all' || activity === "new") {
    return res
      .status(400)
      .json({msg: "Cannot make new activity of this type"});
  }


  try {
    // verify token
    const token = req.header("x-auth-token");
    if (!token) return res.status(400).json({msg: "invalid user/token"});

    // get verified user
    const verified = jwt.verify(token, process.env.JWT_SECRET, (err, verif) => {
      if (err) {
        return false;
      } else {
        return verif;
      }
    });

    // const verified = await jwt.verify(token, false);
    if (!verified) return res.status(400).json({msg: "invalid user/token"});

    // update this user
    let user = await User.findById(verified.id);

    const newAct = new Activity({
      activity: activity
    });
    
    if (user.activities.some(i => i.activity === activity)) {
      return res
        .status(400)
        .json({msg: "activity exists already"});
    } else {
      User.updateOne(
        {_id: verified.id},
        { $push: {activities: newAct}},
        function (error, User) {
          if (error) {
              console.log(error);
              return res.status(400).json({error: err.message});
          } else {
            res.json(activity);
          }
      });
    }
  } catch (err) {
    return res.status(500).json({error: err.message});
  }
});


module.exports = router;