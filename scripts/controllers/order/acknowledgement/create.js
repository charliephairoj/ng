'use strict';

angular.module('employeeApp')
  .controller('OrderAcknowledgementCreateCtrl', ['$scope', 'Acknowledgement', 'Customer', 'Upholstery', 'Fabric', '$filter', 'Table', 'Notification',
    function ($scope, Acknowledgement, Customer, Upholstery, Fabric, $filter, Table, Notification) {
        //Vars
        $scope.showFabric = false;
        $scope.uploading = false;
        $scope.customImageScale = 100;
        $scope.customerList = Customer.poll().query();
        $scope.upholsteryList = Upholstery.poll().query();
        $scope.tableList = Table.poll().query();
        $scope.fabricList = Fabric.poll().query();
        $scope.ack = new Acknowledgement();
        
        var uploadTargets = [];
        var storage = window.localStorage;
        
        if(storage.getItem('acknowledgement-create')){
            angular.extend($scope.ack, JSON.parse(storage.getItem('acknowledgement-create')));
        }
        
        $scope.ack.products = $scope.ack.products || [];
        
        $scope.tempSave = function(){
            storage.setItem('acknowledgement-create', JSON.stringify($scope.ack));
        }
        
        $scope.addCustomer = function(customer){
            //Set Customer
            $scope.ack.customer = customer
            //Hide Customer Panel
            $scope.showCustomers = false;
        };
        
        $scope.addUpholstery = function(product){
            $scope.ack.products = $scope.ack.products || [];
            $scope.ack.products.push(angular.copy(product));
            $scope.selection = "quantity";
            /*
            //Create products array if not exists
            $scope.ack.products = $scope.ack.products || [];
            //Add New compy of product
            $scope.ack.products.push(angular.copy($filter('filter')($scope.upholsteryList, $scope.queryUpholstery)[index]));
            //Close Modal
            $scope.show_upholstery = false;
            $scope.show_quantity = true;
            */
            $scope.tempSave()
        };
        
        $scope.addTable = function(product){
            
            $scope.ack.products = $scope.ack.products || [];
            $scope.ack.products.push(angular.copy(product));
            $scope.selection = "quantity";
            $scope.tempSave()
        };
        
        $scope.setQuantity = function(){
            if($scope.ack.products[$scope.ack.products.length-1].type.toLowerCase() == "upholstery"){
                $scope.selection = 'fabric';
                $scope.showProducts = true;
            }else{
                $scope.showProducts = false;
                $scope.selection = 'upholstery';
            }
            $scope.tempSave()
        }
        
        $scope.setFabric = function(){
            $scope.showProducts = false;
            $scope.selection = 'upholstery';
            $scope.tempSave();
        }
        
        $scope.addCustomItem = function(item, image){
            
            if(image){
                
                $scope.uploadImage(image, function(response){
                    item.is_custom = true;
                    item.type = 'custom';
                    item.image = {}
                    angular.copy(response, item.image);
                    $scope.ack.products = $scope.ack.products || [];
                    $scope.ack.products.push(item);
                    $scope.selection = 'quantity';
                    $scope.tempSave();
                });
            }else{
                item.is_custom = true;
                item.type = 'custom';
                $scope.ack.products = $scope.ack.products || [];
                $scope.ack.products.push(item);
                $scope.selection = 'quantity';
                $scope.tempSave();
            }
           
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
        
        $scope.uploadImage = function(image, callback){
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
        
        
        $scope.removeProduct = function(index){
            $scope.ack.products.splice(index, 1);
        };
        
        $scope.create = function(){
            $scope.tempSave();
            try{
                if($scope.isValidated()){
                    Notification.display('Creating Acknowledgement...', false);
                    $scope.ack.$save(function(response){
                        Notification.display('Acknowledgement created');
                        window.open(response.acknowledgement_url);
                        window.open(response.production_url);
                        angular.extend($scope.ack, JSON.parse(storage.getItem('acknowledgement-create')));
                    }, function(e){
                        console.log(e);
                        Notification.display('There an error in creating the Acknowledgement', false);
                    });
                }
            }catch(e){
                Notification.display(e.message);
            }
        };
        
        $scope.reset = function(){
            $scope.ack = new Acknowledgement;
            $scope.ack.products = [];
            storage.removeItem('acknowledgement-create');
        }
        
        //Validations
        $scope.isValidated = function(){
            /*
             * The following are test to see if
             * The property has already been added
             */
            if(!$scope.ack.customer){
                throw new TypeError("Customer is not an object");
            }else{
                if(!$scope.ack.customer.hasOwnProperty('id')){
                    throw new ReferenceError("Missin customer ID");
                }
            }
            if(!$scope.ack.products){
                throw new TypeError("Products is not an array");
            }else{
                if(!$scope.ack.products.length > 0){
                    throw new RangeError("No products added to the order");
                }else{
                    for(var i in $scope.ack.products){
                        if(!$scope.ack.products[i].hasOwnProperty('has_price')){
                            //throw new ReferenceError("Product missing 'has_price' attribute");
                        }else{
                            if(!$scope.ack.products[i].has_price){
                                //throw new TypeError("Product missing price");
                            }
                        }
                    }
                }
            }
            
            if($scope.ack.vat === undefined || $scope.ack.vat === null){
                throw new TypeError("Vat is not a number");
            }
            if(!$scope.ack.delivery_date){
                throw new TypeError("Delivery Date is not a valid Date type");
            }
            if(!$scope.ack.po_id){
                throw new TypeError("PO# is not defined");
            }
            //Return true for form validated
            return true;
        };
        
        $scope.$on('$destroy', function(){
            Customer.stopPolling();
            Upholstery.stopPolling();
            Fabric.stopPolling();
            Table.stopPolling();
        });
  }]);
