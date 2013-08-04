/*
 * All shipped orders view
 */
angular.module('employeeApp')
  	.controller('OrderShippingViewCtrl', ['$scope', 'Shipping', function ($scope, Shipping) {
  		
  		//Poll the server for shipped items
    	$scope.shippingList = Shipping.poll().query();
    	
    	///Grid Options
    	$scope.gridOptions = {
    		data: 'shippingList',
    		columnDefs: [{field: 'id', displayName: 'Shipping#'},
    					 {field: 'acknowledgement.id', displayName: 'Ack#'},
    					 {field: 'customer.name', displayName: 'Customer'}
    					 {field: 'delivery_date', displayName: 'Delivery Date', fiter: 'date:"MMMM d, yyyy"'},
    					 {field: 'employee', displayName: 'Shipped By'}]
    	}
    	
    	//Destructor
    	$scope.$on('$destroy', function(){
    		//Stop polling
        	Shipping.stopPolling();
    	});
  	}]);
