require('dotenv').config();
const express = require("express");
const logger = require("morgan");
const cors = require('cors');
const mongoose = require("mongoose");
const routes = require("./routes/");
const PORT = process.env.PORT || 3001;
const app = express();

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

// Send every request to the React app
// Define any API routes before this runs
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, function () {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
