function AddTransactionCtrl($scope, Transaction, Notification){
    $scope.transaction = new Transaction();
    
    $scope.save = function(){
        Notification.display('Saving Transaction...', false);
        $scope.transaction.$save(function(){
            Notification.display('Transaction Saved');
        });
    }
}

AddTransactionCtrl.$inject = ['$scope', 'Transaction', 'Notification'];
