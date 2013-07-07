'use strict';

angular.module('employeeApp')
  .directive('modal', [function () {
    function create_backdrop(){
        var backdrop = angular.element('<div></div>');
        backdrop.attr('id', 'backdrop');
        return backdrop;
    }
    return {
        restrict:'A',
        scope: false,
        require:'ngModel',
        link: function(scope, element, attr, controller){
            console.log(attr.ngModel);
            element.addClass('modal hide');
            var children = element.children();
            for(var i=0; i<children.length; i++){
                if($(children[i]).hasClass('list')){
                    var list_container = angular.element("<div class='list_container'></div>");
                   $(children[i]).appendTo(list_container);
                   element.append(list_container);
                }
            }
            var backdrop = create_backdrop();
            
            backdrop.bind('click', function(){
                console.log('ok');
                scope.$set(attr.ngModel, false);
            });
            
            
            scope.$on('$destroy', function(){
                backdrop.remove();
            });
            scope.$watch(attr.ngModel, function(value){
                console.log(value);
               if(value){
                   element.removeClass('hide');
                   $(document.body).append(backdrop);
                   backdrop.fadeTo(500, 0.7);
                   element.fadeTo(500, 1, function(){
                       scope.$broadcast('shown');
                   });
               }else{
                   element.fadeOut(400, function(){
                       element.addClass('hide');
                       scope.$broadcast('hidden');
                   }); 
                   backdrop.fadeOut(500, function(){
                      backdrop.remove(); 
                   });
               }
            });
        }
    };
  }]);
