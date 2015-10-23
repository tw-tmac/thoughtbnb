var app = angular.module('thoughtbnb', []);
app.controller('ListingsController', function($scope, $http) {
  var controller = this;

  $scope.listings = [];
  $scope.formError = "";

  controller.getAll = function() {
    $http.get('/api/listings').success(function(response) {
     $scope.listings = response.data.listings;
    });
  };

  controller.resetForm = function() {
    $scope.formError = "";
    controller.newLocation = "";
    controller.newDescription = "";
    controller.currentListing = null;
      controller.editing = false;
  };

  controller.add = function() {
    var listingData = {
      location: controller.newLocation,
      description: controller.newDescription
    };
    var request = $http.post('/api/listings', listingData).then(function(response) {
      if (response.data.error) {
        $scope.formError = response.data.error;
        return false;
      }
      controller.getAll();
      controller.resetForm();
    });
  };

  controller.currentListing = null;
  controller.editing = false;

  controller.update = function() {
    var listingPatch = {
      '_id': controller.currentListing._id,
      'location': controller.newLocation,
      'description': controller.newDescription
    };
    $http.patch('/api/listings/'+listingPatch._id, listingPatch).then(function(response) {
      if (response.data.error) {
        $scope.formError = response.data.error;
        return false;
      }
      controller.getAll();
      controller.resetForm();
    });
  };

  controller.edit = function(id) {
    $http.get('/api/listings/'+id).then(function(response) {
      controller.currentListing = response.data.data.listings[0];
      controller.currentListing.user = controller.currentListing.user._id;
      controller.newLocation = controller.currentListing.location;
      controller.newDescription = controller.currentListing.description;
      controller.editing = true;
      $('#description').focus();
    });
  };

  angular.element(document).ready(function () {
    controller.getAll();
  });

});
