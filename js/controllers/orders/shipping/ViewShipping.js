function ViewShippingCtrl($scope, Shipping){
    $scope.shippingList = Shipping.query(function(){console.log($scope.shippingList)});
}
ViewShippingCtrl.$inject = ['$scope', 'Shipping'];


