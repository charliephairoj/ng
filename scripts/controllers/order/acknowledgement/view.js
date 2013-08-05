'use strict';

angular.module('employeeApp')
  	.controller('OrderAcknowledgementViewCtrl', ['$scope', 'Acknowledgement', 'Notification', '$location', '$filter',
  	function ($scope, Acknowledgement, Notification, $location, $filter) {
  		
  		//Display Program Notification
      	Notification.display('Loading Acknowledgements...');
      	
      	//Poll the server for acknowledgements
      	var ackList = Acknowledgement.poll().query();
      	
      	$scope.$watch('query', function(query){
      		$scope.data = $filter('orderBy')($filter('filter')(ackList, query), 'id', true);
      	});
      	
      	//Grid Options
      	$scope.gridOptions = {
      		data: 'data',
      		columnDefs: [{field: 'id', displayName: 'Ack#', width:'75px'},
      					 {field: 'customer.name', displayName: 'Customer'},
      					 {field: 'status', 
      				      displayName: 'Status',
      				      cellTemplate: '<div>\
      				      					{{row.getProperty(col.field)}}\
      				      				</div>'},
      					 {field: 'delivery_date', displayName: 'Delivery Date', cellFilter: 'date:"MMMM d, yyyy"'}, 
      					 {field: 'time_created', displayName: 'Order Date', cellFilter: 'date:"MMMM d, yyyy"'}]
      	}
      
      	//Destructor
      	$scope.$on('$destroy', function(){
      		//Stop Polling
          	Acknowledgement.stopPolling();
     	});
  	}]);
