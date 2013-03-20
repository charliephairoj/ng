//Foam Details

function FoamDetailsCtrl($scope, Foam, $routeParams, $location, Poller, Notification){
    
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
        Notification.display('Updating Foam...', false);
        $scope.foam.$save(function(){
            Notification.display('Foam Updated'); 
        });
    };
}

FoamDetailsCtrl.$inject = ['$scope', 'Foam', '$routeParams', '$location', 'Poller', 'Notification'];
