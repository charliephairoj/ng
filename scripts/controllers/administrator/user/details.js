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
            
            search($scope.user.groups, 'id', group.id, angular.noop,
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
        //Save the model
        $scope.user.$save(function(){
            //$apply changes to the model
            angular.forEach($scope.user.groups, function(group, index){
                if(group.hasOwnProperty('status')) {
                    switch (group.status) {
                        //Delete the group
                        case "delete":
                            $scope.user.groups.splice(index, 1);
                            break;
                        //Delete the status
                        case "add":
                            delete group.status;
                            break;
                        default:
                            delete group.status;
                            break;
                    }
                }
            });
        });
    };
    
    $scope.remove = function(){
        $scope.user.$delete(function(){
            $location.path("/users");
        });
    };
    
    $scope.update = function(){
        $scope.user.$save();
    };
    
    $scope.$on('$destroy', function(){
        $scope.user.$save(); 
    });
    
  }]);
