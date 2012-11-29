//Controllers for supplies


/*
 * Lumber Area
 */

//controller to add lumber

function AddLumberCtrl($scope, Lumber, Supplier){
    $scope.supplierList = Supplier.query();
    
    //Methods
    
    //Add Lumber
    $scope.save = function(){
        //declare vars
        var lumber = new Lumber();
        //copy properties
        angular.copy($scope.lumber, lumber);
        
        lumber.supplierID = $scope.lumber.supplier.id
        lumber.description = $scope.lumber.type+' '+lumber.width+'x'+lumber.depth+'x'+lumber.height;
        
        lumber.$save(function(data){
            window.location = "#/lumber";
        })
    };
    
}

AddLumberCtrl.$inject = ['$scope', 'Lumber', 'Supplier'];

//update lumber

function ViewLumberCtrl($scope, Lumber){
    $scope.lumberList = Lumber.query();
    console.log(Lumber.query());
    //var lumber = $scope.lumbers
    
}
ViewLumberCtrl.$inject = ['$scope', 'Lumber']


function LumberDetailsCtrl($scope, Lumber, $routeParams){
    
    $scope.lumber = Lumber.get({'id':$routeParams.id})
    console.log($scope.lumber);
    $scope.remove = function(){
        $scope.lumber.$delete(function(){
            window.location = "index.html#/lumber"
        });
        $scope.lumberList = Lumber.query();
    };
    
    $scope.update = function(){
        $scope.lumber.$save()
    };
}

LumberDetailsCtrl.$inject = ['$scope', 'Lumber', '$routeParams']

//controller to add foam

function AddFoamCtrl($scope, Foam, Supplier){
    
    $scope.supplierList = Supplier.query();
    //Methods
    
    //Add Lumber
    $scope.save = function(){
        //declare vars
        var foam = new Foam();
        //set properties
        angular.copy($scope.foam, foam)
        foam.foamType = $scope.foam.type;
        foam.supplierID = $scope.foam.supplier.id;
        
        foam.$save();
    };
    
    
    
}

AddFoamCtrl.$inject = ['$scope', 'Foam', 'Supplier'];


function ViewFoamCtrl($scope, Foam){
    
    $scope.foamList = Foam.query();
    console.log($scope.foamList);
    //var lumber = $scope.lumbers
    
}
ViewFoamCtrl.$inject = ['$scope', 'Foam']

//Foam Details

function FoamDetailsCtrl($scope, Foam, $routeParams){
    
    $scope.foam = Foam.get({'id':$routeParams.id})
    console.log($scope.lumber);
    $scope.remove = function(){
        $scope.foam.$delete(function(){
            window.location = "index.html#/foam"
        });
        $scope.foamList = Foam.query();
    };
    
    $scope.update = function(){
        $scope.foam.$save()
    };
}

FoamDetailsCtrl.$inject = ['$scope', 'Foam', '$routeParams']



/*
 * Legs
 */


//controller to add foam

function AddLegCtrl($scope){
    
    //Methods
    
    //Add Lumber
    $scope.addLeg = function(){
       
    };
    
    
    
}

AddLegCtrl.$inject = ['$scope'];


//controller to add foam

function AddWoolCtrl($scope, Supplier, Wool){
    $scope.supplierList = Supplier.query();
    console.log(Supplier.query());
    //Methods
    
    //Add Lumber
    $scope.save = function(){
       var wool = new Wool();
       angular.copy($scope.wool, wool);
       wool.supplierID = $scope.wool.supplier.id;
       
       wool.$save();
    };
    
    
    
}

AddWoolCtrl.$inject = ['$scope', 'Supplier', 'Wool'];


//controller to add foam

function ViewWoolCtrl($scope, Wool){
    $scope.woolList = Wool.query()
    //Methods
    
    
    
    
}

ViewWoolCtrl.$inject = ['$scope', 'Wool'];


function WoolDetailsCtrl($scope, Wool, $routeParams){
    
    $scope.wool = Wool.get({'id':$routeParams.id})
    console.log($scope.wool);
    $scope.remove = function(){
        $scope.wool.$delete(function(){
            window.location = "index.html#/wool";
        });
        
    };
    
    $scope.update = function(){
        $scope.wool.$save()
    };
}

WoolDetailsCtrl.$inject = ['$scope', 'Wool', '$routeParams']

/*
 * Screw Controllers
 */

//controller to add foam

function AddScrewCtrl($scope, Supplier, Screw){
    $scope.supplierList = Supplier.query();
    //Methods
    
    //Add Lumber
    $scope.save = function(){
       var screw = new Screw();
       angular.copy($scope.screw, screw);
       screw.supplierID = $scope.screw.supplier.id;
       
       screw.$save();
    };
    
    
    
}

AddScrewCtrl.$inject = ['$scope', 'Supplier', 'Screw'];


//controller to add foam

function ViewScrewsCtrl($scope, Screw){
    $scope.screwList = Screw.query()
    //Methods
    
    
    
    
}

ViewScrewsCtrl.$inject = ['$scope', 'Screw'];


function ScrewDetailsCtrl($scope, Screw, $routeParams){
    
    $scope.screw = Screw.get({'id':$routeParams.id});
    
    $scope.remove = function(){
        $scope.wool.$delete(function(){
            window.location = "index.html#/wool";
        });
        
    };
    
    $scope.update = function(){
        $scope.wool.$save()
    };
}

WoolDetailsCtrl.$inject = ['$scope', 'Wool', '$routeParams']





/*
 * Fabric Controllers
 */

//Add fabric Ctrl


function AddFabricCtrl($scope, Supplier, Fabric){
    $scope.supplierList = Supplier.query();
    //Methods
    
    //Add Lumber
    $scope.save = function(){
       var fabric = new Fabric();
       
       
       angular.copy($scope.fabric, fabric);
       
        fabric.$save();
    };
    
    
    
}

AddFabricCtrl.$inject = ['$scope', 'Supplier', 'Fabric'];


//controller to add foam

function ViewFabricsCtrl($scope, Fabric){
    $scope.fabricList = Fabric.query()
    //Methods
    
    
    
    
}

ViewFabricsCtrl.$inject = ['$scope', 'Fabric'];
