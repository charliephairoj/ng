'use strict';

/* Filters */

angular.module('EmployeeCenter.filters', []).
  filter('interpolate', ['version', function(version) {
    return function(text) {
      return String(text).replace(/\%VERSION\%/mg, version);
    }
  }]);
  
  /* 
   * Filter into proper telephone
   */
  
  
  
  
  
