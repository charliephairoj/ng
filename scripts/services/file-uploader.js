'use strict';

angular.module('employeeApp')
    .factory('FileUploader', ['$q', 'Notification', function($q, Notification) {
        var uploader = {};
        uploader.upload = function(file, url, data){
            
            if(!file.isPrototypeOf){
                throw new TypeError("Expectina a file");
            }
            
            var type = file.isPrototypeOf(Image) ? 'Image' : 'File';
           
            var fd = new FormData();
            fd.append(type.toLowerCase(), file);
            for(var i in data){
                fd.append(i, data[i]);
            }
            
            var deferred = $q.defer();
            
            jQuery.ajax(url || "upload/images", {
               type:'POST',
               data:fd,
               processData:false,
               contentType:false,
               success: function(response){
                   Notification.display(type+' Uploaded');
                   deferred.resolve(response);
               },
               error: function(response){
                   deferred.reject(response);
               }
            });
            
            return deferred.promise;
        }
        
        return uploader;
    }]);
