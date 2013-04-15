'use strict';

angular.module('employeeApp')
  .controller('AdministratorGroupDetailsCtrl', ['$scope', 'Group', 'Permission', '$routeParams', '$location', '$filter',
  function ($scope, Group, Permission, $routeParams, $location, $filter) {
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
            
            search($scope.group.permissions, 'id', perm.id, angular.noop,
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
        $scope.group.$save(function(){
            //$apply changes to the model
            angular.forEach($scope.group.permissions, function(permission, index){
                if(permission.hasOwnProperty('status')) {
                    switch (permission.status) {
                        //Delete the group
                        case "delete":
                            $scope.group.permissions.splice(index, 1);
                            break;
                        //Delete the status
                        case "add":
                            delete permission.status;
                            break;
                        default:
                            delete permission.status;
                            break;
                    }
                }
            });
        });
    }
    
    $scope.remove = function(){
        $scope.group.$delete(function(){
            $location.path("/groups");
        });
    };
    
    $scope.$on('$destroy', function(){
        $scope.group.$save();
    });
  }]);
