'use strict';

angular.module('employeeApp.services')
  .factory('User', ['eaResource', function(eaResource) {
    return eaResource('user/:id', {id:'@id'});   
  }]);
