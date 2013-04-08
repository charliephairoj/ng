'use strict';

angular.module('employeeApp')
  .directive('clickUrl', [function () {
    return {
        restrict:'A',
        link: function(scope, element, attr){
            element.bind('click', function(){
               console.log(scope.category);
               scope.category='fabric';
                $location.path(attr.clickUrl);
                scope.$apply();
            });
            
        }
    };
  }]);
