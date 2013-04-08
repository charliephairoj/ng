'use strict';

angular.module('employeeApp')
  .controller('OrderShippingTodayCtrl', ['$scope', 'Acknowledgement', function ($scope, Acknowledgement) {
    $scope.today = new Date();
    $scope.ackList = Acknowledgement.query({date:$scope.today.toISOString()});
  }]);
