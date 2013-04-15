'use strict';

angular.module('employeeApp')
  .controller('ContactCustomerViewCtrl', function ($scope, Customer, Notification, $location) {
    //Notification.display('Loading Customers...', false);
    $scope.customerList = Customer.query(function(){
        Notification.hide();});
    $scope.customer = new Customer();
    $scope.address = {};
    
    /*
    //Watchers
    $scope.$watch('marker', function(){
        if($scope.marker){
            if($scope.marker.lng && $scope.marker.lat){
                
                $scope.address.lng = $scope.marker.lng;
                $scope.address.lat = $scope.marker.lat; 
            }
        }
        
        
    }, true);
    //Mehtods
    
    $scope.getLocation = function(){
        var position = $scope.map.getPosition($scope.address);
        angular.extend($scope.address, position);
    };
    */
    $scope.saveCustomer = function(){
        
        
        $scope.customer.$save(function(){
            $scope.add_customer=false;
            $location.path("/contact/customer");
            
        });
    };
  });
