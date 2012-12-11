//Controllers for supplies


/*
 * Lumber Area
 */

//controller to add lumber

function AddLumberCtrl($scope, Lumber, Supplier){
    $scope.supplierList = Supplier.query();
    console.log($scope.supplierList);
    //Methods
    
    //Add Lumber
    $scope.save = function(){
        //declare vars
        var lumber = new Lumber();
        //copy properties
        angular.copy($scope.lumber, lumber);
        
        lumber.supplierID = $scope.lumber.supplier.id
        
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
        
        foam.$save(function(){
            window.location = "index.html#/foam";
        });
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
       
       wool.$save(function(){
            window.location = "index.html#/wool";
        });
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
       
       screw.$save(function(){
            window.location = "index.html#/screws";
        });
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
        $scope.screw.$delete(function(){
            window.location = "index.html#/screws";
        });
        
    };
    
    $scope.update = function(){
        $scope.screw.$save()
    };
}

ScrewDetailsCtrl.$inject = ['$scope', 'Screw', '$routeParams'];





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
       
        fabric.$save(function(){
           window.location = "index.html#/fabric"
       });
    };
    
    
    
}

AddFabricCtrl.$inject = ['$scope', 'Supplier', 'Fabric'];


//controller to add foam

function ViewFabricsCtrl($scope, Fabric){
    $scope.fabricList = Fabric.query()
    //Methods
    
    
    
    
}

ViewFabricsCtrl.$inject = ['$scope', 'Fabric'];

function FabricDetailsCtrl($scope, Fabric, $routeParams){
    
    $scope.fabric = Fabric.get({'id':$routeParams.id});
    
    $scope.remove = function(){
        $scope.fabric.$delete(function(){
            window.location = "index.html#/staples";
        });
        
    };
    
    $scope.update = function(){
        $scope.fabric.$save()
    };
}

FabricDetailsCtrl.$inject = ['$scope', 'Fabric', '$routeParams'];


/*
 * Staple Controllers
 */

//controller to add foam

function AddStapleCtrl($scope, Supplier, Staple){
    $scope.supplierList = Supplier.query();
    //Methods
    
    //Add Lumber
    $scope.save = function(){
       var staple = new Staple();
       angular.copy($scope.staple, staple);
       staple.supplierID = $scope.staple.supplier.id;
       
       staple.$save(function(){
           window.location = "index.html#/staples"
       });
    };
    
    
    
}

AddStapleCtrl.$inject = ['$scope', 'Supplier', 'Staple'];


//controller to add foam

function ViewStaplesCtrl($scope, Staple){
    $scope.stapleList = Staple.query()
    //Methods
    
    
    
    
}

ViewStaplesCtrl.$inject = ['$scope', 'Staple'];


function StapleDetailsCtrl($scope, Staple, $routeParams){
    
    $scope.staple = Staple.get({'id':$routeParams.id});
    
    $scope.remove = function(){
        $scope.staple.$delete(function(){
            window.location = "index.html#/staples";
        });
        
    };
    
    $scope.update = function(){
        $scope.staple.$save()
    };
}

StapleDetailsCtrl.$inject = ['$scope', 'Staple', '$routeParams'];


/*
 * Webbing Controllers
 */

//controller to add foam

function AddWebbingCtrl($scope, Supplier, Webbing){
    $scope.supplierList = Supplier.query();
    //Methods
    
    //Add Lumber
    $scope.save = function(){
       var webbing = new Webbing();
       angular.copy($scope.webbing, webbing);
       webbing.supplierID = $scope.webbing.supplier.id;
       
       webbing.$save(function(){
           window.location = "#/webbing"
       });
    };
    
    
    
}

AddWebbingCtrl.$inject = ['$scope', 'Supplier', 'Webbing'];


//controller to add foam

function ViewWebbingsCtrl($scope, Webbing){
    $scope.webbingList = Webbing.query()
    //Methods
    
    
    
    
}

ViewWebbingsCtrl.$inject = ['$scope', 'Webbing'];


function WebbingDetailsCtrl($scope, Webbing, $routeParams){
    
    $scope.webbing = Webbing.get({'id':$routeParams.id});
    
    $scope.remove = function(){
        $scope.webbing.$delete(function(){
            window.location = "index.html#/webbing";
        });
        
    };
    
    $scope.update = function(){
        $scope.webbing.$save()
    };
}

WebbingDetailsCtrl.$inject = ['$scope', 'Webbing', '$routeParams'];


/*
 * Thread Controllers
 */

//controller to add foam

function AddThreadCtrl($scope, Supplier, Thread){
    $scope.supplierList = Supplier.query();
    //Methods
    
    //Add Lumber
    $scope.save = function(){
       var thread = new Thread();
       angular.copy($scope.thread, thread);
       thread.supplierID = $scope.thread.supplier.id;
       
       thread.$save(function(){
           window.location = "index.html#/threads"
       });
    };
    
    
    
}

AddThreadCtrl.$inject = ['$scope', 'Supplier', 'Thread'];


//controller to add foam

function ViewThreadsCtrl($scope, Thread){
    $scope.threadList = Thread.query()
    //Methods
    
    
    
    
}

ViewThreadsCtrl.$inject = ['$scope', 'Thread'];


function ThreadDetailsCtrl($scope, Thread, $routeParams){
    
    $scope.thread = Thread.get({'id':$routeParams.id});
    
    $scope.remove = function(){
        $scope.thread.$delete(function(){
            window.location = "index.html#/threads";
        });
        
    };
    
    $scope.update = function(){
        $scope.thread.$save()
    };
}

ThreadDetailsCtrl.$inject = ['$scope', 'Thread', '$routeParams'];




/*
 * Thread Controllers
 */

//controller to add foam

function AddZipperCtrl($scope, Supplier, Zipper){
    $scope.supplierList = Supplier.query();
    //Methods
    
    //Add Lumber
    $scope.save = function(){
       var zipper = new Zipper();
       angular.copy($scope.zipper, zipper);
       zipper.supplierID = $scope.zipper.supplier.id;
       
       zipper.$save(function(){
           window.location = "index.html#/zipper"
       });
    };
    
    
    
}

AddZipperCtrl.$inject = ['$scope', 'Supplier', 'Zipper'];


//controller to add foam

function ViewZipperCtrl($scope, Zipper){
    $scope.zipperList = Zipper.query()
    //Methods
    
    
    
    
}

ViewZipperCtrl.$inject = ['$scope', 'Zipper'];


function ZipperDetailsCtrl($scope, Zipper, $routeParams){
    
    $scope.zipper = Zipper.get({'id':$routeParams.id});
    
    $scope.remove = function(){
        $scope.zipper.$delete(function(){
            window.location = "index.html#/zipper";
        });
        
    };
    
    $scope.update = function(){
        $scope.zipper.$save()
    };
}

ZipperDetailsCtrl.$inject = ['$scope', 'Zipper', '$routeParams'];
