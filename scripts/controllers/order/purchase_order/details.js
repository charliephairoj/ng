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
    			Notification.display("Updating purchase order...", false);
    			$scope.showCal = false;
    			$scope.po.status = 'Received';
    			//Receive items
    			for (var i=0; i<$scope.po.items.length; i++) {
    				$scope.po.items[i].status = 'Received';
    			}
    			
    			$scope.po.$update(function () {
    				Notification.display("Purchase order updated.");
    			});
    			
    		}else{
    			$scope.showCal = true;
    		}
    	}
  	}]);
