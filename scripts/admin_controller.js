//Controllers for order

function search(list, key, value, callback, error){        
    for(var i=0; i<list.length; i++){
        if(list[i].hasOwnProperty(key)){
            if(list[i][key] == value){
                callback(list[i], i);
                return list[i];
                    
            }
        }
    }
        
    if(angular.isFunction(error)){error()}
    return false;
}

function merge(permList, groupPerms){
    if(permList && groupPerms){
        angular.forEach(groupPerms, function(perm){
            search(permList, 'id', perm.id, function(item, index){                    
                permList[index].status = true;
            });
                
        });
    }
}
/*
 * Permissions Area
 */



/*
 * Group Area
 */

//View group controller
function ViewGroupsCtrl($scope, Group ){
    $scope.groupList = Group.poll().query();
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
            $location.path("/groups");
        });
    };
    
    $scope.add = function(){
        
        angular.forEach($scope.permissionList, function(perm){
            if($scope.data.id == perm.id){
                $scope.group.permissions.push(perm);
                $scope.$apply();
                
            }
        });
    };
    
    $scope.remove = function(index){
        
        $scope.group.permissions.splice(index, 1);
    };
}

AddGroupCtrl.$inject = ['$scope', 'Group', 'Permission', '$location'];

//Group details

function GroupDetailsCtrl($scope, Group, Permission, $routeParams, $location, $filter){
    
    $scope.permissionList = Permission.query(function(){
        console.log($scope.permissionList);
        merge($scope.permissionList, $scope.group.permissions);
    });
    $scope.group = Group.get({'id':$routeParams.id}, function(){
        merge($scope.permissionList, $scope.group.permissions);
    });
    
    
    
    $scope.updatePermission = function(index){
        
        var perm = $filter('filter')($scope.permissionList, $scope.query)[index];
        $scope.permissionList[index].status = perm.checked;
        if(perm.checked){
            
            search($scope.group.permissions, 'id', perm.id, function(item, index){
                
            },
            function(){
                perm.status = 'add';
                $scope.group.permissions.push(angular.copy(perm));
            });
        }else{
            search($scope.group.permissions, 'id', perm.id, function(item, index){
                $scope.group.permissions[index].status = 'delete';
            }, 
            function(){
                 
            });
        }
        $scope.group.$save();
        console.log($scope.group.permissions);
    }
    
    $scope.remove = function(){
        $scope.group.$delete(function(){
            $location.path("/groups");
        });
    };
    
    $scope.add = function(){
         angular.forEach($scope.permissionList, function(perm){
            if($scope.data.id === perm.id){
                $scope.group.permissions.push(perm);
                $scope.$apply();
                
            }
        });
        
        $scope.group.$save();
    };
    
}

GroupDetailsCtrl.$inject = ['$scope', 'Group', 'Permission', '$routeParams', '$location', '$filter'];

/*
 * User Area
 */




//User details

function UserDetailsCtrl($scope, Group, User, $routeParams, $location){
    $scope.groupList = Group.query(function(){
        merge($scope.groupList, $scope.user.groups);
    });
    $scope.user = User.get({'id':$routeParams.id}, function(){
        merge($scope.groupList, $scope.user.groups);
    });
    
    $scope.updateGroup = function(index){
        var group = $scope.groupList[index];
        $scope.groupList[index].status = group.checked;
        if(group.checked){
            
            search($scope.user.groups, 'id', group.id, function(item, index){
                if($scope.user.groups[index].status == "delete"){
                    $scope.user.groups[index].status = "add";
                }
            },
            function(){
                group.status = 'add';
                $scope.user.groups.push(angular.copy(group));
            });
        }else{
            search($scope.user.groups, 'id', group.id, function(item, index){
                $scope.user.groups[index].status = 'delete';
            }, 
            function(){
                 
            });
        }
        console.log($scope.user);
        $scope.user.$save();
    }
    
    $scope.remove = function(){
        $scope.user.$delete(function(){
            $location.path("/users");
        });
    };
    
    $scope.add = function(){
         angular.forEach($scope.permissionList, function(perm){
            if($scope.data.id === perm.id){
                $scope.group.permissions.push(perm);
                $scope.$apply();
                
            }
        });
        
        $scope.group.$save();
    };
    
    $scope.update = function(){
        $scope.user.$save();
    };
    
}

UserDetailsCtrl.$inject = ['$scope', 'Group', 'User', '$routeParams', '$location'];

