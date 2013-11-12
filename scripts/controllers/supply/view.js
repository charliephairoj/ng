'use strict';

angular.module('employeeApp')
   .controller('SupplyViewCtrl', ['$scope', 'Supply', 'Notification', '$filter', 'Supplier',
   function ($scope, Supply, Notification, $filter, Supplier) {
     	
     	//system message
     	Notification.display('Loading supplies...', false);
     	
     	
     	$scope.supplyList = Supply.query(function(){
     		Notification.hide();
     	});
     	
     	var filterFn = function(){
      		$scope.data = $filter('orderBy')($filter('filter')($scope.supplyList, $scope.query), 'id', true);
      	};
      	
      	$scope.$watch('supplyList.length+query', filterFn);
     	
     	//Grid Options
     	$scope.gridOptions = {
     		data: 'data',
     		rowHeight: 150,
     		beforeSelectionChange: function(state){
	    		//$location.path('/contact/customer/'+state.entity.id);
	    		return false;
	    	},
     		columnDefs: [{field: 'id', displayName: 'ID', width: '75px'},
     					 {field: 'image.url',
     					  width: '150px',
     					  displayName: 'Example',
     					  cellClass: 'image',
     					  cellTemplate: '<img ng-src="{{row.getProperty(col.field)}}"/>'},
     					 {field: 'supplier.name', displayName: 'Supplier'},
     					 {field: 'description', displayName: 'Description'},
     					 {field: 'type', displayName: 'Type', width: '75px'},
     					 {field: 'quantity', displayName: 'Quantity in Stock'},
     					 {field: 'notes', displayName: 'Notes'}]
     	};
     	
     	
   }]);
