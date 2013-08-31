'use strict';

angular.module('employeeApp')
    .controller('OrderPurchaseOrderCreateCtrl', ['$scope', 'PurchaseOrder', 'Supplier', 'Supply', 'Notification', '$filter',
    function ($scope, PurchaseOrder, Supplier, Supply, Notification, $filter) {
    	
    	/*
    	 * Setup vars
    	 */
    	$scope.showSuppliers = false;
    	$scope.showSupplies = false;
    	$scope.supplierList = Supplier.poll().query();
    	$scope.po = new PurchaseOrder();
    	$scope.po.items = [];
    	
    	/*
    	 * Add a supplier to the purchase order
    	 */
    	$scope.addSupplier = function(supplier){
    		//Hide Modal
    		$scope.showSuppliers = false;
    		
    		$scope.po.supplier = supplier;
    		$scope.supplyList = $filter('filter')(Supply.query({supplier_id:supplier.id}, function(response) {
    			$scope.supplyList = $filter('filter')(response, supplier.name);
    		}), supplier.name);
 
    	}
    	
    	/*
    	 * Add an item to the purchase order
    	 */
    	$scope.addItem = function(item){
    		//Hide Modal
    		$scope.showSupplies = false;
    		var purchasedItem = angular.copy(item);
    		
    		delete purchasedItem.quantity;
    		$scope.po.items.push(purchasedItem);
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
	    		$scope.po.$save(function(response) {
	    			window.open(response.pdf.url);
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
