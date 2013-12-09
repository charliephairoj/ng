
angular.module('employeeApp.directives')
.directive('modal', [function () {
    var backdrop;
    
    function create_backdrop(){
        return angular.element('<div id="backdrop"></div>');
    }
    
    
    
    return {
        restrict:'A',
        scope: false,
        link: function(scope, element, attr){
            element.addClass('modal hide');
           
            function show(scope, element) {
                element.removeClass('hide');
                backdrop = create_backdrop();
                $(document.body).append(backdrop); 
                backdrop.on('click', function () {
                    hide(scope, element, backdrop);
                });
                
                backdrop.fadeTo(500, 0.7);
                element.fadeTo(500, 1, function () {
                    scope.$broadcast('shown');
                });
            }
            
            function hide(scope, element, backdrop, callback){
                
                element.fadeOut(400, function () {
                    element.addClass('hide');
                    scope.$broadcast('hidden');
                });
                
                if (backdrop) {
                    backdrop.fadeOut(500, function () {
                        backdrop.remove();
                        
                        (callback || angular.noop)();
                        try {
							(scope.modal._onhide || angular.noop)();
                        } catch(e) {
							console.warn(e);
                        }
                        
                        if(attr.ngModel){
                            scope.$apply(function(){
                                scope[attr.ngModel] = false;
                            });
                        }
                    });
                }
                
            }
			/*
			* Hide the modal when the page
			* changes based on the scope 
			* messages
			*/
            scope.$on('$destroy', function(){
				if(backdrop){
					backdrop.remove();
                }
            });
            
            if(attr.ngModel){
                scope.$watch(attr.ngModel, function(value){
                    console.log(value);
                    if(value){
                        show(scope, element);
                    }else{
                        
                        hide(scope, element, backdrop);
                    }
                });
            }
            
			scope.modal = {_onhide: []};
            scope.modal.show = function(){
                show(scope, element);
            };
            scope.modal.hide = function(callback){
                hide(scope, element, backdrop, callback);
			};
            
            Object.defineProperties(scope.modal, {
                onhide: {
                    set: function(fn){
                        
                        this._onhide = fn;
                    }
                }
            });
            
           

        }
    };
}]);
