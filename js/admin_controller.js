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
function AddGroupCtrl($scope, Group, Permission){
    
    $scope.permissionList = Permission.query();
    $scope.group = {};
    $scope.group.permissions = [];
    
    $scope.save = function(){
        var group = new Group();
        
        group.name = $scope.group.name;
        group.permissions = $scope.group.permissions;
        
        group.$save();
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

AddGroupCtrl.$inject = ['$scope', 'Group', 'Permission'];

//Group details

function GroupDetailsCtrl($scope, Group, Permission, $routeParams){
    $scope.permissionList = Permission.query({'resource':false});
    $scope.group = Group.get({'id':$routeParams.id})
    console.log($scope.group.permissions);
    console.log($scope.permissionList)
    
    $scope.remove = function(){
        $scope.group.$delete();
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

GroupDetailsCtrl.$inject = ['$scope', 'Group', 'Permission', '$routeParams']

/*
 * User Area
 */

function ViewUsersCtrl($scope, User){
    $scope.userList = User.query();
    console.log($scope.userList)
}

ViewUsersCtrl.$inject = ['$scope', 'User'];

function AddUserCtrl($scope, User, Group){
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
         
         user.groups = $scope.user.groups;
         user.name = $scope.user.name;
         user.password = $scope.user.password;
         user.username = $scope.user.username
         user.email = $scope.user.email;
         user.$save();
    }
}

AddUserCtrl.$inject = ['$scope', 'User', 'Group'];


