'use strict';

angular.module('employeeApp')
  .directive('searchBar', [function () {
    return {
      template: '<div></div>',
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
          element.addClass('search-bar');
          element.append(angular.element('<input size="40" placeholder="Search" ng-model="query" />'));
          
          /*
           * The handler will detect if ctrl/cmd+F 
           * is pressed on the keyboard
           * 
           * If press occurs, we disable the default action
           * perform state specific actions
           */
          function searchHandler(evt){
              if((evt.which == "70" && (evt.metaKey || evt.ctrlKey))){
                  evt.preventDefault();
                  
                  //Determine
                  if(element.hasClass('focus')){
                      //Hide object and blur
                      element.blur();
                      element.removeClass('focus');
                  }else{
                      //Show and focus
                      element.focus();
                      element.addClass('focus');   
                  }
                  
              }
          }
          
          //Bind an action 
          $(window).on('keydown', searchHandler);
          
          //Unbind when leaving the Page
          scope.$on('$destroy', function(){
              $(window).off('keydown', searchHandler); 
          });
      }
    };
  }]);
