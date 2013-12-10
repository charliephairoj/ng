
angular.module('employeeApp')
.controller('HrEmployeeViewCtrl', ['$scope', 'User', function ($scope, User) {
    $scope.employeeList = User.query();
    
    
}]);
