'use strict';

angular.module('employeeApp')
  .controller('AdministratorUserAddCtrl', ['$scope', 'User', 'Group', '$location',
  function ($scope, User, Group, $location) {
    $scope.user = new User();
    $scope.user.groups = [];
    $scope.groups = Group.query({limit:0});
    
    $scope.save = function(){
        //Validates the form
        if($scope.form.$valid){
            
        	/*
        	 * Adds groups to the user
        	 * 
        	 * Runs through all the groups and checks if 
        	 * it hs been checked off. Groups that have been 
        	 * checked off are then added to the user groups
        	 */
        	for (var i=0; i<$scope.groups.length; i++) {
        		if ($scope.groups[i].$checked) {
        			$scope.user.groups.push(angular.copy($scope.groups[i]));
        		}
        	}
        	
        	/*
        	 * Saves the user by sending a POST request to the server
        	 */
            $scope.user.$create(function(){
                $location.path("/administrator/user");
            });
       }
         
         
         
         
    };
  }]);
