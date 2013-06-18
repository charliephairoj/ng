'use strict';

angular.module('employeeApp')
    .controller('ProductInventoryCtrl', ['$scope','AcknowledgementItem', 'Upholstery', 'Table', 'Fabric', 
    function ($scope, AcknowledgementItem, Upholstery, Table, Fabric) {
        $scope.itemList = AcknowledgementItem.poll().query({status:'available'});
        $scope.upholsteryList = Upholstery.query();
        $scope.tableList = Table.query();
        $scope.fabricList = Fabric.query();
        
        $scope.item = new AcknowledgementItem();
        
        function saveItem(product, callback){
            angular.copy($scope.item, product);
            $scope.item.$save(function(){
                $scope.itemList.push(angular.copy($scope.item)); 
                $scope.item = new AcknowledgementItem();
                (callback || angular.noop)();
            });
        }
        
        function uploadImage(image, callback){
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
                   Notification.display('Image Uploaded');
                   (callback || angular.noop)(response);
               }
            });
        };
        
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
        
        $scope.addUpholstery = function(product){
            $scope.product = product;
            $scope.selection = 'quantity';
        }
        
        $scope.addTable = function(product){
            $scope.product = product;
            $scope.selection = 'quantity';
        }
        
        $scope.addCustomItem = function(item, image){
            
            uploadImage(image, function(response){
                $scope.product = item;
                $scope.product.is_custom = true;
                $scope.product.type = 'custom';
                $scope.product.status = 'INVENTORY';
                $scope.product.image = {}
                angular.copy(response, $scope.product.image);
                                
                $scope.selection = 'quantity';
            });
           
        };
        
        $scope.setQuantity = function(quantity){
            $scope.product.quantity = quantity
            if($scope.product.type.toLowerCase() == 'upholstery'){
                $scope.selection = 'fabric';
            }else{
                saveItem($scope.product, function(){
                    $scope.product = {};
                });
                
            }
        }
        
        $scope.setFabric = function(){
            console.log($scope.product);
            saveItem($scope.product, function(){
                $scope.product = {}; 
            });
        }
      
        
        
        
        $scope.$on('$destroy', function(){
            $scope.AcknowledgementItem.stopPolling(); 
        });
    }]);
