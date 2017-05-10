module.exports = {
  url: function() {
    return this.api.launchUrl;
  },
  elements: {
    citiesList: {
      selector: 'div#cities'
    },
    anywhereButton: {
      //find a better way to do this!
      selector: 'div#btnCities:last-child'
    }
  },
  commands: [{
    checkIfPageHasBeenLoaded: function() {
      return this.waitForElementVisible('@citiesList', 3000);
    },
    clickAnywhereButton: function() {
      this.waitForElementVisible('@anywhereButton', 3000);
      return this.click("@anywhereButton");
    },
    checkIfNumbersOfListingIsEqualsTo: function(expectedNumbersOfListing) {
      this.api.elements("css selector", "#citiesListings", function (result) {
         this.assert.equal(result.value.length, expectedNumbersOfListing, 'listing');
      });
    }
  }]
};
