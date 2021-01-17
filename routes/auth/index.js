const router = require("express").Router();
const authRoutes = require("./auth");
const PassportSetup = require('../../config/passport-setup');

// auth logout
router.route('/logout')
  .get((req, res) => {
    // handle with passport
  });

// auth with google+
router.route('/google')
  .get((req, res) => {
    res.send("Logging in with Google")
  }, passport.authenticate('google', {
    scope: ['profile']
  })
  );

// callback route for google to redirect to 
router.route('/google/redirect').get(passport.authenticate('google'), (req, res) => {
  res.send("you reached the callback URI")
})

module.exports = router;
