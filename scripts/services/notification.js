angular.module('EmployeeCenter.services').
    factory('Notification', function($timeout){
        
        function center(target){
            var width = $(window).width();
            var tWidth = $(target).width();
            if($(target).css('left')==0){
                $(target).css('left', width-tWidth);
            }else{
                $(target).css('margin-left', -(tWidth/2));
            }
        }
        
        function Notifier(){
            this.notification = angular.element('#notification');
            console.log(this.notification);
            this.promise = null;
        }
        
        
        /*
         * The display function will display a new messge
         * And call a timeout after a certain amount of time
         * to fade out the message. If the message is already displayed,
         * it will just change the message and cancel the old timeout.
         */
        Notifier.prototype.display = function(message, autoHide){
            
            //Change message and 
            this.notification.html(message)
            center(this.notification);
            this.notification.addClass('active')
            
            //Cancels the fadingout and 
            //removal of message
            if(this.promise){
                $timeout.cancel(this.promise);
            }
            
            if(autoHide!=false){
               
                this.promise = $timeout(function(){
                    this.hide()
                    
                }.bind(this), 1000);
            }
        };
        
        Notifier.prototype.hide = function(){
            console.log(this);
            //Remove Message and 
            this.notification.removeClass('active');
        };
        
        return new Notifier();
        
        
    });
