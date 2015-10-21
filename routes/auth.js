var router = require('express').Router();

var DB = require('../models/db');
var User = require('../models/User')(DB.mongoose);
var Email = require('../models/Email');

var respond = function(res, result) {
  res.contentType('application/json');
  res.send(JSON.stringify(result));
};

router.get('/confirm/:token', function(req, res) {
    User.activateUser(req.params.token);
    res.render('activate', {title: "Account Activated"});
  });


/* POST new user. */
router.post('/auth/register', function(req, res) {
  User.register(req.body, function(data) {
    if (!data.error) {
      var user = data.data.users[0];
      var baseUrl = req.protocol + "://" + req.get('host');
      var confirmationUrl = baseUrl + "/confirm/" + user.token;
      var email = new Email();
      email.to = user.email;
      email.from = "ThoughtBnB <no-reply@thoughtbnb.com>";
      email.subject = "Welcome to ThoughtBnB! Please Confirm Your Accounts";
      email.template('./views/emails/confirmation.jade', {user: user, link: confirmationUrl});
      email.send(console.log);
    }
    //Async on purpose
    respond(res, data);
  });
});

/* POST user auth */
router.post('/auth/login', function(req, res) {
  User.authenticate(req.body, function(resp) {
    if (!resp.error) {
      req.session.user = resp.data.user._doc;
      delete req.session.user.password;
    }
    resp.redirectUrl =  req.session.nextUrl || "/";
    delete req.session.nextUrl;
    respond(res, resp);
  });
});


/*
 * All routes after this require a user to be logged in
 */
router.use(function(req, res, next) {
  if (typeof req.session.user === "undefined") {
    req.session.nextUrl = req.originalUrl;
    var locals = {
      'message': "You must be logged in",
      'nextUrl': req.originalUrl
    };
    res.status(403).render('signin', locals);
  }
  else {
    next();
  }
});

module.exports = router;
