'use strict';

angular.module('employeeApp')
  	.controller('OrderPurchaseOrderViewCtrl', ['$scope', 'PurchaseOrder', '$filter', 'Notification',
  	function ($scope, PurchaseOrder, $filter, Notification) {
    	
    	//System wide message
    	Notification.display('Loading purchase orders...', false);
    	
    	//Poll Server for pos
    	$scope.poList = PurchaseOrder.poll().query();
    	
    	var filterFn = function(){
      		$scope.data = $filter('orderBy')($filter('filter')($scope.poList, $scope.query), 'id', true);
      	};
      	
      	$scope.$watch('ackList.length', filterFn);
      	$scope.$watch('query', filterFn);
    	
    	
    	$scope.gridOptions = {
    		data: 'data',
    		beforeSelectionChange: function(state){
	    		$location.path('/order/purchase_order/'+state.entity.id);
	    		return false;
	    	},
    		columnDefs: [{field: 'id', displayName: 'PO#'},
    					 {field: 'supplier.name', displayName: 'Supplier'},
    					 {field: 'order_date', displayName: 'Order Date', cellFilter: 'date:"MMMM d, yyyy"'},
    					 {field: 'total', displayName:'Total'}
    					 ]
    	}
    	//Destructor
    	$scope.$on('$destroy', function(){
    		PurchaseOrder.stopPolling();
    	});
    	
  	}]);
