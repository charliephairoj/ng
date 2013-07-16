'use strict';

angular.module('employeeApp')
    .controller('ProjectDetailsCtrl', ['$scope', 'Project', '$routeParams', 'Room', 'Notification',
    function ($scope, Project, $routeParams, Room, Notification) {
        
        $scope.showAddRoom = false;
        $scope.project = Project.poll().get({id:$routeParams.id});
        $scope.room = {};
        
        $scope.addImage = function(image){
            console.log(image);
            $scope.room.image = image;
            $scope.cropper.reset();
        };
        
        $scope.addSchematic = function(files){
            console.log(files);
        };
        
        $scope.addRoom = function(){
            Notification.display('Adding '+$scope.room.type, false);
            var room = new Room();
            angular.extend(room, $scope.room);
            room.project = {id:$scope.project.id};
            room.$save(function(response){
                Notification.display($scope.room.description+" added.");
                $scope.showAddRoom = false;
                $scope.project.rooms.push(room);
            });
        }
        $scope.$on('$destroy', function(){
            Project.stopPolling(); 
        });
    }]);
