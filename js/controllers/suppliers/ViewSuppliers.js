'use strict';



//View supplierList controller
function ViewSuppliersCtrl($scope, Supplier, Poller){
    
    //Poller.poll($scope, function(){
        $scope.supplierList = Supplier.query();
    //});
    
    
}

ViewSuppliersCtrl.$inject = ['$scope', 'Supplier', 'Poller'];

