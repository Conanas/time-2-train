require('dotenv').config();
const express = require("express");
const logger = require("morgan");
const cors = require('cors');
const passport = require('passport');
const mongoose = require("mongoose");
const routes = require("./routes/");
const PORT = process.env.PORT || 3001;
const app = express();
const passportSetup = require('./config/passport-setup');

// initalize passport
app.use(session({
  secret: 'coding',
}))
app.use(passport.initialize());
app.use(passport.session());

// set up cors to allow us to accept requests from our client
app.use(
  cors({
    origin: "http://localhost:3000", // allow to server to accept request from different origin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true // allow session cookie from browser to pass through
  })
);

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.use(logger("dev"));

// Add routes
app.use(routes);

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/workoutdb", {
  useNewUrlParser: true
});

const authCheck = (req, res, next) => {
  console.log("req user", req.user)
  if (!req.user) {
    res.status(401).json({
      authenticated: false,
      message: "user has not been authenticated"
    });
  } else {
    next();
  }
};

// Send every request to the React app
// Define any API routes before this runs
app.get("/", authCheck, function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, function () {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
