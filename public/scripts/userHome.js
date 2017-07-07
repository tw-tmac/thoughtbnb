var initLocationSearch = function() {
  var input = document.getElementById('location');
  var autocomplete = new google.maps.places.Autocomplete(input);
};

$(function() {
  angular.element($('#location')).controller().initUserHome();
});

$(function() {
  document.getElementById("uploadFiles").onchange = function() {
    var files = document.getElementById('uploadFiles').files;
    var file = files[0];
    if(file === null){
      return alert('No file selected.');
    }
    getSignedRequest(file);
  };
});

function getSignedRequest(file){
  var xhr = new XMLHttpRequest();
  xhr.open('GET', "/s3Url?file-name=" +file.name+ "file-type=" +file.type);
  xhr.onreadystatechange = function() {
    if(xhr.readyState === 4){
      if(xhr.status === 200){
        var response = JSON.parse(xhr.responseText);
        uploadFile(file, response.signedRequest, response.url);
      }
      else{
        alert('Could not get signed URL.');
      }
    }
  };
  xhr.send();
}

function uploadFile(file, signedRequest, url){
  var xhr = new XMLHttpRequest();
  xhr.open('PUT', signedRequest);
  xhr.onreadystatechange = function() {
    if(xhr.readyState === 4){
      if(xhr.status === 200){
      }
      else{
        alert('Could not upload file.');
      }
    }
  };
  xhr.send(file);
}
