/**
 * Tests the User schema
 */

var should = require("should");
var assert = require("assert");
var helper = require('./specHelper');

var ERRORS = require('../../public/scripts/errors');
var CONFIG = require('../../config');

//Connect to MongoDB
var mongoose = helper.mongoose;
var db = mongoose.connection;

//Require User Module, passing mongoose
var User = require("../../models/User")(mongoose);
var Listing = require("../../models/Listing")(mongoose);

var newBob = helper.newBob;

var emptyDoc = function(cb) {
  Listing.removeAll(function() {
    User.model.remove({}, function(err) {
      if (typeof cb === "function") {
        cb(err);
      }
    });
  });
};

describe("Listing Model", function() {

  before(function(done) {
    emptyDoc(done);
  });

  afterEach(function(done) {
    emptyDoc(done);
  });

  after(function(done) {
    emptyDoc(done);
  });

  var bob;

  beforeEach(function() {
    bob = newBob(true);
  });

  it("should create a new listing associated with a user", function(done) {
    User.register(bob, function(response) {
      var listingData = {
        user: response.data.users[0]._id,
        location: 'Wilmington, Delaware',
        description: "Best place ever!"
      };
      Listing.create(listingData, function(resp) {
        (resp.error === null).should.be.ok;
        resp.data.listings.length.should.equal(1);
        resp.data.listings[0].user.should.equal(listingData.user);
        done();
      });
    });
  });

  it("should return an error if the location is not specified", function(done) {
    User.register(bob, function(response) {
      var listingData = {
        user: response.data.users[0]._id,
      };
      Listing.create(listingData, function(resp) {
        resp.error.should.equal(ERRORS.listing.location.missing);
        done();
      });
    });
  });

  it("should return an error if the user is not specified", function(done) {
    User.register(bob, function(response) {
      var listingData = {
        location: "Wilmington, Delaware"
      };
      Listing.create(listingData, function(resp) {
        resp.error.should.equal(ERRORS.listing.user.missing);
        done();
      });
    });
  });
});
