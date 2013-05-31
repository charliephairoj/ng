'use strict';

angular.module('employeeApp')
    .controller('ProductTableViewCtrl', ['$scope', 'Table', 'Notification', function ($scope, Table, Notification) {
        Notification.display('Loading Upholstery...');
        $scope.tableList = Table.poll().query(function(){
            Notification.hide();
        });
        $scope.$on('$destroy', function(){
            Table.stopPolling();
        });
    }]);
