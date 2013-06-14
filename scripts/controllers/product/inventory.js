'use strict';

angular.module('employeeApp')
    .controller('ProductInventoryCtrl', ['$scope','AcknowledgementItem', 'Upholstery', 'Table', 
    function ($scope, AcknowledgementItem, Upholstery, Table) {
        $scope.itemList = AcknowledgementItem.query({status:'available'});
        $scope.upholsteryList = Upholstery.query();
        $scope.tableList = Table.query();
        
        $scope.item = new AcknowledgementItem();
        
        $scope.cropCustomImage = function(){
            $scope.cropping = true;
            $scope.cropper.crop();
        };
        
        $scope.saveCustomImage = function(){
            $scope.cropping = false;
            $scope.cropper.save();
            $scope.uploadImage($scope.cropper.getImage());
        };
        
        $scope.previewCustomImage = function(url){
            window.open(url);
        };
        
        $scope.addItem = function(){
            $scope.item.$save(function(){
                $scope.itemList.push(angular.copy($scope.item));
                $scope.item = new AcknowledgementItem(); 
            });

        }
        
        
        $scope.uploadImage = function(image){
            //Display Notification
            Notification.display('Uploading Image', false);
            //Set the upload Target
            
            //Get new image and add to form data
            var fd = new FormData();
            fd.append('image', image);
            $scope.uploading = true;
            //Upload the image
            jQuery.ajax("acknowledgement/item/image", {
               type:'POST',
               data:fd,
               processData:false,
               contentType:false,
               success: function(response){
                   $scope.item = $scope.item || {status:'INVENTORY'};
                   $scope.item.images = {};
                   angular.copy(response, $scope.custom.image);
    
            
                   $scope.uploading = false;
                   
               }
            });
        };
    }]);
