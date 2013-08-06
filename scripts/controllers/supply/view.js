'use strict';

angular.module('employeeApp')
   .controller('SupplyViewCtrl', ['$scope', 'Supply', 'Notification', '$filter',
   function ($scope, Supply, Notification, $filter) {
     	
     	//system message
     	Notification.display('Loading supplies...', false);
     	
     	//Poll server for supplies
     	var supplyList = Supply.poll().query(function(){
     		Notification.hide();
     	});
     	
     	//Search Mechanism
     	$scope.$watch('query', function(query){
     		$scope.data = $filter('limitTo')($filter('filter')(supplyList, query), 50);
     	});
     	
     	//Grid Options
     	$scope.gridOptions = {
     		data: 'data',
     		rowHeight: 150,
     		columnDefs: [{field: 'id', displayName: 'ID', width: '75px'},
     					 {field: 'image.url',
     					  width: '150px',
     					  displayName: 'Example',
     					  cellClass: 'image',
     					  cellTemplate: '<img ng-src="{{row.getProperty(col.field)}}"/>'},
     					 {field: 'supplier.name', displayName: 'Supplier'},
     					 {field: 'description', displayName: 'Description'},
     					 {field: 'type', displayName: 'Type', width: '75px'},
     					 {field: 'quantity', displayName: 'Quantity in Stock'}]
     	};
     	
     	//Destructor
     	$scope.$on('$destroy', function(){;
			Supply.stopPolling();     	
     	});
   }]);
