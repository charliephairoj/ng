'use strict';

function AddUserCtrl($scope, User, Group, $location){
    $scope.user = {};
    $scope.user.groups = [];
    $scope.groupList = Group.query();
    
    $scope.add = function(){
        angular.forEach($scope.groupList, function(group){
            if($scope.data.id === group.id){
                $scope.user.groups.push(group);
                $scope.$apply();
                
            }
        });
    };
    
    
    $scope.save = function(){
        
        
        //Validates the form
        if($scope.form.$valid){
            user = new User();
            angular.copy($scope.user, user);
            user.$save(function(){
                $location.path("/users");
            });
        }
         
         
         
         
    };
}

AddUserCtrl.$inject = ['$scope', 'User', 'Group', '$location'];

