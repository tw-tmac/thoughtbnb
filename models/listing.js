var autoIncrement = require('mongoose-auto-increment');
var ERRORS = require('../public/scripts/errors');

var Resp = function(obj) {
  this.error = null;
  this.data = (typeof obj === "object") ? obj : null;
};

var Listing = false;

module.exports = function(mongoose) {
  var self = this;
  return self;
};
