
var updateListings = function() {
  $.get('/api/listings', function(resp) {

    var scope = angular.element($('#listings')).scope();
    scope.$apply(function() {
      scope.listings = resp.data.listings;
    });
  });
};

$(function(){
  updateListings();
});
