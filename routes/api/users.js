const router = require("express").Router();
const userController = require("../../controllers/userController");

// /users routes
router
  .route('/')
  .post(userController.create)

router
  .route("/:id")
  .get(userController.findOneByEmail)
  .put(userController.update)

router
  .route("/:userId/:workoutId")
  .put(userController.deleteWorkout)

module.exports = router;
