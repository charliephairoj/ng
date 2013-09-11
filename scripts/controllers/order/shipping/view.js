/*
 * All shipped orders view
 */
angular.module('employeeApp')
  	.controller('OrderShippingViewCtrl', ['$scope', 'Shipping', '$filter', function ($scope, Shipping, $filter) {
  		
  		//Poll the server for shipped items
    	$scope.shippingList = Shipping.poll().query();
    	
    	var filterFn = function(){
      		$scope.data = $filter('orderBy')($filter('filter')($scope.shippingList, $scope.query), 'id', true);
      	};
      	
      	$scope.$watch('shippingList.length+query', filterFn);
    	
    	///Grid Options
    	$scope.gridOptions = {
    		data: 'data',
    		beforeSelectionChange: function(state){
	    		$location.path('/order/shipping/'+state.entity.id);
	    		return false;
	    	},
    		columnDefs: [{field: 'id', displayName: 'Shipping#'},
    					 {field: 'acknowledgement.id', displayName: 'Ack#'},
    					 {field: 'customer.name', displayName: 'Customer'},
    					 {field: 'delivery_date', displayName: 'Delivery Date', fiter: 'date:"MMMM d, yyyy"'},
    					 {field: 'employee', displayName: 'Shipped By'}]
    	}
    	
    	//Destructor
    	$scope.$on('$destroy', function(){
    		//Stop polling
        	Shipping.stopPolling();
    	});
  	}]);
