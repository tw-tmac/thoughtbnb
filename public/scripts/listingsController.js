app.controller('ListingsController', function($scope, $http) {
  var controller = this;

  $scope.listings = [];
  $scope.formError = "";

  controller.getAll = function() {
    $http.get('/api/listings').success(function(response) {
     $scope.listings = response.data.listings;
    });
  };

  controller.getAllCities = function() {
    $http.get('/api/cities').success(function(response) {
     $scope.cities = response.data.cities;
    });
  };

  controller.getMyListings = function() {
    $http.get('/api/listings/me').success(function(response) {
     $scope.listings = response.data.listings;
    });
  };

  controller.resetForm = function() {
    $scope.formError = "";
    controller.newLocation = "";
    controller.newDescription = "";
    controller.newAvailable = true;
    controller.currentListing = null;
    controller.editing = false;
  };

  controller.add = function() {
    controller.newLocation = $('#location').val();
    var listingData = {
      location: controller.newLocation,
      description: controller.newDescription
    };
    var request = $http.post('/api/listings', listingData).then(function(response) {
      if (response.data.error) {
        $scope.formError = response.data.error;
        return false;
      }
      controller.getMyListings();
      controller.resetForm();
    });
  };

  controller.currentListing = null;
  controller.editing = false;

  controller.update = function() {
    controller.newLocation = $('#location').val();
    var listingPatch = {
      '_id': controller.currentListing._id,
      'location': controller.newLocation,
      'description': controller.newDescription,
      'available': controller.newAvailable
    };
    $http.patch('/api/listings/'+listingPatch._id, listingPatch).then(function(response) {
      if (response.data.error) {
        $scope.formError = response.data.error;
        return false;
      }
      controller.getMyListings();
      controller.resetForm();
    });
  };

  controller.edit = function(id) {
    $http.get('/api/listings/'+id).then(function(response) {
      controller.currentListing = response.data.data.listings[0];
      asif = controller.currentListing;
      controller.currentListing.user = controller.currentListing.user._id;
      controller.newLocation = controller.currentListing.location;
      controller.newDescription = controller.currentListing.description;
      controller.newAvailable = controller.currentListing.available;
      controller.editing = true;
      $('#description').focus();
    });
  };

  controller.initUserHome = function() {
    controller.resetForm();
    controller.getMyListings();
  };

});
