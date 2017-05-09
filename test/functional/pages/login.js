module.exports = {
  url: function() {
    return this.api.launchUrl;
  },
  elements: {
    usernameField: {
      selector: 'input[id=email]'
    },
    passwordField: {
      selector: 'input[id=password]'
    },
    submit: {
      selector: 'button[id=btnSignin]'
    }
  },
  commands: [{
    login: function(username, password) {
      return this.setValue('@usernameField', username)
                 .setValue('@passwordField', password)
                 .click('@submit');
    }
  }]
};
