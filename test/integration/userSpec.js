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

var reqFields = [
  'name',
  'email',
  'phone',
  'password',
];

var newBob = helper.newBob;

var emptyDoc = function(cb) {
  User.model.remove({}, function(err) {
    if (typeof cb === "function") {
      cb(err);
    }
  });
};

describe("User Model", function() {

  before(function(done) {
    emptyDoc(done);
  });

  afterEach(function(done) {
    emptyDoc(done);
  });

  describe("Registration", function() {

    var bob;

    beforeEach(function() {
      bob = newBob(true);
    });

    it("should return the user when there are no errors", function(done) {
      User.register(bob, function(resp) {
        should.not.exist(resp.error);
        resp.data.users.length.should.equal(1);
        resp.data.users[0].name.should.equal(bob.name);
        done();
      });
    });

    it("should generate token", function(done) {
      User.register(bob, function(resp) {
        should.not.exist(resp.error);
        resp.data.users[0].token.should.not.equal(null);
        done();
      });
    });

    it("should activate user with a token", function(done) {
      User.register(bob, function(resp) {
        should.not.exist(resp.error);
        User.activateUser(resp.data.users[0].token, function(activateResponse){
          activateResponse.data.users[0].isActive.should.be.true;
        });

        done();
      });
    });

    describe("Required Fields", function() {
      var specialFields = ['email', 'password'];
      var fields = reqFields.filter(function(v) { return specialFields.indexOf(v) === -1; });
      fields.map(function(field) {
        it("should save "+field, function(done) {
          bob[field] = "TestValue";
          User.register(bob, function(resp) {
            should.not.exist(resp.error);
            var obj = {};
            obj[field] = "TestValue";
            User.model.count(obj, function(err, count) {
              count.should.equal(1);
              done();
            });
          });
        });
      });

      it("should save password", function(done) {
        var john = newBob();
        john.password = "TestPassword";
        john.cpassword = "TestPassword";
        User.register(john, function(resp) {
          should.not.exist(resp.error);
          var encryptedPw = resp.data.users[0].password;
          User.comparePassword(john.password, encryptedPw, function(err, same) {
            same.should.be.ok;
            done();
          });
        });
      });
    });

    describe("Missing Required Field", function() {
      reqFields.map(function(field) {
        it("should return an error when "+field+" is missing", function(done) {
          delete bob[field];
          User.register(bob, function(resp) {
            resp.error.should.equal(ERRORS.signup[field]['missing']);
            done();
          });
        });
      });
    });

    describe("Empty String in Required Field", function() {
      reqFields.map(function(field) {
        it("should return an error when "+field+" is blank", function(done) {
          bob = newBob(true);
          bob[field] = "";
          User.register(bob, function(resp) {
          resp.error.should.equal(ERRORS.signup[field]['missing']);
          done();
          });
        });
      });
    });

    describe("Email", function() {
      it("should return an error if not unique", function(done) {
        var bob = newBob(true);
        User.register(bob, function(response) {
          should.not.exist(response.error);
          User.register(bob, function(resp) {
            resp.error.should.equal(ERRORS.signup['email']['duplicate']);
            done();
          });
        });
      });
      it("should reject an email address if it does not have the correct domain", function(done) {
        var bob = newBob(true);
        bob.email = "invalidemail@invaliddomain.com",
        User.register(bob, function(resp) {
          resp.error.should.equal(ERRORS.signup['email']['domain'].replace('{{domain}}', CONFIG.EMAIL_DOMAIN));
          done();
        });
      });
    });

    describe("Password", function() {
      var bob;
      beforeEach(function() {
        bob = newBob(true);
      });

      it("should encrypt the password", function(done) {
        User.register(bob, function(resp) {
          resp.data.users[0].password.should.not.equal(bob.password);
          done();
        });
      });
      it("should return an error when confirmation field is missing", function(done) {
        delete bob.cpassword;
        User.register(bob, function(resp) {
          resp.error.should.equal(ERRORS.signup['password']['unconfirmed']);
          done();
        });
      });
      it("should return an error on mismatch", function(done) {
        bob.cpassword = "mismatch";
        User.register(bob, function(resp) {
          resp.error.should.equal(ERRORS.signup['password']['mismatch']);
          done();
        });
      });
      it("should return an error when blank", function(done) {
        bob.password = "";
        bob.cpassword = "";
        User.register(bob, function(resp) {
          resp.error.should.equal(ERRORS.signup['password']['missing']);
          done();
        });
      });
    });

    describe("No Callback", function() {
      it("should not throw any errors", function() {
        (User.register(bob) || true).should.be.ok;
      });
    });

  });

  describe("Find", function() {
    var bob;
    var james;

    before(function(done) {
      emptyDoc(done);
    });

    beforeEach(function(done) {
      bob = newBob(true);
      james = newBob(true);
      james.name = "James";
      User.register(bob, function(resp) {
        User.register(james, function(resp) {
          delete bob.cpassword;
          delete james.cpassword;
          done();
        });
      });
    });

    afterEach(function(done) {
      emptyDoc(done);
    });

    describe("No Criteria", function() {

      it("should not throw any errors when no parameters are passed", function() {
        (User.find(bob) || true).should.be.ok;
      });

      it("should return all users when empty object is passed", function(done) {
        User.find({}, function(resp) {
          should.not.exist(resp.error);
          resp.data.users.length.should.equal(2);
          done();
        });
      });
    });

    describe("Single Criterion", function() {

      it("should return one user when sent one criterion matching one record", function(done) {
        User.find({ name: bob.name}, function(resp) {
          should.not.exist(resp.error);
          resp.data.users.length.should.equal(1);
          resp.data.users[0].name.should.equal(bob.name);
          done();
        });
      });

      it("should two multiple users with one criterion matching two records", function(done) {
        User.find({ country: bob.country}, function(resp) {
          should.not.exist(resp.error);
          resp.data.users.length.should.equal(2);
          resp.data.users[0].name.should.equal(bob.name);
          resp.data.users[1].name.should.equal(james.name);
          done();
        });
      });
    });

    describe("Multiple Criteria", function() {

      it("should return one user when sent criteria matching one record", function(done) {
        User.find({ name: bob.name, phone: bob.phone}, function(resp) {
          should.not.exist(resp.error);
          resp.data.users.length.should.equal(1);
          resp.data.users[0].name.should.equal(bob.name);
          resp.data.users[0].phone.should.equal(bob.phone);
          done();
        });
      });

      it("should return two users with criteria matching two records", function(done) {
        User.find({ country: bob.country, zip: james.zip}, function(resp) {
          should.not.exist(resp.error);
          resp.data.users.length.should.equal(2);
          resp.data.users[0].name.should.equal(bob.name);
          resp.data.users[1].name.should.equal(james.name);
          done();
        });
      });

      it("should return one user with a user passed as the criteria", function(done) {
        User.find(bob, function(resp) {
          should.not.exist(resp.error);
          resp.data.users.length.should.equal(1);
          resp.data.users[0].name.should.equal(bob.name);
          done();
        });
      });
    });

  });

  describe("Update", function() {

    var bob;
    var john;

    before(function(done) {
      emptyDoc(done);
    });

    beforeEach(function(done) {
      bob = newBob();
      john = newBob();
      john.name = "John";
      john.cpassword = john.password;
      User.register(bob, function(resp) {
        User.register(john, function(resp2) {
          delete john.cpassword;
          done();
        });
      });
    });

    //afterEach(emptyDoc);

    it("should return an error if userID property is missing", function(done) {
      User.update({}, function(resp) {
        resp.error.should.equal(ERRORS.user['notFound']);
        done();
      });
    });

    it("should return an error if userID is invalid", function(done) {
      User.update({ _id: "1234" }, function(resp) {
        resp.should.have.property("error");
        done();
      });
    });

    it("should return an error if userID not found", function(done) {
      User.update({ _id: "987654321" }, function(resp) {
        resp.error.should.equal(ERRORS.user['notFound']);
        done();
      });
    });


    it("should update the database with the user data passed", function(done) {
      User.find(john, function(findResp) {
        john._id = findResp.data.users[0].id;
        john.phone = "3125551234";

        User.update(john, function(updateResp) {
          should.not.exist(updateResp.error);

          var match = true;
          for (var field in john)
            {
              match = match && (updateResp.data.users[0][field]==john[field]);
            }
            match.should.be.ok;

            User.find({_id: john._id}, function(resp) {
              resp.data.users.length.should.equal(1);
              match = true;
              for (var field in john)
                {
                  match = match && (resp.data.users[0][field]==john[field]);
                }
                match.should.be.ok;
                done();
            });
        });
      });
    });

  });

  describe("Remove", function() {

    var bobby = newBob();
    var john = newBob();

    before(function(done) {
      emptyDoc(done);
    });

    beforeEach(function(done) {
      bobby = newBob(true);
      john = newBob(true);
      john.name = "John";
      emptyDoc(function(err) {
        User.register(bobby, function(resp) {
          User.register(john, function(resp2) {
            delete bobby.cpassword;
            delete john.cpassword;
            done();
          });
        });
      });
    });

    it("should return an error if userID property is missing", function(done) {
      User.remove({}, function(resp) {
        resp.error.should.equal(ERRORS.user['notFound']);
        done();
      });
    });

    it("should return an error if userID is invalid", function(done) {
      User.remove({ _id: "1234" }, function(resp) {
        resp.should.have.property("error");
        done();
      });
    });

    it("should return an error if userID not found", function(done) {
      User.remove({ _id: "987654321" }, function(resp) {
        resp.error.should.equal(ERRORS.user['notFound']);
        done();
      });
    });

    it("should remove the user when valid userID is provided", function(done) {
      User.find(john, function(findResp) {
        john._id = findResp.data.users[0].id;

        User.remove({_id: john._id}, function(resp) {
          should.not.exist(resp.error);
          User.model.count({}, function(err, count) {
            // Only Bob should be left
            count.should.equal(1);
            done();
          });
        });
      });
    });

    it("should remove the user when a user is provided", function(done) {
      User.find(john, function(findResp) {
        john._id = findResp.data.users[0].id;

        User.remove(john, function(resp) {
          should.not.exist(resp.error);
          User.model.count({}, function(err, count) {
            // Only Bob should be left
            count.should.equal(1);
            done();
          });
        });
      });
    });

  });
});

