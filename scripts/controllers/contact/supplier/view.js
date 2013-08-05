'use strict';

angular.module('employeeApp')
  	.controller('ContactSupplierViewCtrl', ['$scope', 'Supplier', 'Notification', '$filter',
  	function ($scope, Supplier, Notification, $filter) {
  		
  		//System message
  		Notification.display('Loading suppliers...', false);
  		
  		//Poll the server for suppliers
	    var supplierList = Supplier.poll().query(function(){
	    	Notification.hide();
	    });
	    
	    //Search Mechanism
	    $scope.$watch('query', function(query){
	    	$scope.data = $filter('filter')(supplierList, query);
	    });
	    //Grid Options
	    $scope.gridOptions = {
	    	data: 'data', 
	    	columnDefs: [{field: 'id', displayName: 'ID', width:'50px'},
	    				 {field: 'name', displayName: 'Supplier'}]
	    }
	    
	    //Destructor
	    $scope.$on('$destroy', function(){
	        Supplier.stopPolling(); 
	    });
  	}]);
