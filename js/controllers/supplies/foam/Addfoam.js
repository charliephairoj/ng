//controller to add foam

function AddFoamCtrl($scope, Foam, Supplier, $location, Poller){
    
    $scope.supplierList = Supplier.query();
    $scope.foam = new Foam();
    //Methods
    
    //Add Lumber
    $scope.save = function(){       
        $scope.foam.$save(function(){
            $location.path('/foam');
        });
    };
    
    
    
}

AddFoamCtrl.$inject = ['$scope', 'Foam', 'Supplier', '$location', 'Poller'];