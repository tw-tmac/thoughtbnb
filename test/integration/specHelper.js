var mongoose = require('mongoose');

var url = "mongodb://localhost/thoughtbnbtest";

//Connect to MongoDB
mongoose.connect(url);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function cb() {
});

module.exports.mongoose = mongoose;

var CONFIG = require('../../config');

var bobCount = 0;
var newBob = function(reg) {
  var bob = {
    name: "Bob Something",
    email: "bsomething" + (bobCount++) + "@" + CONFIG.EMAIL_DOMAIN,
    password: "unhashedpassword",
    phone: "1 123 1234",
  };
  reg = (typeof reg === "undefined") ? false : reg;
  if (reg)
    {
      bob.cpassword = bob.password;
    }
    return bob;
};

module.exports.newBob = newBob;
