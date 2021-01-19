const router = require("express").Router();
const userController = require("../../controllers/userController");

// /users routes
router
  .route('/')
  .post(userController.create)

router
  .route("/:id")
  .get(userController.findOneByEmail);

module.exports = router;
