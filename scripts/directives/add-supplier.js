'use strict';

angular.module('employeeApp.directives')
  	.directive('addSupplier', ['$rootScope', 'Supplier', 'Notification', function ($rootScope, Supplier, Notification) {
    	return {
      		templateUrl: 'views/templates/add-supplier.html',
	      	replace: true,
	      	restrict: 'EA',
	      	scope: {'visible': '=addSupplier'},
	      	link: function postLink(scope, element, attrs) {
	      		/*
                 * Visibility Controll
                 * 
                 * This section controls whether the product selector 
                 * is visible or not. By watching the "visible" attribute,
                 * which has two way binding with the controller, we can see
                 * when the controller wants the selector to be displayed
                 * 
                 * If the selector is shown, and the background is click, the
                 * attribute in the controller is changed via two way binding 
                 * and an "onhide" function that is called once the selector is 
                 * hidden
                 */
                scope.$watch('visible', function(val){
                    if(val){
                        scope.modal.onhide = function(){
                            if($rootScope.$$phase == "$digest" || $rootScope.$$phase == "$apply"){
                                scope.visible = false;
                            }else{
                                $rootScope.$apply(function(){
                                    scope.visible = false; 
                                });
                            }
                        }
                        scope.modal.show();
                    }else{
                        scope.modal.hide();
                    }
                });
                
                
		     	
		     	
                scope.supplier = new Supplier();
                
	        
	        	
	        	scope.add = function(){
	        		console.log(scope.supplier);
	        		if(scope.form.$valid){
	        			Notification.display('Adding supplier...', false);
		        		scope.supplier.$save(function(response){
		        			Notification.display('Supplier added');
		        			scope.visible = false;
		        			scope.supplier = new Supplier();
		        		}, function(reason){
		        			console.log(reason);
		        		});
	        		}else{
	        			Notification.display('Please fill out the form properly');
	        		}
	        	};
	      	}
    	};
  	}]);
