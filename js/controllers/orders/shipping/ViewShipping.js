function ViewShippingCtrl($scope, Shipping){
    $scope.shippingList = Shipping.poll().query(function(){console.log($scope.shippingList)});
    $scope.$on('$destroy', function(){
        Shipping.stopPolling();
    })
}
ViewShippingCtrl.$inject = ['$scope', 'Shipping'];


