var ERRORS = require('../public/scripts/errors');

var Resp = function(obj) {
  this.error = null;
  this.data = (typeof obj === "object") ? obj : null;
};

var respond = function(ret, cb) {
  if (typeof cb === "function") {
    cb(ret);
  }
  return ret;
};

var City = false;

module.exports = function(mongoose) {
  var self = this;

  var citySchema = new mongoose.Schema({
    city_code: String,
    name: String
  });

  City = City || mongoose.model('City', citySchema);


  self.getAll = function(cb) {
    City.find({}).exec(function(err, cities) {
      var resp = new Resp();
      if (err) {
        resp.error = err;
        return respond(resp, cb);
      }
      resp = new Resp({
        'cities': cities
      });
      return respond(resp, cb);
    });
  };

  return self;
};
