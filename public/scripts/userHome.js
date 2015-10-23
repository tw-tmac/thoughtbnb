var initLocationSearch = function() {
  var input = document.getElementById('location');
  var autocomplete = new google.maps.places.Autocomplete(input);
};

$(function() {
  angular.element($('#location')).controller().initUserHome();
});
