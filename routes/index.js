
var express = require('express');
var router = express.Router();
var User = require('../models/user')

// GET /
router.get('/', function(req, res, next) {
  return res.render('index', { title: 'Home' });
});

// GET /profile
router.get('/profile', function(req, res, next){

  // Redirect for unauthorized access
  if (! req.session.userId) {
    var err = new Error("You are not authorized to view this page.");
    err.status = 403;
    return next(err);
  }
});

// GET /login
router.get('/login', function(req, res, next) {
  return res.render('login', {title: 'Log In'});
});

// POST /login
router.post('/login', function(req, res, next) {
  if (req.body.email && req.body.password) {
    User.authenticate(req.body.email, req.body.password, function(error, user){

      if (error || !user) {
        var err = new Error("Incorrect Email or Password!");
        err.status = 401;
        return next(err);
      } else {

      // User Authenticated - Session / Cookie
      req.session.userId = user._id;
      return res.redirect('/profile');
      }
    });
  } else {
    var err = new Error ('Email and password are required.');
    err.status = 401;
    return next(err);
  }
});

// GET /register
router.get('/register', function(req, res, next){
  return res.render('register', {title: 'Sign Up'});
});

// POST /register
router.post('/register', function(req, res, next){
  if (req.body.email && req.body.name && req.body.favoriteBook && req.body.password && req.body.confirmPassword) {

    // Confirm whether passwords match
    if (req.body.password != req.body.confirmPassword) {
      var err = new Error("Passwords do not match!");
      err.status = 400;
      return next(err);
    }

    // Create Object Using Form Data
    var userData = {
      email: req.body.email,
      name: req.body.name,
      favoriteBook: req.body.favoriteBook,
      password: req.body.password
    }

    // Use Schema's "Create" method to insert Data
    User.create(userData, function(error, user){
      if (error) {
        return next(error);
      } else {
        return res.redirect('/profile');
      }
    });

  } else {
    var err = new Error("All fields are required");
    err.status = 404;
    return next(err);
  }
});

// GET /about
router.get('/about', function(req, res, next) {
  return res.render('about', { title: 'About' });
});

// GET /contact
router.get('/contact', function(req, res, next) {
  return res.render('contact', { title: 'Contact' });
});

module.exports = router;
