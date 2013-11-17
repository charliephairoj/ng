'use strict';

angular.module('employeeApp.directives')
  	.directive('addSupply', ['$rootScope', 'Supplier', 'Supply', 'Notification', function ($rootScope, Supplier, Supply, Notification) {
    	return {
      		templateUrl: 'views/templates/add-supply.html',
	      	replace: true,
	      	restrict: 'EA',
	      	scope: {'visible': '=addSupply'},
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
                        try{
                        scope.modal.show();
                        }catch(e){}
                    }else{
                    	try{
                        scope.modal.hide();
                        }catch(e){}
                    }
                });
                
                scope.showWidth = function(){
		     		var units = scope.supply.units;
		     		var type = scope.supply.type;
		     		return units == "m" || units == "pc" || units == "pack" || units == "yd" ||
		     		(units == "kg" && type == "packaging") ? true : false;
		     	};
		     	
		     	scope.showDepth = function(){
		     		var units = scope.supply.units;
		     		return units == "pc" || units == "pack" ? true : false;
		     	};
		     	
		     	scope.showHeight = function(){
		     		var units = scope.supply.units;
		     		var type = scope.supply.type;
		     		return units == "pc" || units == "pack" || (units == "kg" && type == "packaging") ? true : false;
		     	};
		     	
                scope.supply = new Supply();
                scope.supply.units = 'piece';
	      		scope.suppliers = Supplier.query({limit:0});
	        
	        	
	        	scope.add = function(){
	        		if(scope.form.$valid){
	        			Notification.display('Add supply...', false);
		        		scope.supply.$create(function(response){
		        			Notification.display(scope.supply.description+" added");
		        			scope.visible = false;
		        			scope.supply = new Supply();
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
