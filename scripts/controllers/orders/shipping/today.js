function TodayDeliveryCtrl($scope, Acknowledgement){
    $scope.today = new Date();
    $scope.ackList = Acknowledgement.query({date:$scope.today.toISOString()});
}
TodayDeliveryCtrl.$inject = ['$scope', 'Acknowledgement'];


