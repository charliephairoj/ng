'use strict';

angular.module('employeeApp')
  	.controller('OrderAcknowledgementViewCtrl', ['$scope', 'Acknowledgement', 'Notification', '$location',
  	function ($scope, Acknowledgement, Notification, $location) {
  		
  		//Display Program Notification
      	Notification.display('Loading Acknowledgements...');
      	
      	//Poll the server for acknowledgements
      	$scope.ackList = Acknowledgement.poll().query();
      	
      	//Grid Options
      	$scope.gridOptions = {
      		data: 'ackList',
      		columnDefs: [{field: 'id', displayName: 'Ack#'},
      					 {field: 'customer.name', displayName: 'Customer'},
      					 {field: 'status', 
      				      displayName: 'Status',
      				      cellTemplate: '<div ng-class="{acknowledged:ack.status == "ACKNOWLEDGED"",shipped:ack.status=="SHIPPED"}">\
      				      					{{ack.status}}\
      				      				</div>'}
      					 {field: 'delivery_date', displayName: 'Delivery Date', filter: 'date:"MMMM d, yyyy"'}, 
      					 {field: 'order_date', displayName: 'Order Date', filter: 'date:"MMMM d, yyyy"'}]
      	}
      
      	//Destructor
      	$scope.$on('$destroy', function(){
      		//Stop Polling
          	Acknowledgement.stopPolling();
     	});
  	}]);
