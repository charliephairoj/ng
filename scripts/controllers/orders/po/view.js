function ViewPOCtrl($scope, PurchaseOrder, Supplier, Poller){
    $scope.poList = PurchaseOrder.query();
    /*
    Poller.poll($scope, function(){
        $scope.poList = PurchaseOrder.query();

    });
    
    */
}

ViewPOCtrl.$inject = ['$scope', 'PurchaseOrder', 'Supplier', 'Poller'];
