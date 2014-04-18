
angular.module('employeeApp.services')
.factory('SupplierContact', ['eaResource', function(eaResource) {
	return eaResource('supplier_contact/:id', {id:'@id'});
}]);
