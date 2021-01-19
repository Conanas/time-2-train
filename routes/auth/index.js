const router = require("express").Router();
const passport = require('passport');

router.get("/login/success", (req, res) => {
  if (req.user) {
    res.json({
      success: true,
      message: "user has successfully authenticated",
      user: req.user,
      cookies: req.cookies
    });
  }
});

// when login failed, send failed msg
router.get("/login/failed", (req, res) => {
  console.log(req)
  res.status(401).json({
    success: false,
    message: "user failed to authenticate."
  });
});

// When logout, redirect to client
router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

// auth with google+
router.get("/google", passport.authenticate("google", {
  scope: ['profile']
}));

// callback route for google to redirect to 
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/auth/login/failed"
  }), function (req, res) {
    console.log("success")
    console.log(req.user);
    res.redirect('/');
  }
);

module.exports = router;
