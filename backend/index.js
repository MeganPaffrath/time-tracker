//jshint esversion: 6

const express = require("express");
const mongoose = require("mongoose");
// For cross origin requests, supporting secure req & data transfers btwn browsers and servers:
const cors = require("cors");
const { Router } = require("express");
// loads env vars from .env file:
require("dotenv").config();


// set up express
const app = express();
app.use(express.json());
app.use(cors());

// connect to db
mongoose.connect(
  process.env.MONGO_CONNECTION_STR,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  }, (err) => {
    if (err) throw err;
    console.log("MongoDB connected");
  }
)

// set up port 
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));

// set up routes
app.use("/users", require("./routes/userRouter"));