//Controllers for supplies




/*
 * Fabric Controllers
 */




//controller to add foam

function ViewFabricsCtrl($scope, Fabric){
    
    $scope.fabricList = Fabric.poll().query();
    $scope.$on('$destroy', function(){
        Fabric.stopPolling();
    });
    //Methods
    
    
    
    
}

ViewFabricsCtrl.$inject = ['$scope', 'Fabric'];




