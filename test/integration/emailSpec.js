var should = require("should");

var nodemailer = require('nodemailer');
var MockTransport = require('nodemailer-mock-transport');

var ERRORS = require('../../public/scripts/errors');
var CONFIG = require('../../config');

var Email = require('../../models/Email');

describe("Email", function() {
  it("should send an email", function(done) {
    var email = new Email();
    var mockTransport = MockTransport();
    email.transport = nodemailer.createTransport(mockTransport);
    email.to = "thoughtbnb@asifchoudhury.com";
    email.from = "integrationtests@thoughtbnb.com";
    email.subject = "Test";
    email.html = "This is a test";
    email.send(function(err, info) {
      mockTransport.sentMail.length.should.equal(1);
      done();
    });
  });

  it("should set the default transport via prototype", function() {
    var expectedTransport = {
      overridedDefault: true
    };
    var TestEmailModel = require('../../models/Email');
    TestEmailModel.prototype.defaultTransport = expectedTransport;
    var email = new TestEmailModel();
    email.transport.should.equal(expectedTransport);
  });

  it("should render a jade template and send it as the email body", function(done) {
    var email = new Email();
    var mockTransport = MockTransport();
    email.transport = nodemailer.createTransport(mockTransport);
    email.to = "thoughtbnb@asifchoudhury.com";
    email.from = "integrationtests@thoughtbnb.com";
    email.subject = "Test";
    email.template('./test/resources/emailTemplate.jade', {text: "Test123"});
    email.send(function(err, info) {
      mockTransport.sentMail[0].data.html.should.equal("<p>Test123</p>");
      done();
    });
  });
});
