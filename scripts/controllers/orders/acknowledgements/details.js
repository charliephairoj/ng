//Controllers for order




/*
 * Acknowledgement Area
 */

function AcknowledgementDetailsCtrl($scope, Acknowledgement, $routeParams, Notification){
    $scope.showCal = false;
    $scope.acknowledgement = Acknowledgement.get({'id':$routeParams.id});
    
    $scope.updateDeliveryDate = function(){
        $scope.showCal = false;
    };
    
    $scope.save = function(){
        Notification.display('Saving Acknowledgement...', false);
        $scope.acknowledgement.$save(function(){
            Notification.display('Acknowledgement '+$scope.acknowledgement.id+' Saved');
        });
    };
}

AcknowledgementDetailsCtrl.$inject = ['$scope', 'Acknowledgement', '$routeParams', 'Notification'];


