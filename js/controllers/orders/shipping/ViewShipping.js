function ViewShippingCtrl($scope, Shipping){
    $scope.shippingList = Shipping.query();
}
ViewAcknowledgementCtrl.$inject = ['$scope', 'Shipping'];


