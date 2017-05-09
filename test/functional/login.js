module.exports = {
  'Login screen' : function (browser) {
    browser
      .url('http://192.168.33.15:3000')
      .waitForElementVisible('body', 1000)
      .setValue('input[id=email]', 'testing@thoughtbnb.com')
      .setValue('input[id=password]', 'test')
      .click('button[id=btnSignin]')
      .pause(1000)
      .assert.containsText('div#cities', 'Where would you like to go')
      .end();
  }
};
