'use strict';

angular.module('employeeApp.directives')
.directive('tooltip', [function () {
          
	function getText(scope, attrs) {
		switch (attrs.tooltip) {
			case "price":
				return "Enter a price in the format of 100 or 123.45";
				break;
			default:
				return scope.$eval(attrs.tooltip);
				break;
		}
	}
      
      return {
          restrict: 'A',
          link: function postLink(scope, element, attrs) {
              var text = getText(scope, attrs);
              if(attrs.required){
                  text += " (Required)";
              }
              var tooltip = angular.element('<div class="tooltip right"><div class="tooltip-arrow"></div><div class="tooltip-inner">'+text+'</div></div>')
              var position = element.position();
              
              element.bind('mouseenter', function(){
                  element.parent().append(tooltip);
                  tooltip.css({
                      left: position.left+element.outerWidth(),
                      top: position.top-((tooltip.outerHeight()-element.outerHeight())/2)
                  });
                  tooltip.fadeTo(250, 0.8);
              });
              
              element.bind('mouseleave', function(){
                  tooltip.fadeTo(250, 0, function(){
                      tooltip.remove(); 
                  });
              });
              
          }
      };
  }]);
