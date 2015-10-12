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

module.exports = router;
