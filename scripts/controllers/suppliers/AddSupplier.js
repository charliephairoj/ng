'use strict';




function AddSupplierCtrl($scope, Supplier, $location, Notification){
    
    
    //Mehtods
    
    //addS  contact to the supplier
    $scope.addContact = function(){
        //Notify
        Notification.display('Contact Added to Supplier'); 
        
        
        $scope.supplier.contacts = $scope.supplier.contacts || [];
      
        
        $scope.supplier.contacts.push(angular.copy($scope.contact));
        
        $scope.contact = {};
        
        $scope.showAddContact = false;
        
    };
    
    $scope.getLocation = function(){
         var position = $scope.map.getPosition($scope.supplier.address, function(response){
             angular.extend($scope.supplier.address, response);
             $scope.map.setPosition({lat:response.lat,
                                     lng:response.lng,
                                     updateMarker: true});
         });
         
    };
    
    //Method to save the supplier to the database
    $scope.save = function(){
        
        if($scope.form.$valid){
            //Notify
            Notification.display('Saving Supplier...', false);
            //New customer  and address objects
            var supplier = new Supplier();
            
            angular.copy($scope.supplier, supplier);
                    
            supplier.$save(function(){
                //Notify
                Notification.display('Supplier Saved');
                $location.path('/suppliers');
            });
        }
        
        
        
        
    };
}

AddSupplierCtrl.$inject = ['$scope', 'Supplier', '$location', 'Notification'];

