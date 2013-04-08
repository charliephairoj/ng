'use strict';

angular.module('employeeApp')
  .controller('AdministratorGroupViewCtrl', ['$scope', 'Group', function ($scope, Group) {
    $scope.groupList = Group.poll().query();
  }]);
