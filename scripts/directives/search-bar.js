'use strict';

angular.module('employeeApp')
  .directive('searchBar', [function () {
    return {
      template: '<div></div>',
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
          element.addClass('search-bar');
          element.append(angular.element('<input size="40" placeholder="Search" ng-model="query" />'));
          
          function searchHandler(evt){
              if((evt.which == "70" && (evt.metaKey || evt.ctrlKey))){
                  console.log("STRG+F");
                  evt.preventDefault();
                  $("#searchbox").slideDown(110);
                  $('#search').focus();
              }
          }
          
          $(window).keypress(searchHandler);
          scope.$on('$destroy', function(){
              $(window).unbind('keypress', searchHandler); 
          });
      }
    };
  }]);
