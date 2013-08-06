'use strict';

angular.module('employeeApp')
  	.controller('OrderPurchaseOrderViewCtrl', ['$scope', 'PurchaseOrder', '$filter', 'Notification',
  	function ($scope, PurchaseOrder, $filter, Notification) {
    	
    	//System wide message
    	Notification.display('Loading purchase orders...', false);
    	
    	//Poll Server for pos
    	var poList = PurchaseOrder.poll().query();
    	
    	//Search Mechanism
    	$scope.$watch('query', function(query){
    		$scope.data = $filter('filter')(poList, query);
    	});
    	
    	$scope.gridOptions = {
    		data: 'data',
    		columnDefs: [{field: 'id', displayName: 'PO#'},
    					 {field: 'supplier.name', displayName: 'Supplier'},
    					 ]
    	}
    	//Destructor
    	$scope.$on('$destroy', function(){
    		PurchaseOrder.stopPolling();
    	});
    	
  	}]);
