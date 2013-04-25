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
              e.preventDefault();
              console.log(e);
              if((e.which == "70" && (e.metaKey || e.ctrlKey))){
                        
                        
          };
          angular.element(window).keypress(searchHandler);
          scope.$on('$destroy', function(){
              angular.element(window).unbind('keypress', searchHandler); 
          });
      }
    };
  }]);
