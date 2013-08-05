'use strict';

angular.module('employeeApp')
   .controller('SupplyViewCtrl', ['$scope', 'Supply', 'Notification', function ($scope, Supply, Notification) {
     	
     	//system message
     	Notification.display('Loading supplies...', false):
     	
     	//Poll server for supplies
     	$scope.supplyList = Supply.poll().query();
     	
     	//Grid Options
     	$scope.gridOptions = {
     		data: 'supplyList',
     		columnDefs: [{field: 'id', displayName: 'ID'},
     					 {field: 'supplier.name', displayName: 'Supplier'}
     					 {field: 'description', displayName: 'Description'},
     					 {field: 'quantity', displayName: 'Quantity in Stock'}]
     	};
     	
     	//Destructor
     	$scope.$on('$destroy', function(){;
			Supply.stopPolling():     	
     	});
   }]);
