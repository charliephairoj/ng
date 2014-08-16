'use strict';

angular.module('employeeApp.services')
  .service('D3', function D3() {
	  return d3;
    // AngularJS will instantiate a singleton by calling "new" on this function
  });
