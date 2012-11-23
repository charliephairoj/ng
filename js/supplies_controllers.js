//Controllers for supplies


/*
 * Lumber Area
 */

//controller to add lumber

function AddLumberCtrl($scope, Lumber){
    
    //Methods
    
    //Add Lumber
    $scope.save = function(){
        //declare vars
        var lumber = new Lumber();
        //set properties
        lumber.supplierID = $scope.lumber.supplier.id
        lumber.width = $scope.lumber.width;
        lumber.depth = $scope.lumber.depth;
        lumber.height = $scope.lumber.height;
        lumber.type = $scope.lumber.type;
        lumber.cost = $scope.lumber.cost;
        lumber.description = $scope.lumber.type+' '+lumber.width+'x'+lumber.depth+'x'+lumber.height;
        
        
        
        lumber.$save(function(data){
            window.location = "#/lumber";
        })
    };
    
}

AddLumberCtrl.$inject = ['$scope', 'Lumber'];

//update lumber

function ViewLumberCtrl($scope, Lumber){
    $scope.lumberList = Lumber.query();
    console.log(Lumber.query());
    //var lumber = $scope.lumbers
    
}
ViewLumberCtrl.$inject = ['$scope', 'Lumber']


function LumberDetailsCtrl($scope, Lumber, $routeParams){
    
    $scope.lumber = Lumber.get({'id':$routeParams.lumberID})
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

ViewLumberCtrl.$inject = ['$scope', 'Lumber', '$routeParams']

//controller to add foam

function AddFoamCtrl($scope, Foam){
    //Methods
    
    //Add Lumber
    $scope.addFoam = function(){
        //declare vars
        var foam = new Foam();
        //set properties
        foam.width = $scope.foam.width;
        foam.depth = $scope.foam.depth;
        foam.height = $scope.foam.height;
        foam.color = $scope.foam.color;
        foam.foamType = $scope.foam.type;
        
        foam.$save();
    };
    
    $scope.updateFoam = function(){
        
    }
    
}

AddFoamCtrl.$inject = ['$scope', 'Lumber'];


function ViewFoamCtrl($scope){
    //var lumber = $scope.lumbers
    
}
ViewFoamCtrl.$inject = ['$scope']


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
       wool.cost = $scope.wool.cost;
       if($scope.wool.tex.trim()!=null){
           wool.tex = $scope.wool.tex;
       }
       if($scope.wool.description.trim()!=null){
           wool.description = $scope.wool.description;
       }
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
