'use strict';

angular.module('employeeApp')
  	.controller('ContactSupplierViewCtrl', ['$scope', 'Supplier', 'Notification', 
  	function ($scope, Supplier, Notification) {
  		
  		//System message
  		Notification.display('Loading suppliers...', false);
  		
  		//Poll the server for suppliers
	    $scope.supplierList = Supplier.poll().query(function(){
	    	Notification.hide();
	    });
	    
	    //Grid Options
	    $scope.gridOptions = {
	    	data: 'supplierList', 
	    	columnDefs: [{field: 'id', displayName: 'ID'},
	    				 {field: 'name', displayName: 'Supplier'}]
	    }
	    
	    //Destructor
	    $scope.$on('$destroy', function(){
	        Supplier.stopPolling(); 
	    });
  	}]);
