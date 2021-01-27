const router = require("express").Router();
const workoutController = require("../../controllers/workoutController");

// Matches with "/api/workouts"
router.route("/")
  .get(workoutController.findAll);

// Matches with "/api/workouts/:id"
router
  .route("/:id")
  .get(workoutController.findById)
  .put(workoutController.update)
  .post(workoutController.create)
  .delete(workoutController.delete);

router
  .route("/title/:title/:user")
  .get(workoutController.findByTitle);

router
  .route('/user/:id')
  .get(workoutController.findByUser);

module.exports = router;
