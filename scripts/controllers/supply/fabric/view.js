'use strict';

angular.module('employeeApp')
  .controller('SupplyFabricViewCtrl', ['$scope', 'Fabric', function ($scope, Fabric) {
    $scope.fabricList = Fabric.poll().query();
    $scope.$on('$destroy', function(){
        Fabric.stopPolling();
    });
  }]);