describe("Authentication", function() {
  var bob;

  before(function(done) {
    bob = newBob(true);
    emptyDoc(function() {
      User.register(bob, function(resp) {
        delete bob.cpassword;
        User.activateUser(resp.data.users[0].token, function(resp2) {
          done();
        });
      });
    });
  });

  after(function(done) {
    emptyDoc(done);
  });

  it("should return the user if the email and password match", function(done) {
    var bobby = {
      email: bob.email,
      password: bob.password
    };
    User.authenticate(bobby, function(resp) {
      should.not.exist(resp.error);
      resp.data.should.have.property('user');
      resp.data.user.name.should.equal(bob.name);
      done();
    });
  });

  it("should return an error if the user is not found", function(done) {
    var bobby = {
      email: "fakeEmail@email.com",
      password: bob.password
    };
    User.authenticate(bobby, function(resp) {
      resp.should.have.property('error');
      resp.error.should.equal(ERRORS.auth['notFound']);
      done();
    });
  });

  it("should return an error if the user is not activated", function(done) {
    bob = newBob(true);
    var bobby = {
      email: bob.email,
      password: bob.password,
    };
    User.register(bob, function() {
      User.authenticate(bobby, function(resp) {
        resp.should.have.property('error');
        resp.error.should.equal(ERRORS.auth['notActive']);
        done();
      });
    });
  });

  it("should return an error when the password is incorrect", function(done) {
    var bobby = {
      email: bob.email,
      password: "WrongPassword"
    };
    User.authenticate(bobby, function(resp) {
      resp.should.have.property('error');
      resp.error.should.equal(ERRORS.auth['wrongPassword']);
      done();
    });
  });
});
