'use strict';

/* Directives */





angular.module('EmployeeCenter.directives', []).

/*
 * adds the fade in class or fades in via javascript
 */
directive('fadeIn', function(){
    return {
        restrict:'A',
        replace:false,
        link: function(scope, element, attrs){
            element.addClass('fadeIn');
        }
    }
}).

/*
 * Create directive for on blur
 */
directive('ecBlur', function($parse){
    
    return {
       restrict:'A',
       replace:false,
       link: function(scope, element, attrs){
           element.bind('blur', function(){
               scope.$eval(attrs.ecBlur);
           });
       
           
       }
    };
}).

/*
 * Makes something draggable
 */
directive('dragOn', function(){
    return {
        restrict:'A',
        replace:false,
        link: function(scope, element, attrs){
            
            element.attr('draggable', true);
            element.bind('dragstart', function(event) {
                console.log(attrs.dragOn)
                event.originalEvent.dataTransfer.setData('text/plain', attrs.dragOn)
            });
            
        }
    }
}).


/*
 * Makes something droppable
 */
directive('dropOn', function($parse){
    return {
        restrict:'A',
        replace:false,
        link: function(scope, element, attrs){
            element.bind('drop', function(event){
                event.stopPropagation();
                event.preventDefault();
                event.originalEvent.dataTransfer.effectAllowed = "copy";
                console.log(event.originalEvent.dataTransfer.getData('text/plain'));
                scope.data = JSON.parse(event.originalEvent.dataTransfer.getData('text/plain'));
                
                //if there is an function
                //then eval function
                console.log(attrs.dropOn);
                if(attrs.dropOn){
                    scope.$eval(attrs.dropOn);
                }
                
            }).bind('dragover', function(event){
                event.preventDefault();
                event.originalEvent.dataTransfer.effectAllowed = "copy";
            }).bind('dragleave', function(event){
                event.preventDefault();
                event.originalEvent.dataTransfer.effectAllowed = "copy";
            });
        }
    }
}).



/*
 *Drag and Drop Area for Images
 * Files will be available as "scope.images" 
 */

directive('imageDropTarget', function($parse){
    
    
    return {
        restrict: 'EA',
        replace:false,
        link: function($scope, element, attrs){
            
            /*
             * Create Objects and Functions to be used
             */
            
            //File Reader
            var fileReader = new FileReader();
            
            fileReader.onload = function(evt){
                console.log(evt);
                
                var image = {
                    'url':evt.target.result
                }
               
                if(!$scope.imagePreviews){
                    $scope.imagePreviews = [];
                }
                
                $scope.imagePreviews.push(image);              
                $scope.$apply();
                
            };
            
           
           
            
            /*
             * Available methods to interact with this directive 
             * inlucde: clear images
             */
            
            //Clear Image
            $scope.clearImages = function(){
                
                $scope.images = [];
            };
            
            /*
             * Add functions to deal with the drag enter,leave and
             * over actions of the user
             */
            
            //Drag Enter
            element.bind('dragenter', function(evt){
                evt.preventDefault();
                element.addClass('active');
            });
            
            //Drag Leave
            element.bind('dragleave', function(evt){
               evt.preventDefault(); 
               element.removeClass('active');
            });
            
            //Drag over
            element.bind('dragover', function(evt){
                evt.preventDefault();
                element.addClass('active');
            });
            
            /*
             * This Section deals with the Dropping of the file, 
             * checking if it is an image, and adding it to the array
             * "scope.images"
             */
            
            element.bind('drop', function(evt){
                
                //prevent default
                evt.preventDefault();
                evt.stopPropagation();
                element.removeClass('active');
                
                //Get original evt within jquery evt
                var e = evt.originalEvent
                //Get the files
                var files = e.dataTransfer.files;
                
                //Loop Through all up loaded files,
                //validate that they are images and add
                //it to the "scope.images"
                for(var i=0; i<files.length; i++){
                    
                    if(files[i].type == "image/png" || files[i].type == "image/jpeg"){
                        
                        if(!$scope.images){
                            $scope.images = [];
                        }
                        
                        $scope.images.push(files[i]);
                        fileReader.readAsDataURL(files[i]);
                    }
                }
                //Eval the attr of this directive
                $scope.$eval(attrs.imageDropTarget);
            })
        }
    };
}).


