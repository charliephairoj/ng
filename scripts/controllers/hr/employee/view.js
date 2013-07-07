'use strict';

angular.module('employeeApp')
    .controller('HrEmployeeViewCtrl', ['$scope', 'User', function ($scope, User) {
        $scope.employeeList = User.poll().query();
        
        $scope.$on('$destroy', function(){
            User.stopPolling();
        })
    }]);
