'use strict';

angular.module('employeeApp')
  .directive('eaSave', [function () {
    return {
      template: '<div></div>',
      restrict: 'E',
      link: function postLink(scope, element, attrs) {
        element.text('this is the eaSave directive');
      }
    };
  }]);
