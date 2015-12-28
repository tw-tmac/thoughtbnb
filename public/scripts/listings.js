$(function(){
  angular.element($('div#listings[ng-controller]')).controller().getAll();
  angular.element($('div#listings[ng-controller]')).controller().getAllCities();
});

function ListingsController($scope) {
    $scope.getCityCtrlScope = function() {
      return $scope;
    }
    $scope.search = {};
    $scope.search.location = "!!";
}
