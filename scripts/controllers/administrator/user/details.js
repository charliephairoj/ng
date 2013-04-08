'use strict';

angular.module('employeeApp')
  .controller('AdministratorUserDetailsCtrl', ['$scope', 'Group', 'User', '$routeParams', '$location',
  function ($scope, Group, User, $routeParams, $location) {
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
    };
    
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
  }]);
