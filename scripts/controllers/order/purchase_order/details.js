'use strict';

angular.module('employeeApp')
  	.controller('OrderPurchaseOrderDetailsCtrl', ['$scope', '$routeParams', 'PurchaseOrder', 'Notification',
  	function ($scope, $routeParams, PurchaseOrder, Notification) {
    	
    	Notification.display('Loading purchase order '+$routeParams.id+'...', false);
    	
    	$scope.po = PurchaseOrder.get({id:$routeParams.id}, function () {
    		Notification.hide();
    	});
    	
    	$scope.receive = function () {
    		if($scope.po.receive_date) {
    			$scope.showCal = false;
    			
    			
    			
    		}else{
    			$scope.showCal = true;
    		}
    	}
  	}]);
