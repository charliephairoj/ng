//Controllers for order


/*
 * PO Area
 */

//controller to view po

function ViewPOCtrl($scope, PurchaseOrder, Supplier, Poller){
    $scope.poList = PurchaseOrder.query();
    /*
    Poller.poll($scope, function(){
        $scope.poList = PurchaseOrder.query();

    });
    
    */
}

ViewPOCtrl.$inject = ['$scope', 'PurchaseOrder', 'Supplier', 'Poller'];
//controller to add lumber

function CreatePOCtrl($scope, Supply, Supplier, PurchaseOrder, Notification){
    $scope.supplyList = Supply.query();
    $scope.supplierList = Supplier.query();
    $scope.orderedSupplies = [];
    $scope.po = {};
    //Methods
    
    //View Supplies
    $scope.supplies = function(){
        console.log($scope.supplier);
        if($scope.supplier){
            $scope.showSupplies = !$scope.showSupplies;
            $scope.showSuppliers = false;
        }
        
    };
    
    $scope.addSupplier = function(index){
        Notification.display('Woohoo this shiz works', 1000);
      $scope.supplier = $scope.supplierList[index];
      $scope.query = null;
      $scope.showSuppliers=false;
      $scope.$apply();
    };
    
    $scope.addSupplies = function(index){
        
        
        $scope.orderedSupplies.push($scope.supplyList[index]);
        
        $scope.$apply();
            //$scope.orderedSupplies.push($scope.supplyList[$scope.data.index]);
        
        
        
    };
    //Add Supplier
    $scope.add = function(supplier){
        $scope.sourceType = "supply";
        console.log('ok');
        if($scope.data.type == "supplier"){
            
            $scope.supplier = $scope.supplierList[$scope.data.index];
            $scope.query = null;
            $scope.showSuppliers = false;
            $scope.$apply();
        }else if($scope.data.type == "supply"){
            $scope.$apply(function(){
                angular.forEach($scope.supplyList, function(item){
                    if(item.id == $scope.data.index){
                        $scope.orderedSupplies.push(item);
                    }
                });
                
            });
            //$scope.orderedSupplies.push($scope.supplyList[$scope.data.index]);
        }
        
        
    };
    
    $scope.create = function(){
        
        //Verifies that the form is valid
        if($scope.form.$valid){
            //Create a new purchase order resource
            var po =  new PurchaseOrder();
            
            po.supplier = $scope.supplier.id;
            po.vat = $scope.po.vat;
            po.currency = $scope.po.currency;
            if($scope.po.attention){
                po.attention = {};
                angular.copy($scope.po.attention, po.attention);
                
            }
    
            //Add delivery date
            po.deliveryDate = {}
            po.deliveryDate.month = $scope.po.deliveryDate.getMonth()+1;
            po.deliveryDate.date = $scope.po.deliveryDate.getDate();
            po.deliveryDate.year = $scope.po.deliveryDate.getFullYear();
            
            if($scope.po.shipping.type == "none"){
                po.shipping = false;
            }else{
                po.shipping = {};
                po.shipping.type = $scope.po.shipping.type;
                po.shipping.amount = $scope.po.shipping.amount;
            }
            po.supplies = [];
            
            angular.forEach($scope.orderedSupplies, function(supply, index){
                po.supplies.push({'id':supply.id, 'quantity':Number(supply.quantity)});
            });
            
            po.$save(function(response){
                window.open(response.url, replace=false);
            });
        }
        
    };
    
    $scope.reset = function(){
        $scope.$apply(function(){
            $scope.supplier = null;
            $scope.orderedSupplies.length = 0;
        });
    };
    
    $scope.remove = function(index){
        $scope.orderedSupplies.splice(index, 1);
        $scope.$apply();
    };
    
    
    //Validation functions
    $scope.hasOrderedSupplies = function(){
        return $scope.orderedSupplies.length === 0;
    };
    
    //shippign status
    $scope.orderedShipping = function(){
        return $scope.po.shipping ? ($scope.po.shipping.type == "none") ? false : true : false;
    };
    
}

