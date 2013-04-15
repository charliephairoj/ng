'use strict';

angular.module('employeeApp.services')
  .factory('Group', ['eaResource', function(eaResource) {
    return eaResource('group/:id', {id:'@id'});   
  }]);
