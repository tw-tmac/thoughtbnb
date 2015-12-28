var router = require('express').Router();

var DB = require('../models/db');
var Cities = require('../models/Cities')(DB.mongoose);

var respond = function(res, result) {
  res.contentType('application/json');
  res.send(JSON.stringify(result));
};

router.get('/', function(req, res) {
  Cities.getAll(function(resp) {
    respond(res, resp);
  });
});

module.exports = router;
