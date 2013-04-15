'use strict';

angular.module('employeeApp.services')
  .factory('Acknowledgement', ['eaResource', function(eaResource) {
      return eaResource('acknowledgement/:id', {id:'@id'});   
  }]);
