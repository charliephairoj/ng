'use strict';

angular.module('employeeApp')
   .controller('SupplyViewCtrl', ['$scope', 'Supply', 'Notification', '$filter', 'Supplier',
   function ($scope, Supply, Notification, $filter, Supplier) {
     	
     	//system message
     	Notification.display('Loading supplies...', false);
     	
     	//New Supply
     	
     	$scope.showWidth = function(){
     		var units = $scope.newSupply.units;
     		return units == "meter" || units == "piece" ? true : false;
     	}
     	
     	$scope.showDepth = function(){
     		var units = $scope.newSupply.units;
     		return units == "piece" ? true : false;
     	}
     	
     	$scope.showHeight = function(){
     		var units = $scope.newSupply.units;
     		return units == "piece" ? true : false;
     	}
     	
     	$scope.addSupply = function(){
     		$scope.newSupply.$save();
     		$scope.showAddSupply = false;
     	}
     	
     	//Set Vars
     	$scope.newSupply = new Supply();
     	$scope.newSupply.units = 'piece';
     	$scope.supplierList = Supplier.query();
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
