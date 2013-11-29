'use strict';

angular.module('employeeApp')
  	.controller('OrderPurchaseOrderDetailsCtrl', ['$scope', '$routeParams', 'PurchaseOrder', 'Notification',
  	function ($scope, $routeParams, PurchaseOrder, Notification) {
    	
    	Notification.display('Loading purchase order '+$routeParams.id+'...', false);
    	
    	$scope.po = PurchaseOrder.get({id:$routeParams.id, pdf:true}, function () {
    		Notification.hide();
    	});
    	
    	$scope.viewPDF = function () {
    		window.open($scope.po.pdf.url);	
    	};
    	
    	$scope.receive = function () {
    		if($scope.po.receive_date) {
    			Notification.display("Updating purchase order...", false);
    			$scope.showCal = false;
    			//Modify the order
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
    	};
    	
    	$scope.pay = function () {
    		Notification.display("Updating purchase order...", false);
    		
    		//Modify the order
    		$scope.po.status = 'Paid';
    		
    		//Pay for the items
    		for (var i=0; i<$scope.po.items.length; i++) {
    			$scope.po.items[i].status = 'Paid';
    		}
    		
    		$scope.po.$update(function () {
    			Notification.display("Purchase order updated.")
    		});
    	}
  	}]);
