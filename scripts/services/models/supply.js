'use strict';

angular.module('employeeApp')
  .factory('Supply', ['$resource', function($resource) {
    return $resource('/api/v1/supply/:id', {id:'@id'});   
  }]);
