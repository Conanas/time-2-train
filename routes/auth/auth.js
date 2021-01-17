const router = require("express").Router();
const authController = require("../../controllers/authController");

// Matches with "/auth"
// router.route("/")
//     .get(authController.findAll)
//     .post(authController.create);

// Matches with "/api/workouts/:id"
// router
//     .route("/:id")
//     .get(authController.findById)
//     .put(authController.update)
// .delete(authController.remove);

// auth logout
router.get('/logout', (req, res) => {
    // handle with passport
    res.send('logging out');
});

// auth with google+
router.get('/google', (req, res) => {
    // handle with passport
    res.send('logging in with Google');
});

module.exports = router;
