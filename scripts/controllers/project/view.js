'use strict';

angular.module('employeeApp')
    .controller('ProjectViewCtrl', ['$scope', 'Project', 'Notification' function ($scope, Project, Notification) {
        //Query the server for projects continouosly
        $scope.projectList = Project.poll().query();
        
        //Destructor
        $scope.$on('$destroy', function(){
            Project.stopPolling();
        })
    }]);
