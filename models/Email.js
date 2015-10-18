var nodemailer = require('nodemailer');
var jade = require('jade');

var CONFIG = require('../config');

var transports = {
  "direct": function() {
    return nodemailer.createTransport();
  },
  "mailtrap": function() {
    var smtpTransport = require('nodemailer-smtp-transport');
    return nodemailer.createTransport(smtpTransport({
      host: "mailtrap.io",
      port: CONFIG.MAILTRAP_PORT,
      auth: {
        user: CONFIG.MAILTRAP_USER,
        pass: CONFIG.MAILTRAP_PASSWORD
      }
    }));
  },
  "mandrill": function() {
    var mandrillTransport = require('nodemailer-mandrill-transport');
    return  nodemailer.createTransport(mandrillTransport({
      auth: {
        apiKey: CONFIG.MANDRILL_KEY
      }
    }));
  },
  "mock": function() {
    return nodemailer.createTransport(require('nodemailer-mock-transport')());
  }
};

var Email = function(email) {
  var self = this;

  email = email || {};

  self.transport = self.defaultTransport || transports[CONFIG.EMAIL_TRANSPORT]();

  self.from = email.from || "no-reply@" + CONFIG.EMAIL_DOMAIN;
  self.to = email.to || "";
  self.subject = email.subject || "";
  self.html = email.html || "";

  var jadeOptions = {
    pretty: true
  };


  var templateData = {};
  self.template = function(template, params) {
    templateData = {
      file: template,
      options: params
    };
    templateData.options.prettyPrint = true;
  };

  var sendEmail = function(cb) {
    self.transport.sendMail({
      from: self.from,
      to: self.to,
      subject: self.subject,
      html: self.html
    }, function(err, info) {
      if (typeof cb === "function") {
        cb(err, info);
      }
    });
  };

  self.send = function(cb) {
    if (typeof templateData.file === "string") {
      jade.renderFile(templateData.file, templateData.options, function(err, html) {
        if (err) {
          return cb(err);
        }
        self.html = html;
        sendEmail(cb);
      });
    }
    else {
      self.html = "fail please :)";
      sendEmail(cb);
    }
  };

  return this;
};

Email.transports = transports;

module.exports = Email;
