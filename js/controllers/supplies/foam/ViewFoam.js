function ViewFoamCtrl($scope, Foam, Poller){
    
    $scope.foamList = Foam.query(function(){
        console.log($scope.foamList);
    });
    /*
    Poller.poll($scope, function(){
        $scope.foamList = Foam.query();
    });
    */
    
}
ViewFoamCtrl.$inject = ['$scope', 'Foam', 'Poller'];