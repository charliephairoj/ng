'use strict';

angular.module('employeeApp')
    .controller('ProjectViewCtrl', ['$scope', 'Project', 'Notification', 'Customer', '$location',
    function ($scope, Project, Notification, Customer, $location) {
        
        //Controlling attributes
        $scope.showAddProject = false;
        
        //Query the server for projects continouosly
        $scope.projectList = Project.poll().query();
        $scope.customerList = Customer.poll().query();
        
        
        //Create new project
        $scope.create = function(){
            Notification.display('Creating new project...', false);
            var project = new Project();
            angular.extend(project, $scope.project);
            project.$save(function(response){
                Notification.display('New project created.');
                $scope.projectList.push(response);
                $scope.project = {};
                $scope.showAddProject = false;
            });
        };
        
        //Destructor
        $scope.$on('$destroy', function(){
            Project.stopPolling();
            Customer.stopPolling();
        })
    }]);
