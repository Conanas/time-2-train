const router = require("express").Router();
const workoutController = require("../../controllers/workoutController");

// Matches with "/api/workouts"
router.route("/")
  .get(workoutController.findAll)
// .post(booksController.create);

// Matches with "/api/workouts/:id"
router
  .route("/:id")
  .get(workoutController.findById)
// .put(booksController.update)
// .delete(booksController.remove);

module.exports = router;
