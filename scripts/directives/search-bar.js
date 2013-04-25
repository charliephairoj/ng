'use strict';

angular.module('employeeApp')
  .directive('searchBar', [function () {
    return {
      template: '<div></div>',
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
          element.addClass('search-bar');
          element.append(angular.element('<input size="40" placeholder="Search" ng-model="query" />'));
          
          var searchHandler = function(e){
              e.preventDefault()
              console.log(e);
          };
          angular.element(document.body).keypress(searchHandler);
          scope.$on('$destroy', function(){
              angular.element(document.body).unbind('keypress', searchHandler); 
          });
      }
    };
  }]);
