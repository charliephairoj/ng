function ViewShippingCtrl($scope, Shipping){
    $scope.shippingList = Shipping.query();
}
ViewShippingCtrl.$inject = ['$scope', 'Shipping'];


