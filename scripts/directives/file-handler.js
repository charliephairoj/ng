'use strict';

angular.module('employeeApp')
    .directive('fileHandler', ['$rootScope', function ($rootScope) {
        return {
            template: '<div class="file-handler">\
                            <div class="file-handler-message" ng-hide="files.length>0">\
                                <h3>Drop File Here</h3>\
                            </div>\
                            <div class="file-handler-list">\
                                <ul>\
                                    <li ng-repeat="file in files">{{file.name}}</li>\
                                </ul>\
                            </div>\
                       </div>',
            restrict: 'A',
            scope:{files: '=fileHandler'},
            replace: true,
            link: function postLink(scope, element, attrs) {
                var reader = new FileReader();
                
                console.log('test');
                
                //Drag Enter
                element.bind('dragenter', function(evt){
                    console.log('enter');
                    evt.preventDefault();
                    element.addClass('drag-drop-active');
                });
                
                //Drag Leave
                element.bind('dragleave', function(evt){
                   evt.preventDefault(); 
                   element.removeClass('drag-drop-active');
                });
                
                //Drag over
                element.bind('dragover', function(evt){
                    evt.preventDefault();
                    element.addClass('drag-drop-active');
                });
                
                element.bind('drop', function(evt){
                    evt.preventDefault();
                    evt.stopPropagation();
                    element.removeClass('drag-drop-active');
                    //Get original evt within jquery evt
                    var e = evt.originalEvent
                    //Get the files
                    var files = e.dataTransfer.files;
                    
                    console.log(files);
                    scope.files = files;
                });
            }
        };
    }]);
