//Controllers for order


/*
 * Lumber Area
 */

//controller to add lumber

function CreatePOCtrl($scope, Supply, Supplier, PurchaseOrder){
    $scope.supplyList = Supply.query();
    $scope.orderedSupplies = [];
    console.log($scope.supplyList);
    //Methods
    
    //Add Supplier
    $scope.add = function(supplier){
        $scope.sourceType = "supply";
        console.log('ok');
        if($scope.data.type == "supplier"){
            $scope.$apply(function(){
                $scope.supplier = $scope.supplierList[$scope.data.index];
            });
        }else if($scope.data.type == "supply"){
            $scope.$apply(function(){
                angular.forEach($scope.supplyList, function(item){
                    
                    if(item.id == $scope.data.index){
                        console.log(item);
                        console.log($scope.data);
                        $scope.orderedSupplies.push(item);
                    }
                });
                
                console.log($scope.orderedSupplies);
            });
            //$scope.orderedSupplies.push($scope.supplyList[$scope.data.index]);
        }
        
        console.log($scope.data);
        console.log($scope.supplier);
    };
    
    $scope.create = function(){
        //Create a new purchase order resource
        var po =  new PurchaseOrder();
        
        po.supplier = $scope.supplier.id;
        po.supplies = [];
        angular.forEach($scope.orderedSupplies, function(supply, index){
            po.supplies.push({'id':supply.id, 'quantity':Number(supply.quantity)});
        });
        
        po.$save(function(response){
            console.log(response);
            window.open(response.url, replace=false);
        });
    };
    
    $scope.remove = function(index){
        $scope.orderedSupplies.splice(index, 1);
    }
    
}

CreatePOCtrl.$inject = ['$scope', 'Supply', 'Supplier', 'PurchaseOrder'];

