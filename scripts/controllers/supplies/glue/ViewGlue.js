function ViewGlueCtrl($scope, Glue, Poller){
    
    $scope.glueList = Glue.query(function(){
        console.log($scope.glueList);
    });
    /*
    Poller.poll($scope, function(){
        $scope.foamList = Foam.query();
    });
    */
    
}
ViewGlueCtrl.$inject = ['$scope', 'Glue', 'Poller'];