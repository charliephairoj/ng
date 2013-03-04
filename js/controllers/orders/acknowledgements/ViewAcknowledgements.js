//Controllers for order




/*
 * Acknowledgement Area
 */

function ViewAcknowledgementCtrl($scope, Acknowledgement){
    $scope.ackList = Acknowledgement.query(console.log($scope.ackList));
}

ViewAcknowledgementCtrl.$inject = ['$scope', 'Acknowledgement'];


