const db = require("../models");

module.exports = function (app) {

  app.get("/api/workouts/:id", async function (req, res) {
    try {
      let workouts = await db.Workout.find({ _id: req.params.id });
      res.json(workouts);
    } catch (error) {
      console.log(error);
    }
  });

  app.get("/api/workouts/range", async (req, res) => {
    try {
      let workouts = await db.Workout.find({ day: { $gte: moment().subtract(7, "days") } }).populate("exercises");
      res.json(workouts);
    } catch (error) {
      console.log(error);
    }
  });

  app.post("/api/workouts", async function (req, res) {
    try {
      req.body.totalDuration = 0;
      req.body.totalWeight = 0;
      let workouts = await db.Workout.create(req.body);
      res.json(workouts);
    } catch (error) {
      console.log(error);
    }
  });

  app.put("/api/workouts/:id", async (req, res) => {
    try {
      let id = req.params.id;
      let exercise = await db.Exercise.create(req.body);
      let exerciseDuration = exercise.duration;
      let exerciseWeight = exercise.weight || 0;
      let workout = await db.Workout.updateOne({ _id: id }, { $push: { exercises: exercise._id }, $inc: { totalDuration: exerciseDuration, totalWeight: exerciseWeight } });
      res.json(workout);
    } catch (error) {
      console.log(error);
    }
  });
};