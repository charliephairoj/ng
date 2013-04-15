'use strict';

angular.module('employeeApp')
  .controller('ContactCustomerAddCtrl', function ($scope, Customer, $location, Notification) {
      
      $scope.customer = new Customer
      
      $scope.save = function(){
          Notification.display('Saving Customer...', false);
          $scope.customer.$save(function(){
              Notification.display('Customer Saved');
              $location.path('/contact/customer');
          });
      };
  });
