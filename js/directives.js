'use strict';

/* Directives */





angular.module('EmployeeCenter.directives', []).

/*
 * Fade an image in when it loads
 */
directive('fadeLoad', function(){
    return {
        restrict:'A',
        replace:false,
        link: function(scope, element, attrs){
            element.css('opacity', 0);
            element.bind('load', function(){
                element.fadeTo(1000, 1);
            });
        }
    }
})
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
                event.originalEvent.dataTransfer.setData('text/plain', JSON.stringify(scope.$eval(attrs.dragOn)));
            });
            
        }
    }
}).


/*
 * Makes something droppable
 */
directive('dropOn', function($parse){
    function emptyStrFilter(element, index, array){
        return (element != "");
    }
    /*
     * Function helps get the target object
     * in the scope
     */
    function getTarget(scope, targetString){
        //Assigns vars
        
        /*
         * Extracts the first string part, which
         * we can expect to exsist. Then we extract
         * the last part, which we check if we need
         * to make
         */
        var preTarget = targetString.split(/\.\w*$/).shift(),
            targetObj = targetString.split(/\./).pop(),
            target;
        //Evaluates against scope
        target = scope.$eval(preTarget);
        //check if obj exsists and create if not
        target[targetObj] = target[targetObj] || {};
        //advances the progressing
        target = target[targetObj];
        //Return 
        return target;
    }
    /*
     * Function returns the data from the drop event
     * and automatically parses it
     */
    function getData(event){
        return JSON.parse(event.originalEvent.dataTransfer.getData('text/plain'));
    }
    //Prevent Propagation
    function preventPropagation(event){
        event.stopPropagation();
        event.preventDefault();
        event.originalEvent.dataTransfer.effectAllowed = "copy";
    }
    
    return {
        restrict:'A',
        replace:false,
        link: function(scope, element, attrs){
            element.bind('drop', function(event){
                preventPropagation(event);
                element.removeClass('drag');
                /*
                 * Gets the target and copies
                 * the data from the dragged 
                 * object to it
                 */
                scope.$apply(function(){
                    var target = getTarget(scope, attrs.dropOn);
                    angular.copy(getData(event), target);
                });
                
                
            }).bind('dragover', function(event){
                preventPropagation(event);
                element.addClass('drag');
            }).bind('dragleave', function(event){
                preventPropagation(event);
                element.removeClass('drag');
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
                //Create array if not exists
                $scope.imagePreviews = $scope.imagePreviews || [];
                
                $scope.$apply(function(){
                    $scope.imagePreviews.push(image);          
                });
            };
            /*
             * Available methods to interact with this directive 
             * inlucde: clear images
             */
            
            //Clear Image
            $scope.clearImages = function(){
                $scope.images ? $scope.images.length = 0 : $scope.images = [];
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
                        //Create array if not exists
                        $scope.images = $scope.images || [];
                        //Push image   
                        $scope.images.push(files[i]);
                        //Read data and push to preview
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
    var latLng = {},
        map,
        marker,
        //Options for the map 
        mapOptions= {
            center: new google.maps.LatLng(13.776239,100.527884),
            zoom: 10,
            mapTypeId: google.maps.MapTypeId.HYBRID
        };
    
    function getRegion(country){
        switch(country.toLocaleLowerCase()){
            case "thailand":
                return 'TH';
            case "usa":
                return "US";
            case "us":
                return 'US';
            case "italy":
                return 'IT';
            case 'spain':
                return 'ES';
            case 'germany':
                return 'DE';
            case 'china':
                return 'CN';
            case 'india':
                return 'IN';
            case 'new zealand':
                return 'NZ';
            case 'australia':
                return 'AU';
            default:
                return false;
        }
    }
    //Function to initialize the map
    function initialize() {
        
        
            
             
    }
    return {
        restrict:'A',
        replace:false,
        link: function(scope, element, attrs){
            var geocoder = new google.maps.Geocoder();
            scope.map = scope.map || {};
            map = new google.maps.Map(document.getElementById("map_canvas"),mapOptions);
            scope.map.map = map;    
            scope.map.markers = [];   
            //Refresh the map if a shown event is broadcast
            scope.$on('shown', function(){
              google.maps.event.trigger(map, 'resize');
            });
            //Create a marker and adds to scope.map.markers
            scope.map.createMarker = function(obj){
              if(obj.lat && lat.lng){
                  var marker = new google.maps.Marker({
                      position: new google.maps.LatLng(obj.lat, obj.lng),
                      draggable:true,
                      map: map,
                      title:params.title
                  });
                  if(obj.mouseUp){
                      google.maps.event.addListener(marker, 'mouseup', obj.mouseUp);
                  }
                  //Add Marker to array
                  scope.map.markers.push(marker);
                  //return marker
                  return marker;
              }else{
                  return false;
              }
            };
            //Set map position
            scope.map.setPosition = function(obj){
                var latLng = new google.maps.LatLng(obj.lat, obj.lng);
                map.panTo(latLng);
                map.setZoom(14);
                if(obj.updateMarker){
                    scope.map.markers.length > 0 ? scope.map.markers[0].setPosition(latLng) : scope.map.createMarker(obj);
                }
            };
            //geocodes from the address
            scope.map.getPosition = function(obj, arg2, arg3){
              //If all necessary parts of the address are defined
                //create address string
                  var address =  obj.address1 ? address+' '+obj.address1 : '';
                  address = obj.address2 ? address+' '+obj.address2 : address;
                  address = obj.city ? address+', '+obj.city : address;
                  address = obj.territory ? address+', '+obj.territory : address;
                  address = obj.country ? address+', '+obj.country : address;
                  address = obj.zipcode ? address+' '+obj.zipcode : address;
                  var requestObj = {address:address};
                  if(obj.country){
                      var region = getRegion(obj.country);
                      if(region){
                          requestObj['region'] = region;
                      }
                  }else if(requestObj.address.search(/[\u0E00-\u0E7F]+/g) != -1){
                      requestObj['region'] = 'TH';
                  }
                  //Geocode the address via google maps
                  geocoder.geocode(requestObj, function(results, status){
                    if(results.length>0){
                        var positions = [];
                        angular.forEach(results, function(result){
                            positions.push({lat:result.geometry.location.lat(),
                                            lng:result.geometry.location.lng()})
                         
                        });
                        if(angular.isFunction(arg2)){
                            arg2(positions[0]);
                        };   
                    }else{
                        if(angular.isFunction(arg3)){
                            arg3();
                        }
                    }
                  });
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

directive('modal', function($parse){
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
            backdrop.bind('mouseenter', function(){
                console.log('ok');
                attr.$set('ngModel', false);
            });
            
            
            scope.$on('$destroy', function(){
                backdrop.remove();
            });
            scope.$watch(attr.ngModel, function(value){
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
    }
})

;