/*
 * Directives for form validation
 */

directive('beautify', function($filter, $parse){
   return {
       restrict:'A', 
       link: function(scope, element, attr){
            //bind to blur
            element.bind('blur', function(){
                //create new beautified version
                var beautifiedValue = $filter('beautify')(element.context.value);
                //apply to input
                element.context.value = beautifiedValue
                //assign to model
                $parse(attr.ngModel).assign(scope, beautifiedValue)
            })  
           
           
       }
   } 
}).


//Transform numbers into format

directive('telephone', function($filter, $parse){
   return {
       restrict:'A', 
       link: function(scope, element, attr){
            //bind to blur
            element.bind('blur', function(){
                //create new beautified version
                var filteredValue = $filter('telephone')(element.context.value);
                //apply to input
                element.context.value = filteredValue
                //assign to model
                $parse(attr.ngModel).assign(scope, filteredValue)
            })  
           
           
       }
   } 
}).

/*
 * Map
 */
directive('map', function(){
    //Create the variables to be used
    var map,
        marker,
        //Options for the map 
        mapOptions= {
            center: new google.maps.LatLng(13.776239,100.527884),
            zoom: 10,
            mapTypeId: google.maps.MapTypeId.HYBRID
        };
    
    //Function to initialize the map
    function initialize() {
        
        map = new google.maps.Map(document.getElementById("map_canvas"),mapOptions);
            
             
    }
    
    //create marker function
    function createMarker(params){
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(13.776239,100.527884),
            draggable:true,
            map: map,
            title:params.title
        });
        
        google.maps.event.addListener(marker, 'mouseup', params.mouseUp);
        
        return marker;
    }
    return {
        restrict:'A',
        replace:false,
        link: function(scope, element, attrs){
          var geocoder = new google.maps.Geocoder();
          initialize();
          
          
          //geocodes from the address
          scope.getPosition = function(){
              //If all necessary parts of the address are defined
              if(scope.supplier.address1 && scope.supplier.city && scope.supplier.territory && scope.supplier.country){
                  //create address string
                  var address = scope.supplier.address1+', '+scope.supplier.city+', '+scope.supplier.territory+', '+scope.supplier.country+' '+scope.supplier.zipcode;
                  //Geocode the address via google maps
                  geocoder.geocode({'address':address}, function(results, status){
                    //create marker if not yet created
                    if(marker == null || marker == undefined){
                        //call function to create marker
                        createMarker({
                            'title':scope.supplier.name,
                            'mouseUp':function(){
                                //get position 
                                var position = marker.getPosition();
                                //Set lat and Long
                                scope.supplier.lat = position.$a;
                                scope.supplier.lng = position.ab;
                            } 
                        });
                        
                       
                    //set marker position if already created
                    }else{
                        marker.setPosition(results[0].geometry.location);    
                    }
                    map.panTo(marker.getPosition());
                    map.setZoom(14);
                    //apply the lat and long
                    scope.supplier.lat = results[0].geometry.location.$a;
                    scope.supplier.lng = results[0].geometry.location.ab;
                  });
              }
          }
          
        }
    }
}).

/*
 * Click and send to url for all elements
 */
directive('clickUrl', function($location){
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
    }
}).

/*
 * Modal Directive
 */

directive('modal', function(){
    function create_backdrop(){
        var backdrop = angular.element('<div></div>');
        backdrop.attr('id', 'backdrop');
        console.log(backdrop);
        return backdrop;
    }
    return {
        restrict:'A',
        scope: false,
        require:'ngModel',
        link: function(scope, element, attr, controller){
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
                scope.$apply(function(){
                    attr.ngModel = false; 
                });
            });
            backdrop.bind('onclick', function(){
                console.log('ok');
                scope.$apply(function(){
                    attr.ngModel = false; 
                });
            });
            
            scope.$watch(attr.ngModel, function(value){
               if(value){
                   element.removeClass('hide');
                   $(document.body).append(backdrop);
                   backdrop.fadeTo(500, 0.7);
                   element.fadeTo(500, 1);
               }else{
                   element.fadeOut(400, function(){
                       element.addClass('hide');
                   }); 
                   backdrop.fadeOut(500, function(){
                      backdrop.remove(); 
                   });
               }
            });
        }
    }
})

;




