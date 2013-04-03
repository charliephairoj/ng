'use strict';

/* Controllers */







function ViewCustomersCtrl($scope, Customer, Notification){
    Notification.display('Loading Customers...', false);
    $scope.customerList = Customer.query(function(){
        Notification.hide();});
    $scope.customer = {};
    $scope.address = {};
    
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
    
    $scope.saveCustomer = function(){
        //New customer  
        var newCustomer = new Customer();
        //Apply the customer details first
        angular.copy($scope.customer, newCustomer);
        newCustomer.address = {};
        angular.copy($scope.address, newCustomer.address);
        
        newCustomer.$save(function(){
            $scope.add_customer=false;
            $scope.customerList = Customer.query();
            
        });
    };
}

ViewCustomersCtrl.$inject = ['$scope', 'Customer', 'Notification'];


