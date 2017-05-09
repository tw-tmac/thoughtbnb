module.exports = {
  url: function() {
    return this.api.launchUrl;
  },
  elements: {
    citiesList: {
      selector: 'div#cities'
    }
  },
  commands: [{
    checkIfPageHasBeenLoaded: function(browser) {
      return this.waitForElementVisible('@citiesList', 3000)
    }
  }]
};
