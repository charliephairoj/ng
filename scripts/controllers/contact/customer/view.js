'use strict';

angular.module('employeeApp')
  	.controller('ContactCustomerViewCtrl', function ($scope, Customer, Notification, $location, Geocoder, $filter) {
	    
	    //Display system notification
	    Notification.display('Loading Customers...', false);
	    
	    //Poll the server for customers
	    $scope.customerList = Customer.poll().query(function(){
	        Notification.hide();
	    });
	    
	    //Search Mechanism
	    $scope.$watch('query', function(query){
	    	$scope.data = $filter('filter')($scope.customerList, query);
	    });
	    
	    //Grid Options
	    $scope.gridOptions = {
	    	data: 'data',
	    	columnDefs: [{field: 'id', displayName: 'ID', width: '50px'},
	    				 {field: 'name', displayName: 'Name'},
	    				 {field: 'addresses[0]',
	    				  displayName: 'Address',
	    				  cellTemplate: '{{row.getProperty(col.field).address1}}<br />\
	    				  				 {{row.getProperty(col.field).city}}, {{row.getProperty(col.field).territory}}<br />\
	    				  				 {{row.getProperty(col.field).country}} {{row.getProperty(col.field).zipcode}}'}],
	    	filterOptions: {useExternalFilter: true}
	    };
	    
	    $scope.customer = new Customer();
	    $scope.address = {};
	   
	    //Get the longitude and latitude of the customer's address
	    $scope.getLocation = function(){
	        if($scope.customer.address.address1 && $scope.customer.address.city && $scope.customer.address.territory &&
	             $scope.customer.address.country && $scope.customer.address.zipcode){
	              
	              //Get promise and bind to call backs
	              var promise = Geocoder.geocode($scope.customer.address);
	              promise.then(function(results){
	                  if($scope.marker){
	                      $scope.marker.setPosition(results[0].geometry.location);
	                  }else{
	                      $scope.marker = $scope.map.createMarker(results[0].geometry.location);
	                      $scope.marker.onchange = function(latLng){
	                          //Set address lat and lng
	                          $scope.customer.address.lat = $scope.marker.lat;
	                          $scope.customer.address.lng = $scope.marker.lng;
	                      };
	                  }
	                  
	                  //Reposition the map to the marker
	                  $scope.map.setPosition(results[0].geometry.location);
	                  
	                  //Set the Address lat and lng
	                  $scope.customer.address.lat = $scope.marker.lat;
	                  $scope.customer.address.lng = $scope.marker.lng;
	                  
	              }, function(status){
	                  console.log(status);
	              });
	          }
	    };
	    
	    //Save the Customer to the database
	    $scope.saveCustomer = function(){
	        //system display
	        Notification.display("Saving customer...");
	        //POST requests
	        $scope.customer.$save(function(){
	            $scope.addCustomer = false;
	            $scope.customerList.push(angular.copy($scope.customer));
	            $scope.customer = new Customer();
	        }, function(){
	            Notification.display("Unable to save customer", false);
	        });
	    };
	    
	    //Destructor
	    $scope.$on('$destroy', function(){
	    	Customer.stopPolling();
	    });
  	});