CreatePOCtrl.$inject = ['$scope', 'Supply', 'Supplier', 'PurchaseOrder', 'Notification'];



/*
 * Acknowledgement Area
 */

function ViewAcknowledgementCtrl($scope, Acknowledgement){
    $scope.ackList = Acknowledgement.query(console.log($scope.ackList));
    console.log($scope.ackList);   
}

ViewAcknowledgementCtrl.$inject = ['$scope', 'Acknowledgement'];

//Create Acknowledgement
function CreateAcknowledgementCtrl($scope, Acknowledgement, Notification, Customer, Upholstery, $filter, Fabric){
    
    //Vars
    $scope.show_fabric = false;
    
    $scope.customer_list = Customer.query();
    $scope.upholstery_list = Upholstery.query();
    $scope.fabric_list = Fabric.query();
    $scope.ack = new Acknowledgement();
    
    var uploadTargets = [];
    
    
    
    $scope.add_customer = function(index){
        //Set Customer
        $scope.ack.customer = $filter('orderBy')($filter('filter')($scope.customer_list, $scope.query_customers), 'name')[index];
        
        //Hide Customer Panel
        $scope.show_customers = false;
    };
    
    $scope.add_upholstery = function(index){
        
        //Create products array if not exists
        $scope.ack.products = $scope.ack.products || [];
        //Add New compy of product
        $scope.ack.products.push(angular.copy($filter('filter')($scope.upholstery_list, $scope.query_uphol)[index]));
        //Close Modal
        $scope.show_upholstery = false;
        $scope.show_quantity = true;
    };
    
    $scope.addCustomItem = function(){
        var item = {};
        angular.copy($scope.custom, item);
        item.is_custom = true;
        $scope.ack.products = $scope.ack.products || [];
        $scope.ack.products.push(item);
        //Reset input
        $scope.custom = {};
        //Close Modal
        $scope.show_custom = false;  
    };
    
    $scope.uploadImage = function(){
        //Display Notification
        Notification.display('Uploading Image', false);
        //Set the upload Target
        
        //Get new image and add to form data
        var image = $scope.images[0];
        var fd = new FormData();
        fd.append('image', image);
        //Upload the image
        jQuery.ajax("acknowledgement/item/image", {
           type:'POST',
           data:fd,
           processData:false,
           contentType:false,
           success: function(response){
               //Copy image to custom item
               $scope.custom = $scope.custom || {is_custom:true};
               $scope.custom.image = $scope.custom.image || {};
               angular.copy(response, $scope.custom.image);
               //add subproperty so image can be viewed
               $scope.custom.url = $scope.custom.image.url;
               //Clear $scope of old Image
               $scope.images.length = 0;
               $scope.imagePreviews.length = 0;
               Notification.display('Image Uploaded');
               
           }
        });
    };
    
    
    $scope.removeProduct = function(index){
        $scope.ack.products.splice(index, 1);
    };
    
    $scope.create = function(){
        
        if($scope.isValidated()){
            var ack = new Acknowledgement();
            angular.copy($scope.ack, ack);
            //Add delivery date
            ack.delivery_date = {};
            ack.delivery_date.month = $scope.ack.delivery_date.getMonth()+1;
            ack.delivery_date.date = $scope.ack.delivery_date.getDate();
            ack.delivery_date.year = $scope.ack.delivery_date.getFullYear();
            console.log(ack);
            /*
            ack.$save(function(responseData){
                console.log(responseData);
                window.open(responseData.url, true);
            });*/
        }else{
            Notification.display('The Order is Not Complete')
        }
        
    };
    
    //Validations
    $scope.isValidated = function(){
        /*
         * The following are test to see if
         * The property has already been added
         */
        if(!$scope.ack.customer){
            return false;
        }
        if(!$scope.ack.products){
            return false;
        }
        if(!$scope.ack.vat){
            return false;
        }
        if(!$scope.ack.delivery_date){
            return false;
        }
        //Return true for form validated
        return true;
    }
    
}

CreateAcknowledgementCtrl.$inject = ['$scope', 'Acknowledgement', 'Notification', 'Customer', 'Upholstery', '$filter', 'Fabric'];


