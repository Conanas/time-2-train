const router = require("express").Router();
const workoutRoutes = require("./workouts");
const userRoutes = require('./users');

// Workout routes
router.use("/workouts", workoutRoutes);

// User routes
router.use('/users', userRoutes);

module.exports = router;
