var router = require('express').Router();

var DB = require('../models/db');
var User = require('../models/user')(DB.mongoose);
var Listing = require('../models/listing')(DB.mongoose);

var respond = function(res, result) {
  res.contentType('application/json');
  res.send(JSON.stringify(result));
};

router.post('/', function(req, res) {
  respond(res, { bod: req.body.location});
});

module.exports = router;
