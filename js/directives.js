'use strict';

/* Directives */





angular.module('EmployeeCenter.directives', []).

/*
 * Create directive for on blue
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
directive('ecDroppable', function(){
    return {
        restrict:'A',
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
                console.log('maybe');
                event.preventDefault();
                event.originalEvent.dataTransfer.effectAllowed = "copy";
                console.log(1);
            }).bind('dragleave', function(event){
                event.preventDefault();
                event.originalEvent.dataTransfer.effectAllowed = "copy";
                console.log(2);
            });
        }
    }
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

directive('float', function(){
    var FLOAT_REGEXP = /^\-?\d+((\.|\,)\d+)?$/;
    return {
        require:'ngModel',
        link: function(scope, element, attr, ctrl){
            
        }
    }
})

;




