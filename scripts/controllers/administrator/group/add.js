'use strict';

angular.module('employeeApp')
  .controller('AdministratorGroupAddCtrl', ['$scope', 'Group', 'Permission', '$location', 
  function ($scope, Group, Permission, $location) {
    $scope.permissionList = Permission.query();
    $scope.group = {};
    $scope.group.permissions = [];
    
    $scope.save = function(){
        var group = new Group();
        
        group.name = $scope.group.name;
        group.permissions = $scope.group.permissions;
        
        group.$save(function(){
            $location.path("/administrator/group");
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
  }]);
