//Controllers for Products

/*
 * Upholstery Area
 */
function ViewUpholCtrl($scope, Upholstery, Notification){
    Notification.display('Loading Upholstery...');
    $scope.upholList = Upholstery.poll().query(function(){
        Notification.hide();
    });
    $scope.$on('$destroy', function(){
        Upholstery.stopPolling();
    })
   
   
}

ViewUpholCtrl.$inject = ['$scope', 'Upholstery', 'Notification']
//controller to add lumber


