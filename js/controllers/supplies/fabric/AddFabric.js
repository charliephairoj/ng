//Controllers for supplies




/*
 * Fabric Controllers
 */

//Add fabric Ctrl


function AddFabricCtrl($scope, Supplier, Fabric, $location, Notification){
    $scope.supplierList = Supplier.query();
    $scope.fabric = new Fabric();
    //Methods
    
    //Add Fabric
    $scope.save = function(){
        //Display saving message
        Notification.display('Saving Fabric...', false);
        //Checks the form is valid
        if($scope.form.$valid){
            //save to database
            $scope.fabric.$save(function(){
                Notification.display('Fabric Saved');
                $location.path('/fabric');
            });
        }
       
    };
    
    //Upload Image
    $scope.upload = function(){
        
        //Notify of uploading image
        Notification.display('Uploading Image...', false);
        var fd = new FormData();
        
        fd.append('image', $scope.images[0]);
        
        //clear the form
        $scope.addLength = null;
        $scope.addRemark = null;
        
        jQuery.ajax("fabric/image", {
           type:'POST',
           data:fd,
           processData:false,
           contentType:false,
           success: function(responseData){
               Notification.display('Image Updated');
               angular.copy(responseData, $scope.fabric);
               $scope.$apply();
           }
        });
    };
    
    
    
}

AddFabricCtrl.$inject = ['$scope', 'Supplier', 'Fabric', '$location', 'Notification'];


