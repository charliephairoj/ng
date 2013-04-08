'use strict';

angular.module('employeeApp')
  .controller('ProductModelViewCtrl', ['$scope', 'Model', function ($scope, Model) {
    $scope.modelList = Model.poll().query();
    $scope.$on('$destroy', function(){
        Model.stopPolling();
    });
  }]);
