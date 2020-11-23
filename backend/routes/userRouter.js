const User = require("../models/userModel");
const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");

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

    console.log("finding user");
    // find user
    const user = await User.findOne({username: username});
    // see if password is correct
    const validLogin =  await bcrypt.compare(password, user.password);

    console.log("Validlogin? : ", validLogin);

    // if not valid
    if (!validLogin) {
      return res
        .status(400)
        .json({msg: "Invalid login"});
    }

    // otherwise valid, res w/ user data
    const token = jwt.sign({id: user._id}, process.env.JWT_SECRET);
    console.log("token made");
    console.log("TOkne: " + token);
    res.json({
      token,
      user: {
        id: user._id,
        username: user.username
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

router.get("/", auth, async (req, res) => {
  const user = await User.findById(req.user);
  res.json({
    username: user.username,
    id: user._id
  });
});

module.exports = router;