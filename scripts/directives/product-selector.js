'use strict';

angular.module('employeeApp')
    .directive('productSelector', ['Upholstery', 'Fabric', 'Table', '$rootScope', 'Notification',
    function (Upholstery, Fabric, Table, $rootScope, Notification) {
        return {
            templateUrl: 'views/templates/product-selector.html',
            replace: true,
            restrict: 'A',
            scope: {
                visible: '=productSelector',
                url: '@productSelectorUploadUrl',
                add: '&productSelectorAdd'
            },
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
          
                
                scope.upholsteryList = Upholstery.poll().query();
                scope.fabricList = Fabric.poll().query();
                scope.tableList = Table.poll().query();
                scope.product = {};
                
                function uploadImage(image, callback){
                    //Display Notification
                    Notification.display('Uploading Image', false);
                    //Set the upload Target
                    
                    //Get new image and add to form data
                    var fd = new FormData();
                    fd.append('image', image);
                    //Upload the image
                    console.log(scope.url);
                    jQuery.ajax(scope.url || "upload/images", {
                       type:'POST',
                       data:fd,
                       processData:false,
                       contentType:false,
                       success: function(response){
                           Notification.display('Image Uploaded');
                           (callback || angular.noop)(response);
                       }
                    });
                };
                
                scope.addUpholstery = function(upholstery){
                    if(upholstery){
                        scope.product = upholstery;
                        scope.selection = 'quantity';  
                    }else{
                        throw new TypeError("Expecting an Upholstery.");
                    }
                    
                };
                
                scope.addTable = function(table){
                    if(table){
                        scope.product = table;
                        scope.selection = 'quantity';
                    }else{
                        throw new TypeError("Expecting a Table.");
                    }
                    
                }
                
                scope.addCustomItem = function(item, image){
                    
                    if(item && image){
                        uploadImage(image, function(response){
                            scope.product = item;
                            scope.product.is_custom = true;
                            scope.product.type = 'custom';
                            scope.product.image = {}
                            angular.copy(response, scope.product.image);
                                            
                            scope.selection = 'quantity';
                        });
                        
                    }else{
                        throw new TypeError("Expecting a Custom Item and Image.");
                    }
                }
                
                scope.setQuantity = function(quantity){
                    scope.product.quantity = quantity;
                    if(scope.product.type.toLowerCase() == 'upholstery'){
                        scope.selection = 'fabric';
                    }else{
                        scope.visible = false;
                        scope.modal.hide(function(){
                            scope.selection = 'upholstery';
                        });
                        scope.add({product:scope.product});
                    }
                };
                
                scope.setFabric = function(){
                    scope.visible = false;
                    scope.modal.hide(function(){
                        scope.selection = 'upholstery';
                    });
                    scope.add({product:scope.product});
                };
                
                scope.reset = function(){
                    scope.product = {};
                    scope.selection = 'upholstery';  
                };
                
                scope.$on('$destroy', function(){
                    Upholstery.stopPolling();
                    Fabric.stopPolling();
                    Table.stopPolling(); 
                });
                
               
                         
            }
        };
    }]);
