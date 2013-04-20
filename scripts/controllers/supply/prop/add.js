'use strict';

angular.module('employeeApp')
  .controller('SupplyPropAddCtrl', ['$scope', 'Supplier', 'Supply', 'Notification', '$location',
  function ($scope, Supplier, Supply, Notification, $location) {
    $scope.supplierList = Supplier.query();
    $scope.prop = new Supply();
    $scope.prop.type = "prop"
    //Tooltips
    $scope.supplierText = "Choose a Supplier for this Fabric";
    $scope.referenceText = "Enter the Supplier's Reference Number";
    $scope.widthText = "Enter the Width in millimeters";
    $scope.depthText = "Enter the Depth in millimeters";
    $scope.heightText = "Enter the Height in millimeters";
    $scope.cost = "Enter the Cost in the format of 100 or 123.45";
    //Methods
    
    //Add Fabric
    $scope.save = function(){
        //Display saving message
        Notification.display('Saving Prop...', false);
        //Checks the form is valid
        if($scope.form.$valid){
            //save to database
            $scope.prop.$save(function(){
                Notification.display('Prop Saved');
                $location.path('/supply/prop');
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
        
        jQuery.ajax("supply/image", {
           type:'POST',
           data:fd,
           processData:false,
           contentType:false,
           success: function(responseData){
               console.log(responseData);
               Notification.display('Image Updated');
               $scope.prop.image = $scope.prop.image || {};
               angular.copy(responseData, $scope.prop.image);
               console.log($scope);
               $scope.$apply();
           }
        });
    };
  }]);