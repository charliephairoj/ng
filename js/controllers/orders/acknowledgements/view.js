//Controllers for order




/*
 * Acknowledgement Area
 */

function ViewAcknowledgementCtrl($scope, Acknowledgement){
    $scope.ackList = Acknowledgement.query();
}

ViewAcknowledgementCtrl.$inject = ['$scope', 'Acknowledgement'];


