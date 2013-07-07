'use strict';

angular.module('employeeApp')
  .controller('ContactCustomerViewCtrl', function ($scope, Customer, Notification, $location, Geocoder) {
    //Notification.display('Loading Customers...', false);
    $scope.customerList = Customer.query(function(){
        Notification.hide();});
    $scope.customer = new Customer();
    $scope.address = {};
   
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
    
    $scope.saveCustomer = function(){
        
        Notification.display("Saving customer...");
        
        $scope.customer.$save(function(){
            $scope.addCustomer = false;
            $scope.customerList.push(angular.copy($scope.customer));
            $scope.customer = new Customer();
        }, function(){
            Notification.display("Unable to save customer", false);
        });
    };
  });
