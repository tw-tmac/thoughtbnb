var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'ThoughtBnB',  });
});

router.get('/signin', function(req, res) {
  var locals = {
    title: "Sign In",
    nextUrl: req.session.nextUrl || "/",
    activeLink: 'signin'
  };
  delete req.session.nextUrl;
  res.render('signin', locals);
});

router.get('/signup', function(req, res) {
  res.render('signup', { title: "Sign Up", activeLink: 'signin' });
});

router.get('/signout', function(req, res) {
  req.session.destroy(function() {
    res.redirect('/');
  });
});

router.get('/signup/confirmation', function(req, res) {
  res.render('confirmation', { title: "Confirmation", activeLink: 'signin' });
});

module.exports = router;
