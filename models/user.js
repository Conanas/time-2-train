const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  givenName: String,
  googleId: String,
  workouts: [{
    type: Schema.Types.ObjectId,
    ref: "Workout"
  }]
})

const User = mongoose.model("User", userSchema);

module.exports = User;
