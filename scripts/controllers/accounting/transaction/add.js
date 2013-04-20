'use strict';

angular.module('employeeApp')
  .controller('AccountingTransactionAddCtrl', ['$scope', 'Transaction', 'Notification', '$location',
  function ($scope, Transaction, Notification, $location) {
    $scope.transaction = new Transaction();
    
    $scope.save = function(){
        Notification.display('Saving Transaction...', false);
        $scope.transaction.$save(function(){
            Notification.display('Transaction Saved');
            $location.path('/accounting/transaction');
        });
    }
  }]);
