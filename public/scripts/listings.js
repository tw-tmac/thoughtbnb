$(function(){
  angular.element($('div#listings[ng-controller]')).controller().getAll();
  angular.element($('div#listings[ng-controller]')).controller().getAllCities();
});
