const express = require('express');
const router = express.Router();
const passport = require('passport');

var isLoggedIn = (req, res, callback) => {
  if (req.isAuthenticated()) 
    return callback();
  
    // not logged in so redirect to home page
    res.redirect('/');
}

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

// ask google to do the authentication
router.get('/', passport.authenticate('google', { scope : ['profile', 'email'] }));

// callback after google has finished auth'ing the user
router.get('/callback',
  passport.authenticate('google', {
    successRedirect : '/',
    failureRedirect : '/'
}));

router.get('/status', (req, res) => {
  // check if logged in
  res.status(200).json({
    loggedIn: (req.isAuthenticated() && (req.user != null)),
    user: req.user
  });
});

module.exports = router;