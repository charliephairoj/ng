//Foam Details

function GlueDetailsCtrl($scope, Glue, $routeParams, $location, Poller){
    
    $scope.glue = Glue.get({'id':$routeParams.id});
    
    $scope.remove = function(){
        $scope.glue.$delete(function(){
            $location.path('/glue');
        });
        $scope.glueList = Glue.query();
    };
    
    $scope.update = function(){
        $scope.glue.$save()
    };
}

GlueDetailsCtrl.$inject = ['$scope', 'Glue', '$routeParams', '$location', 'Poller'];
