'use strict';

angular.module('employeeApp')
  .controller('AccountingTransactionAddCtrl', ['$scope', 'Transaction', 'Notification', 
  function ($scope, Transaction, Notification) {
    $scope.transaction = new Transaction();
    
    $scope.save = function(){
        Notification.display('Saving Transaction...', false);
        $scope.transaction.$save(function(){
            Notification.display('Transaction Saved');
        });
    }
  }]);
