const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema({
  title: {
    type: String
  },
  continuous: {
    type: Boolean
  },
  prepare: {
    type: Number
  },
  reps: {
    type: Number
  },
  work: {
    type: Number
  },
  rest: {
    type: Number
  },
  sets: {
    type: Number
  },
  break: {
    type: Number
  }
})

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;
