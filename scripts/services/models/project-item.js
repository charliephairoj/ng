'use strict';

angular.module('employeeApp')
  .factory('models/projectItem', [function() {
    // Service logic
    // ...

    var meaningOfLife = 42;

    // Public API here
    return {
      someMethod: function() {
        return meaningOfLife;
      }
    };
  }]);
