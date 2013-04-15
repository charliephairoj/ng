'use strict';

angular.module('employeeApp')
  .controller('AdministratorUserViewCtrl', ['$scope', 'User', function ($scope, User) {
     $scope.userList = User.poll().query();
     $scope.$on('$destroy', function(){
         User.stopPolling(); 
     });
  }]);
