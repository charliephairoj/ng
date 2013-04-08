'use strict';

angular.module('employeeApp')
  .controller('SupplyFoamViewCtrl', ['$scope', 'Foam', function ($scope, Foam) {
    $scope.foamList = Foam.poll().query();
    $scope.$on('$destroy', function(){
        Foam.stopPolling();
    });
  }]);
