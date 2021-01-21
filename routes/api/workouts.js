const router = require("express").Router();
const workoutController = require("../../controllers/workoutController");

// Matches with "/api/workouts"
router.route("/")
  .get(workoutController.findAll)

// Matches with "/api/workouts/:id"
router
  .route("/:id")
  .get(workoutController.findById)
  .put(workoutController.update)
  .post(workoutController.create)
// .delete(workoutController.remove);

module.exports = router;
