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
  }]);
