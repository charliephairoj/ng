'use strict';

angular.module('employeeApp')
  .controller('ContactCustomerAddCtrl', function ($scope, Customer) {
    $scope.saveCustomer = function(){
        //New customer  
        var newCustomer = new Customer();
        //Apply the customer details first
        newCustomer.name = $scope.contact.name;
        newCustomer.email = $scope.contact.email;
        newCustomer.telephone = $scope.contact.email;
        newCustomer.fax = $scope.contact.email;
        newCustomer.$save();
    };
  });
