//Controllers for supplies




/*
 * Fabric Controllers
 */




//controller to add foam

function ViewFabricsCtrl($scope, Fabric){
    
    $scope.fabricList = Fabric.query();
    
    //Methods
    
    
    
    
}

ViewFabricsCtrl.$inject = ['$scope', 'Fabric'];




