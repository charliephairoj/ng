
angular.module('employeeApp')
.factory('Employee', ['$resource', '$http', function($resource) {
	return $resource('/api/v1/employee/:id', {id:'@id'}, {
		update: {
			method: 'PUT'
		},
		create: {
			method: 'POST'
		}
	});   
}]);