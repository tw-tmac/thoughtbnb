var addAddress = function() {
  var listing = {
    'location': $('#location').val(),
    'description': $('#description').val()
  };
  $.post('/listings/', listing, function(data) {
    asif = data;
    updateListings();
  });
};

var updateListings = function() {
  $.get('/listings/me', function(resp) {

    var scope = angular.element($('#listings')).scope();
    scope.$apply(function() {
      scope.listings = resp.data.listings;
    });
  });
};

$(function() {
  $('#btnAdd').on('click', addAddress);
  updateListings();
});
