
angular.module('employeeApp')
.controller('ProjectDetailsCtrl', ['$scope', 'Project', '$routeParams', 'Room', 'Notification', 'FileUploader',
function ($scope, Project, $routeParams, Room, Notification, FileUploader) {
    
    $scope.showAddRoom = false;
    $scope.flag = false;
    $scope.project = Project.get({id:$routeParams.id});
    $scope.room = {};
    
    $scope.addImage = function (image) {
        var promise = FileUploader.upload(image, 'project/room/image');
        promise.then(function (response) {
            $scope.room.image = response;
            $scope.cropper.reset();
        });
    };
    
    $scope.addSchematic = function (files) {
        var file = angular.isArray(files) ? files[0] : files;
        var promise = FileUploader.upload(file, 'project/room/schematic');
        promise.then(function (response) {
            $scope.room.schematic = response; 
        });
    };
    
    $scope.addRoom = function () {
        Notification.display('Adding '+$scope.room.type, false);
        var room = new Room();
        angular.extend(room, $scope.room);
        room.project = {id:$scope.project.id};
        room.$save(function (response) {
            Notification.display($scope.room.description+" added.");
            $scope.showAddRoom = false;
            $scope.project.rooms.push(room);
        }, function (e) {
            $scope.flag = true; 
            console.log(e);
        });
    };
    
}]);
