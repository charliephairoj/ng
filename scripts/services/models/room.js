
angular.module('employeeApp.services')
.factory('Room', ['$resource', function($resource) {
    return $resource('project/room/:id', {id:'@id'});   
}]);
