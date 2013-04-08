'use strict';

angular.module('employeeApp')
  .directive('dragOn', [function () {
    return {
        restrict:'A',
        replace:false,
        link: function(scope, element, attrs){
            
            element.attr('draggable', true);
            element.bind('dragstart', function(event) {
                console.log(attrs.dragOn)
                event.originalEvent.dataTransfer.setData('text/plain', JSON.stringify(scope.$eval(attrs.dragOn)));
            });
            
        }
    }
  }]);
