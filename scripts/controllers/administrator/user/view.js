'use strict';

function ViewUsersCtrl($scope, User){
    console.log(User);
    $scope.userList = User.poll().query();
}

ViewUsersCtrl.$inject = ['$scope', 'User'];
