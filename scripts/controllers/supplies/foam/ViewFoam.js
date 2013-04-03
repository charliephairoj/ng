function ViewFoamCtrl($scope, Foam, Poller){
    
    $scope.foamList = Foam.poll().query();
    $scope.$on('$destroy', function(){
        Foam.stopPolling();
    });
    
}
ViewFoamCtrl.$inject = ['$scope', 'Foam', 'Poller'];