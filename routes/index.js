var express = require('express');
var router = express.Router();
var S3 = require('../models/S3');
const aws = require('aws-sdk');
require('aws-sdk');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'ThoughtBnB',  });
});

router.get('/profile', function(req, res, next) {
  res.render('profile', { title: 'ThoughtBnB', activeLink: 'profile' });
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

router.get('/s3Url', function(req, res) {
  var s3 = new S3('blah.png');
  s3.getS3SignedURL(function (returnData) {
    res.write(returnData);
  });
  res.end();
});

module.exports = router;
