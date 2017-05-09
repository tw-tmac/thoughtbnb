module.exports = {
  before: function (browser) {
    browser.resizeWindow(1024, 768);
  },
  after : function (browser) {
    browser.end();
  },
  'Login screen' : function (browser) {
    var login = browser.page.login();
    var listing = browser.page.listing();

    login.navigate()
         .login('testing@thoughtbnb.com', 'test');
    listing.checkIfPageHasBeenLoaded();
  }
};
