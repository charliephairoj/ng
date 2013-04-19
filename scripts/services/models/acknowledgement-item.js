'use strict';

angular.module('employeeApp')
  .factory('AcknowledgementItem', ['eaResource', function(eaResource) {
      return eaResource('acknowledgement/item/:id', {id:'@id'});   
  }]);
