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
directive('ecDraggable', function(){
    return {
        restrict:'A',
        replace:false,
        link: function(scope, element, attrs){
            element.attr('draggable', true);
            
            element.bind('dragstart', function(event) {

                event.originalEvent.dataTransfer.setData('text/plain', attrs.ecDraggable)
            });
            
            element.bind('dragend', function(event) {
                
            });
        }
    }
}).


/*
 * Makes something droppable
 */
directive('ecDroppable', function($parse){
    return {
        restrict:'EA',
        replace:false,
        link: function(scope, element, attrs){
            element.bind('drop', function(event){
                console.log('ok');
                event.stopPropagation();
                event.preventDefault();
                event.originalEvent.dataTransfer.effectAllowed = "copy";
                console.log(event.originalEvent.dataTransfer.getData('text/plain'));
                scope.data = JSON.parse(event.originalEvent.dataTransfer.getData('text/plain'));
                
                //if there is an function
                //then eval function
                if(attrs.ecDroppable){
                    scope.$eval(attrs.ecDroppable);
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
 * Creates a drag and drop 
 * for uploading stuff
 */
directive('ecDropTarget', function(){
    /*
     * Define functions to use for 
     * drag and drop operations
     */
    var dragEnterLeave = function(evt){console.log(evt);
        evt.stopPropagation();
        evt.preventDefault();
        $(this).toggleClass('active');
    };
    
   return {
       restrict:'EA',
       replace:true,
       templateUrl:'partials/components/drop_target.html',
       link: function(scope, element, attrs){
           /*
            * Define vars to be used later
            */
           var dropbox = element.children('.dropbox');
           var previewContainer = element.children('.previewContainer');
           //Create all scope items
           scope.filesToUpload = [];
           
           /*
            * Methods
            */
           
           //Function to clear files
           scope.clearFiles = function(){
              scope.filesToUpload = [];
              previewContainer.html('');  
           };
           //Function to remove file 
           scope.removeFile = function(val){
               
               var targetFile = $(this).parent().children('img')[0];
               var targetFileSize = $(targetFile).attr('img-size');
               var targetFileName = $(targetFile).attr('alt');
               
                //Removes file from the dom
                $(this).parent().fadeOut('slow', function(){
                   $(this).remove();
                });
                //remove from files to upload
                jQuery.each(scope.filesToUpload, function(index, file){
                   if(file){
                       if(file.name===targetFileName && file.size==targetFileSize){
                           scope.filesToUpload.splice(index, 1);
                       } 
                   }
                });
            };
           
           dropbox.bind('dragover', function(e){
               e.preventDefault();
           });
           
           dropbox.bind("dragenter", dragEnterLeave);
           dropbox.bind("dragleave", dragEnterLeave);
           
           dropbox.bind('drop', function(e){
              e.preventDefault();
              e.stopPropagation();
              $(this).removeClass('active');
              //Get the Files
              var files = e.originalEvent.dataTransfer.files;
              
              for (var i = 0, f; f = files[i]; i++) {
                  
                  if(f.type.match('image')){
                        
                      //Add to list of files to upload
                      scope.filesToUpload.push(f);
                      //Create File reader
                      var reader = new FileReader();
                      
                      
                      //Create function for when
                      //the reader loads
                      reader.onload = (function(img){
                          return function(e) {
                              
                              
                              // Render thumbnail.
                              var div = angular.element('<div></div>');
                              //Create the button to remove the image
                              //and delete from files array
                              var closeButton = angular.element('<div class="closeButton">remove</div>');
                              closeButton.bind('click', scope.removeFile);
                              
                              div.append(closeButton);
                              console.log(img);
                             
                              var tImg = ['<img class="thumb" src="', e.target.result,
                                              '" alt=', img.name, ' img-size="', img.size,'"/>'].join('');
                              div.hide().append(tImg);
                              previewContainer.append(div);
                              div.fadeIn('slow');
                            
                          };
                    
                         
                      })(f);
                      
                       // Read in the image file as a data URL.
                      reader.readAsDataURL(f);
                  }
              }
           });
           
       }
   }
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
})


;




