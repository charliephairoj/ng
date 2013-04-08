'use strict';

angular.module('employeeApp')
  .controller('OrderAcknowledgementViewCtrl', ['$scope', 'Acknowledgement', function ($scope, Acknowledgement) {
    $scope.ackList = Acknowledgement.poll().query();
    $scope.$on('$destroy', function(){
        Acknowledgement.stopPolling();
    });
  }]);
