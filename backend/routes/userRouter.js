const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// register a user
router.post("/register", async (req, res) => {
  try {
    console.log(req.body);
    // gather request
    const {username, password, verifyPassword, email} = req.body;

    // any null fields?
    if (!username || !password || !verifyPassword || !email) {
      return res
        .status(400)
        .json({msg: "Not all fields were filled."});
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
    res.json(savedUser);
  } catch (err) {
    // internal server error
    return res 
      .status(500)
      .json({error: err.message});
  }
});

module.exports = router;