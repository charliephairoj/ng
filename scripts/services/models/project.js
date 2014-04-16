
angular.module('employeeApp.services')
.factory('Project', ['eaResource', function(eaResource) {
    return eaResource('project/:id', {id:'@id'});   
}]);
