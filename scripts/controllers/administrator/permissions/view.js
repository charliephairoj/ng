'use strict';

//View permission controller
function ViewPermissionsCtrl($scope, Permission){
    $scope.permissionList = Permission.query();
}

ViewPermissionsCtrl.$inject = ['$scope', 'Permission'];
