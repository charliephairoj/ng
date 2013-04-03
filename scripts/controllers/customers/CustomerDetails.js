'use strict';

/* Controllers */








function CustomerDetailsCtrl($scope, Customer, $routeParams, $location, Notification){
    
    $scope.customer =  Customer.get({'id':$routeParams.id}); 
    //Mehtods
    $scope.viewMap = function(){
        $scope.viewMap=true;
        $scope.map.setPosition({lat:$scope.customer.address.lat, lng:$scope.customer.address.lng});
         
    };
    
    $scope.update = function(){
        Notification.display('Updating...', false);
        //Holds jobs
        var jobHolder = [];
        //Loop through all the addresses
        angular.forEach($scope.customer.addresses, function(address, index){
            console.log(address);
            jobHolder.push(address);
            $scope.map.getPosition(address, function(position){
                console.log(position);
                angular.extend($scope.customer.addresses[index], position);
                jobHolder.shift();
                console.log(jobHolder);
                if(jobHolder.length === 0){
                    $scope.customer.$save(function(){
                        Notification.display('Updated');
                    });
                }
                   
            });
        }, function(){
            $scope.customer.$save(function(){
                Notification.display('Updated');
            });
        });
        
        
        
    };
    
    $scope.remove = function(){
        $scope.customer.$delete(function(){
            $location.path('/customers');
        });
        
    };
}

CustomerDetailsCtrl.$inject = ['$scope', 'Customer', '$routeParams', '$location', 'Notification'];






