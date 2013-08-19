'use strict';

angular.module('employeeApp')
    .controller('OrderPurchaseOrderCreateCtrl', ['$scope', 'PurchaseOrder', 'Supplier', 'Supply', 'Notification',
    function ($scope, PurchaseOrder, Supplier, Supply, Notification) {
    	
    	/*
    	 * Setup vars
    	 */
    	$scope.supplierList = Supplier.poll().query();
    	$scope.po = new PurchaseOrder();
    	$scope.po.items = [];
    	
    	/*
    	 * Add a supplier to the purchase order
    	 */
    	$scope.addSupplier = function(supplier){
    		$scope.po.supplier = supplier;
    		$scope.supplyList = Supply.query({supplier_id:supplier.id});
    	}
    	
    	/*
    	 * Add an item to the purchase order
    	 */
    	$scope.addItem = function(item){
    		$scope.po.items.push(angular.copy(item));
    	};
    	
    	/*
    	 * Remove an item fro the purchase order
    	 */
    	$scope.removeItem = function(index) {
    		$scope.po.items.splice(index, 1);
    	}
    	
    	/*
    	 * Verfication of order
    	 */
    	$scope.verifyOrder = function() {
    		if(!$scope.po.hasOwnProperty('supplier')) {
    			return false;
    		}
    		
    		if($scope.po.items.length <= 0) {
    			return false;
    		}
    		
    		return true;
    	};
    	
    	/*
    	 * Save the purchase order to the server
    	 */
    	$scope.save = function() {
    		if($scope.verifyOrder()) {
	    		Notification.display('Creating purchase order...', false);
	    		$scope.po.$save(function() {
	    			Notification.display('Purchase order created.');
	    		}, function() {
	    			Notification.display('ooops');
	    		});
    		}
    	};
    	
    	/*
    	 * Destructor
    	 */
    	$scope.$on('$destroy', function() {
 			Supplier.stopPolling();
    	});
    }]);
