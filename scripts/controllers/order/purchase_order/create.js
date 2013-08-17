'use strict';

angular.module('employeeApp')
    .controller('OrderPurchaseOrderCreateCtrl', ['$scope', 'PurchaseOrder', 'Supplier', 'Notification',
    function ($scope, PurchaseOrder, Supplier, Notification) {
    	
    	/*
    	 * Setup vars
    	 */
    	$scope.supplierList = Supplier.poll().query();
    	$scope.po = new PurchaseOrder();
    	$scope.po.items = [];
    	
    	/*
    	 * Add an item to the purchase order
    	 */
    	$scope.add = function(item){
    		$scope.po.items.push(angular.copy(item));
    	};
    	
    	/*
    	 * Verfication of order
    	 */
    	$scope.verifyOrder = function() {
    		if($scope.po.hasOwnProperty('id')) {
    			return false;
    		}
    		
    		if($scope.po.items.length <= 0) {
    			return false;
    		}
    	};
    	
    	/*
    	 * Save the purchase order to the server
    	 */
    	$scope.save = function() {
    		Notification.display('Creating purchase order...', false);
    		$scope.po.$save(function() {
    			Notification.display('Purchase order created.');
    		}, function() {
    			Notification.display('ooops');
    		});
    	};
    	
    	/*
    	 * Destructor
    	 */
    	$scope.$on('$destroy', function() {
 			Supplier.stopPolling();
    	});
    }]);
