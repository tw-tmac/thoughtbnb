var autoIncrement = require('mongoose-auto-increment');
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

var Listing = false;

module.exports = function(mongoose) {
  var self = this;

  var listingSchema = new mongoose.Schema({
    user: {type: Number, ref: 'User'},
    location: String,
    description: String,
  });
  autoIncrement.initialize(mongoose);
  listingSchema.plugin(autoIncrement.plugin, 'Listing');

  Listing = Listing || mongoose.model('Listing', listingSchema);

  self.create = function(listingData, cb) {
    var resp = new Resp();
    var requiredFields = [
      'user',
      'location'
    ];

    var isMissing = function(value) {
      if (typeof value === "undefined") {
        return true;
      }
      return (value === "");
    };
    requiredFields.forEach(function(field) {
      if (isMissing(listingData[field])) {
        resp.error = ERRORS.listing[field]['missing'];
      }
    });
    if (resp.error) {
      return respond(resp, cb);
    }
    else {
      var listing = new Listing(listingData);

      listing.save(function(err) {
        resp = new Resp({
          'listings': [listing],
          'error': err
        });
        return respond(resp, cb);
      });
    }
  };

  self.search = function(criteria, cb) {
    Listing.find(criteria).populate('user').exec(function(err, listings) {
      var resp = new Resp();
      if (err) {
        resp.error = err;
        return respond(resp, cb);
      }
      resp = new Resp({
        'listings': listings
      });
      return respond(resp, cb);
    });
  };

  self.removeAll = function(cb) {
    Listing.remove({}, cb);
  };
  return self;
};
