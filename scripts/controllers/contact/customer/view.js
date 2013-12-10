
angular.module('employeeApp')
.controller('ContactCustomerViewCtrl', function ($scope, Customer, Notification, $location, Geocoder, $filter) {
	
	var fetching = false;
    //Display system notification
    Notification.display('Loading Customers...', false);
    
    //Poll the server for customers
    $scope.customers = Customer.query(function(){
        Notification.hide();
    });
    
    /*
     * Searches the server
     * 
     * This function will search the server via GET
     * with the query string as a parameter
     * if the query string is not undefined
     * 
     * The resources returned are then added to the 
     * list of they are are not already in the list
     */
    $scope.$watch('query', function (q) {
		if (q) {
			Customer.query({q:q}, function (resources) {
				for(var i=0; i<resources.length; i++) {
					if($scope.customers.indexOfById(resources[i]) == -1) {
						$scope.customers.push(resources[i]);
					}
				}
			});
		}
	});
    
    $scope.loadNext = function () {
		if(!fetching) {
			fetching = true;
			Customer.query({
				offset: $scope.customers.length,
				limit: 50
			}, function (resources) {
				fetching = false;
				for (var i=0; i<resources.length; i++) {
					$scope.customers.push(resources[i]);
				}
			});
		}
	};
    
   
    
    $scope.customer = new Customer();
    $scope.address = {};
   
    //Get the longitude and latitude of the customer's address
    $scope.getLocation = function (){
        if($scope.customer.address.address1 && $scope.customer.address.city && $scope.customer.address.territory &&
        $scope.customer.address.country && $scope.customer.address.zipcode){
              
			//Get promise and bind to call backs
			var promise = Geocoder.geocode($scope.customer.address);
			promise.then(function (results) {
				if($scope.marker){
					$scope.marker.setPosition(results[0].geometry.location);
				}else{
					$scope.marker = $scope.map.createMarker(results[0].geometry.location);
					$scope.marker.onchange = function (latLng) {
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
                  
			}, function (status) {
				console.log(status);
			});
		}
	};
    
    //Save the Customer to the database
    $scope.save = function () {
        //system display
        Notification.display("Saving customer...");
        //POST requests
        $scope.customer.$save(function () {
            $scope.addCustomer = false;
            $scope.customers.push(angular.copy($scope.customer));
            $scope.customer = new Customer();
        }, function () {
            Notification.display("Unable to save customer", false);
        });
    };
    
   
});
