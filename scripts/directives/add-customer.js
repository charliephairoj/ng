
angular.module('employeeApp.directives')
.directive('addCustomer', ['Customer', 'Notification', 'Geocoder', function (Customer, Notification, Geocoder) {
	return {
		templateUrl: 'views/templates/add-customer.html',
		replace: true,
		restrict: 'A',
		scope: {visible: '=addCustomer'},
		link: function postLink(scope, element, attrs) {
			//Controll the Visibility of the modal
			
			//If the value changes, then the watcher 
			//will be trigger. if the value is positive 
			//then the modal will fade in. If it is negative
			//then the modal will fade out
			scope.$watch('visible', function(val){
                if(val){
                    scope.modal.onhide = function(){
                        if(scope.$$phase == "$digest" || scope.$$phase == "$apply"){
                            scope.visible = false;
                        }else{
                            scope.$apply(function(){
                                scope.visible = false; 
                            });
                        }
                    };
                    scope.modal.show();
                }else{
                    scope.modal.hide();
                }
            });
            
            scope.customer = new Customer();
            
            //Get the longitude and latitude of the customer's address
			scope.getLocation = function (){
				if(scope.customer.address.address1 && scope.customer.address.city && scope.customer.address.territory &&
				scope.customer.address.country && scope.customer.address.zipcode && !scope.customer.address.user_defined_latlng){

					//Get promise and bind to call backs
					var promise = Geocoder.geocode(scope.customer.address);
					promise.then(function (results) {
						if(scope.marker){
							scope.marker.setPosition(results[0].geometry.location);
						}else{
							scope.marker = scope.map.createMarker(results[0].geometry.location);
							scope.marker.onchange = function (latLng) {
								//Set address lat and lng
								scope.customer.address.lat = scope.marker.lat;
								scope.customer.address.lng = scope.marker.lng;
								scope.customer.address.user_defined_latlng = true;
							};
						}

						//Reposition the map to the marker
						scope.map.setPosition(results[0].geometry.location);

						//Set the Address lat and lng
						scope.customer.address.lat = scope.marker.lat;
						scope.customer.address.lng = scope.marker.lng;

					}, function (status) {
						console.error(status);
					});
				}
			};
			
            scope.add = function(){
				if (scope.form.$valid) {
					Notification.display('Adding customer:+ '+scope.customer.first_name+'...', false);
					scope.customer.$save(function (response) {
						Notification.display(scope.customer.first_name+' added');
						scope.visible = false;
						scope.customer = new Customer();
					}, function (reason) {
						console.error(reason);
					});
				} else {
					Notification.display('Please fill out the form properly');
				}
			};
		}
	};
}]);
