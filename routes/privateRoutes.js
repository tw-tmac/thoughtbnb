var router = require('express').Router();

var DB = require('../models/db');
var Listing = require('../models/Listing')(DB.mongoose);

router.get('/listings', function(req, res){
  res.render('listings', {title:"Listings"});
});
module.exports = router;
