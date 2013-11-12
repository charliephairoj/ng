'use strict';

angular.module('employeeApp')
  .controller('ContactCustomerDetailsCtrl', function ($scope, Customer, $routeParams, $location, Notification, Geocoder) {
    $scope.customer =  Customer.get({'id':$routeParams.id}, function(){
        
        
        try{
            $scope.marker = $scope.map.createMarker({
                lat: $scope.customer.address.lat,
                lng: $scope.customer.adress.lng
            })
        }catch(e){
        	try{
	            var promise = Geocoder.geocode($scope.customer.addresses[0]);
	            promise.then(function(results){
	                updatePosition(results);
	            });
            }catch(e){
           		//console.log(e);
            }
        }
    }); 
    
    function updatePosition(results){
        if($scope.marker){
            $scope.marker.setPosition(results[0].geometry.location);
        }else{
            $scope.marker = $scope.map.createMarker(results[0].geometry.location);
            $scope.marker.onchange = function(latLng){
                //Set address lat and lng
                $scope.customer.address[0].lat = $scope.marker.lat;
                $scope.customer.address[0].lng = $scope.marker.lng;
            };
        }
      
        //Reposition the map to the marker
        $scope.map.setPosition(results[0].geometry.location);
      
        //Set the Address lat and lng
        $scope.customer.address[0].lat = $scope.marker.lat;
        $scope.customer.address[0].lng = $scope.marker.lng;
    }
    
    //Mehtods
    
    $scope.update = function(){
        Notification.display('Updating...', false);
        $scope.customer.$update(function(){
            Notification.display('Customer Save'); 
        }, function(){
            Notification.display('Unable to Update Customer');
        });
    };
    
    $scope.updatePosition = function(){
        var promise = Geocoder.geocode($scope.customer.address);
        promise.then(function(results){
            updatePosition(results);
        });
    }
    $scope.remove = function(){
        $scope.customer.$delete(function(){
            $location.path('/contact/customer');
        });
        
    };
  });
