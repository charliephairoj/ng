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
                    console.log(po.attention);
    
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
                console.log(response);
                window.open(response.url, replace=false);
            });
        }
        
    };
    
    $scope.reset = function(){
        $scope.supplier = null;
        $scope.orderedSupplies = [];
        
        $scope.$apply();
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
        if(!$scope.po.shipping){
           
            return false;
        }else{
            if($scope.po.shipping.type == "none"){
                return false;
            }else{
                return true;
            }
            
        }
        
        
        
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
    console.log($scope.upholstery_list);
    $scope.ack = new Acknowledgement();
    
    
    
    $scope.add_customer = function(index){
        //Set Customer
        $scope.ack.customer = $filter('filter')($scope.customer_list, $scope.query_customers)[index];
        
        //Hide Customer Panel
        $scope.show_customers = false;
    };
    
    $scope.add_upholstery = function(index){
        
        console.log($scope);
        //Create products array if not exists
        if(!$scope.ack.products){
            $scope.ack.products = [];
        }
        //Add New compy of product
        $scope.ack.products.push(angular.copy($filter('filter')($scope.upholstery_list, $scope.query_uphol)[index]));
        //Close Modal
        $scope.show_upholstery = false;
        $scope.show_fabric = true;
    };
    
    $scope.add_upholstery_fabric = function(){
        var index = $scope.data;
        console.log(index);
        console.log($scope.data);
        //Get Fabric
        var fabric = angular.copy($filter('filter')($scope.fabric_list, $scope.query_fabric)[index]);
        console.log(fabric);
        $scope.ack.products[$scope.ack.products.length-1].fabric = {};
        $scope.$apply(function(){
            angular.copy(fabric, $scope.ack.products[$scope.ack.products.length-1].fabric);
        });
      
    };
    
    $scope.add_pillow_fabric = function(index){
        
        var fabric_index = $scope.data
        var fabric = angular.copy($filter('filter')($scope.fabric_list, $scope.query_fabric)[fabric_index]);
        $scope.ack.products[$scope.ack.products.length-1].pillows[index].fabric = {};
        $scope.$apply(function(){
            angular.copy(fabric, $scope.ack.products[$scope.ack.products.length-1].pillows[index].fabric);
        });
        
        
    }
    
    $scope.remove = function(index){
        $scope.ack.products.pop(index);
    };
    
    $scope.create = function(){
        var ack = new Acknowledgement()
        angular.copy($scope.ack, ack)
        //Add delivery date
        ack.delivery_date = {}
        ack.delivery_date.month = $scope.delivery_date.getMonth()+1;
        ack.delivery_date.date = $scope.delivery_date.getDate();
        ack.delivery_date.year = $scope.delivery_date.getFullYear();
        ack.$save(function(responseData){
            window.open(responseData.url, true);
            console.log(responseData);
        });
    };
    
}

CreateAcknowledgementCtrl.$inject = ['$scope', 'Acknowledgement', 'Notification', 'Customer', 'Upholstery', '$filter', 'Fabric'];


