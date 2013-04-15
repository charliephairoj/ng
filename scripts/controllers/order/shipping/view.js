'use strict';

angular.module('employeeApp')
  .controller('OrderShippingViewCtrl', ['$scope', 'Shipping', function ($scope, Shipping) {
    $scope.shippingList = Shipping.poll().query(function(){console.log($scope.shippingList)});
    $scope.$on('$destroy', function(){
        Shipping.stopPolling();
    });
  }]);
