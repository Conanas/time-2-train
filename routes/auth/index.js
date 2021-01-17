const router = require("express").Router();
const authRoutes = require("./auth");

// Workout routes
router.use("/auth", authRoutes);

module.exports = router;
