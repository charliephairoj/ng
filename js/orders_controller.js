//Controllers for order


/*
 * Lumber Area
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

ViewPOCtrl.$inject = ['$scope', 'PurchaseOrder', 'Supplier', 'Poller']
//controller to add lumber

function CreatePOCtrl($scope, Supply, Supplier, PurchaseOrder){
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

CreatePOCtrl.$inject = ['$scope', 'Supply', 'Supplier', 'PurchaseOrder'];

