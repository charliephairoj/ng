'use strict';

angular.module('employeeApp')
  .controller('ContactCustomerDetailsCtrl', function ($scope, Customer, $routeParams, $location, Notification) {
    $scope.customer =  Customer.get({'id':$routeParams.id}); 
    //Mehtods
    $scope.viewMap = function(){
        $scope.viewMap=true;
        $scope.map.setPosition({lat:$scope.customer.address.lat, lng:$scope.customer.address.lng});
         
    };
    
    $scope.update = function(){
        Notification.display('Updating...', false);
        
        $scope.customer.$save(function(){
            Notification.display('Updated');
        });
       
        
        
        
    };
    
    $scope.remove = function(){
        $scope.customer.$delete(function(){
            $location.path('/contact/customer');
        });
        
    };
  });
