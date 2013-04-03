//controller to add foam

function AddGlueCtrl($scope, Glue, Supplier, $location, Poller){
    
    $scope.supplierList = Supplier.query();
    $scope.glue = new Glue();
    //Methods
    
    //Add Lumber
    $scope.save = function(){
        
        $scope.glue.$save(function(){
            $location.path("/glue"); 
        });
    };
    
    
    
}

AddGlueCtrl.$inject = ['$scope', 'Glue', 'Supplier', '$location', 'Poller'];