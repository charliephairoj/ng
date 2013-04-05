function ViewTransactionsCtrl($scope, Transaction){
    //$scope.transactionList = Transaction.poll().query();
    var test = {id:1,
                               name:'test',
                               vender:'JPMorgan Chase Bank',
                               amount:'100.11',
                               currency:'USD',
                               type:'credit'};
    $scope.transactionList = [];
    for(var i=0; i<100; i++){
        $scope.transactionList.push(test);
    }
        
}

ViewTransactionsCtrl.$inject = ['$scope', 'Transaction'];
