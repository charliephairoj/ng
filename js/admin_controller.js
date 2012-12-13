//Controllers for order


/*
 * Permissions Area
 */

//View permission controller
function ViewPermissionsCtrl($scope, Permission){
    $scope.permissionList = Permission.query();
    console.log($scope.permissionList);
    //Methods
    
    
    
}

ViewPermissionsCtrl.$inject = ['$scope', 'Permission'];


/*
 * Group Area
 */

//View group controller
function ViewGroupsCtrl($scope, Group ){
    $scope.groupList = Group.query();
    console.log($scope.groupList);
    //Methods
    
    
    
}

ViewGroupsCtrl.$inject = ['$scope', 'Group'];

//Add group controller
function AddGroupCtrl($scope, Group, Permission, $location){
    
    $scope.permissionList = Permission.query();
    $scope.group = {};
    $scope.group.permissions = [];
    
    $scope.save = function(){
        var group = new Group();
        
        group.name = $scope.group.name;
        group.permissions = $scope.group.permissions;
        
        group.$save(function(){
            $location.paht("/groups");
        });
    };
    
    $scope.add = function(){
        
        angular.forEach($scope.permissionList, function(perm){
            if($scope.data.id == perm.id){
                $scope.$apply(function(){
                    $scope.group.permissions.push(perm)
                });
                
            }
        });
    };
    
    $scope.remove = function(index){
        
        $scope.group.permissions.splice(index, 1);
    }
}

AddGroupCtrl.$inject = ['$scope', 'Group', 'Permission', '$location'];

//Group details

function GroupDetailsCtrl($scope, Group, Permission, $routeParams, $location){
    $scope.permissionList = Permission.query({'resource':false});
    $scope.group = Group.get({'id':$routeParams.id})
    
   console.log($scope.group);
    
    
   
    
    
    
    $scope.remove = function(){
        $scope.group.$delete(function(){
            $location.paht("/groups");
        });
    };
    
    $scope.add = function(){
         angular.forEach($scope.permissionList, function(perm){
            if($scope.data.id === perm.id){
                $scope.$apply(function(){
                    $scope.group.permissions.push(perm)
                });
                
            }
        });
        
        $scope.group.$save();
    }
    
}

GroupDetailsCtrl.$inject = ['$scope', 'Group', 'Permission', '$routeParams', '$location']

/*
 * User Area
 */

function ViewUsersCtrl($scope, User){
    $scope.userList = User.query();
    console.log($scope.userList)
}

ViewUsersCtrl.$inject = ['$scope', 'User'];

function AddUserCtrl($scope, User, Group, $location){
    $scope.user = {}
    $scope.user.groups = []
    $scope.groupList = Group.query();
    console.log($scope.groupList)
    
    $scope.add = function(){
        angular.forEach($scope.groupList, function(group){
            if($scope.data.id == group.id){
                $scope.$apply(function(){
                    $scope.user.groups.push(group)
                });
                
            }
        });
    };
    
    
    $scope.save = function(){
         user = new User();
         
         angular.copy($scope.user, user);
         user.$save(function(){
            $location.paht("/users");
        });
    }
}

AddUserCtrl.$inject = ['$scope', 'User', 'Group', '$location'];



//User details

function UserDetailsCtrl($scope, Group, User, $routeParams, $location){
    $scope.groupList = Group.query({'resource':false});
    $scope.user = User.get({'id':$routeParams.id})
    
    
    $scope.remove = function(){
        $scope.user.$delete(function(){
            $location.paht("/users");
        });
    };
    
    $scope.add = function(){
         angular.forEach($scope.permissionList, function(perm){
            if($scope.data.id === perm.id){
                $scope.$apply(function(){
                    $scope.group.permissions.push(perm)
                });
                
            }
        });
        
        $scope.group.$save();
    };
    
    $scope.update = function(){
        $scope.user.$save();
    }
    
}

UserDetailsCtrl.$inject = ['$scope', 'Group', 'User', '$routeParams', '$location']

