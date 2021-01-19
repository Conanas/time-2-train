const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Books collection and inserts the books below

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/workoutdb"
);

const workoutSeed = [
  {
    title: "Jo Workout 1",
    continuous: true,
    prepare: 15,
    reps: 4,
    work: 0,
    rest: 30,
    sets: 0,
    break: 60,
    user: 'ObjectId("6006a8e35d7ab643a077d5d8")'
  },
  {
    title: "Jo Workout 2",
    continuous: false,
    prepare: 8,
    reps: 4,
    work: 30,
    rest: 30,
    sets: 0,
    break: 60,
    user: 'ObjectId("6006a8e35d7ab643a077d5d8")'
  },
  {
    title: "Jo Workout 3",
    continuous: true,
    prepare: 15,
    reps: 4,
    work: 0,
    rest: 30,
    sets: 0,
    break: 60,
    user: 'ObjectId("6006a8e35d7ab643a077d5d8")'
  },
  {
    title: "Jo Workout 4",
    continuous: false,
    prepare: 15,
    reps: 4,
    work: 30,
    rest: 30,
    sets: 0,
    break: 60,
    user: 'ObjectId("6006a8e35d7ab643a077d5d8")'
  },
  {
    title: "Toby Workout 1",
    continuous: true,
    prepare: 15,
    reps: 4,
    work: 0,
    rest: 30,
    sets: 0,
    break: 60,
    user: 'ObjectId("6006a8e35d7ab643a077d5d9")'
  },
  {
    title: "Toby Workout 2",
    continuous: false,
    prepare: 8,
    reps: 4,
    work: 30,
    rest: 30,
    sets: 0,
    break: 60,
    user: 'ObjectId("6006a8e35d7ab643a077d5d9")'
  },
  {
    title: "Toby Workout 3",
    continuous: true,
    prepare: 15,
    reps: 4,
    work: 0,
    rest: 30,
    sets: 0,
    break: 60,
    user: 'ObjectId("6006a8e35d7ab643a077d5d9")'
  },
  {
    title: "Toby Workout 4",
    continuous: false,
    prepare: 15,
    reps: 4,
    work: 30,
    rest: 30,
    sets: 0,
    break: 60,
    user: 'ObjectId("6006a8e35d7ab643a077d5d9")'
  }
];

db.Workout
  .remove({})
  .then(() => db.Workout.collection.insertMany(workoutSeed))
  .then(data => {
    console.log(data.result.n + " workout records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });

// const userSeed = [
//   {
//     givenName: "Jo",
//     googleId: "123456789"
//   },
//   {
//     givenName: "Toby",
//     googleId: "987654321"
//   }
// ]

// db.User
//   .remove({})
//   .then(() => db.User.collection.insertMany(userSeed))
//   .then(data => {
//     console.log(data.result.n + " workout records inserted!");
//     process.exit(0);
//   })
//   .catch(err => {
//     console.error(err);
//     process.exit(1);
//   });