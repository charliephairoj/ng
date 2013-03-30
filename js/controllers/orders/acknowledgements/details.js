//Controllers for order




/*
 * Acknowledgement Area
 */

function AcknowledgementDetailsCtrl($scope, Acknowledgement, $routeParams){
    $scope.showCal = false;
    $scope.acknowledgement = Acknowledgement.get({'id':$routeParams.id}, function(response){
       console.log(response); 
    });
    
    $scope.updateDeliveryDate = function(){
        $scope.showCal = false;
        
    }
}

AcknowledgementDetailsCtrl.$inject = ['$scope', 'Acknowledgement', '$routeParams'];


