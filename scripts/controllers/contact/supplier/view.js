'use strict';

angular.module('employeeApp')
  .controller('ContactSupplierViewCtrl', function ($scope, Supplier) {
    $scope.supplierList = Supplier.poll().query();
    $scope.$on('$destroy', function(){
        Supplier.stopPolling(); 
    });
  });
