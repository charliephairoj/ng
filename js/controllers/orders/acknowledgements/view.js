//Controllers for order




/*
 * Acknowledgement Area
 */

function ViewAcknowledgementCtrl($scope, Acknowledgement){
    $scope.ackList = Acknowledgement.poll().query();
    $scope.$on('$destroy', function(){
        Acknowledgement.stopPolling();
    })
}

ViewAcknowledgementCtrl.$inject = ['$scope', 'Acknowledgement'];


