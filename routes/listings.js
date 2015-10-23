var router = require('express').Router();

var DB = require('../models/db');
var User = require('../models/User')(DB.mongoose);
var Listing = require('../models/Listing')(DB.mongoose);

var respond = function(res, result) {
  res.contentType('application/json');
  res.send(JSON.stringify(result));
};

router.post('/', function(req, res) {
  var user = req.session.user || {};
  var listingData = {
    'user': user._id,
    'location': req.body.location,
    'description': req.body.description
  };
  Listing.create(listingData, function(resp) {
    respond(res, resp);
  });
});

router.get('/', function(req, res) {
  Listing.search({}, function(resp) {
    respond(res, resp);
  });
});

router.get('/me', function(req, res) {
  Listing.search({
    user: req.session.user._id
  }, function(resp) {
    respond(res, resp);
  });
});

router.get('/:id', function(req, res) {
  Listing.search({
    _id: req.params.id
  }, function(resp) {
    respond(res, resp);
  });
});

router.patch('/:id', function(req, res) {
  req.body._id = req.params.id;
  Listing.edit(req.body, function(resp) {
    respond(res, resp);
  });
});

module.exports = router;
