function TodayDeliveryCtrl($scope, Acknowledgement){
    $scope.date = new Date();
    $scope.ackList = Acknowledgement.query({date:$scope.date.toISOString()});
}
TodayDeliveryCtrl.$inject = ['$scope', 'Acknowledgement'];


