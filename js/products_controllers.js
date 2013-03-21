//Controllers for Products

/*
 * Upholstery Area
 */
function ViewUpholCtrl($scope, Upholstery, Notification){
    Notification.display('Loading Upholstery...');
    $scope.upholList = Upholstery.query(function(){
        Notification.hide();
    });
    /*
    Poller.poll($scope, function(){
        $scope.poList = PurchaseOrder.query();

    });
    
    */
   
   
}

ViewUpholCtrl.$inject = ['$scope', 'Upholstery', 'Notification']
//controller to add lumber


