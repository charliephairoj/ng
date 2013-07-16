'use strict';

angular.module('employeeApp')
    .controller('ProductInventoryCtrl', ['$scope','AcknowledgementItem',
    function ($scope, AcknowledgementItem) {
               
        $scope.itemList = AcknowledgementItem.poll().query({status:"inventory"});
        $scope.addInventory = false;
        
        $scope.addProduct = function(product){
            $scope.item = new AcknowledgementItem();
            angular.extend($scope.item, product);
            $scope.item.status = "INVENTORY";
            
            $scope.item.$save(function(){
                $scope.itemList.push(angular.copy($scope.item));
            });
        };
        
       
        
        
        $scope.$on('$destroy', function(){
            $scope.AcknowledgementItem.stopPolling(); 
        });
    }]);
