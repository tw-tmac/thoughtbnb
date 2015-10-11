var addAddress = function() {
  var listing = {
    'location': $('#location').val(),
    'description': $('#description').val()
  };
  $.post('/listings/', listing, function(data) {
    asif = data;
    alert(data);
  });
};

$(function() {
  $('#btnAdd').on('click', addAddress);
});
