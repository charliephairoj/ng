//controller to add foam

function AddFoamCtrl($scope, Foam, Supplier, $location, Poller){
    
    $scope.supplierList = Supplier.query();
    //Methods
    
    //Add Lumber
    $scope.save = function(){
        //declare vars
        var foam = new Foam();
        //set properties
        angular.copy($scope.foam, foam)
        foam.foamType = $scope.foam.type;
        foam.supplierID = $scope.foam.supplier.id;
        
        foam.$save(function(){
            $location.path('/foam');
        });
    };
    
    
    
}

AddFoamCtrl.$inject = ['$scope', 'Foam', 'Supplier', '$location', 'Poller'];