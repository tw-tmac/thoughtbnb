var ERRORS = (function() {
  var self = {};

  self.signup =  {
    'name': {
      'name': "Name"
    },
    'email': {
      'name': "Email",
      'duplicate': "The email address is already in use.",
      'domain': "The email address must belong to {{domain}}"
    },
    'password': {
      'name': "Password",
      'mismatch': "Passwords do not match",
      'unconfirmed': "Password must be confirmed"
    },
    'phone': {
      'name': "Phone"
    }
  };


  self.user = {
    'notFound': "The user was not found."
  };

  self.auth = {
    'notFound': "The email provided is not registered.",
    'wrongPassword': "The password provided is incorrect.",
    'notActive' : "The account is not active"
  };

  self.listing = {
    'location': {
      'name': "location"
    },
    'user': {
      'name': "user id"
    },
    '_id': {
      'name': "listing id"
    }
  };

  var isRequired = function(title) {
    return "Please provide a " + title + ".";
  };

  [
    self.signup,
    self.listing
  ].forEach(function(form) {
    for (var field in form) {
      form[field].missing = isRequired(form[field].name);
    }
  });


  return self;
})();

if (typeof module !== "undefined") {
  module.exports = ERRORS;
}
