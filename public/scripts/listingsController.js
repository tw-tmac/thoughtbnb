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


});
