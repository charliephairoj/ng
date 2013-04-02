'use strict';



//View supplierList controller
function ViewSuppliersCtrl($scope, Supplier, Poller){
    
    $scope.supplierList = Supplier.poll().query();
    $scope.$on('$destroy', function(){
        Supplier.stopPolling(); 
    });
    
}

ViewSuppliersCtrl.$inject = ['$scope', 'Supplier', 'Poller'];

