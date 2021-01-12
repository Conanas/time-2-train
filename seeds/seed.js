const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Books collection and inserts the books below

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/workoutdb"
);

const workoutSeed = [
  {
    title: "Test 1",
    continuous: false,
    prepare: 15,
    reps: 4,
    rest: 30,
    sets: 0,
    break: 60
  }
];

db.Workout
  .remove({})
  .then(() => db.Workout.collection.insertMany(workoutSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
