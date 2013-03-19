//Foam Details

function FoamDetailsCtrl($scope, Foam, $routeParams, $location, Poller){
    
    Poller.poll($scope, function(){
        $scope.foam = Foam.get({'id':$routeParams.id});
    });
    
    $scope.remove = function(){
        $scope.foam.$delete(function(){
            $location.path('/foam');
        });
        $scope.foamList = Foam.query();
    };
    
    $scope.update = function(){
        $scope.foam.$save()
    };
}

FoamDetailsCtrl.$inject = ['$scope', 'Foam', '$routeParams', '$location', 'Poller'];
