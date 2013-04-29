'use strict';

angular.module('employeeApp.directives')
    .directive('fileCropper', [function () {
        function Scene(ctx, image){
            this.ctx = ctx;
            this.img = image;
            this.x
            this.bX = 10;
            this.bY = 10;
            this.bH = 200;
            this.bW = 100;
            this.mouseX;
            this.mouseY;
            this.corners = [];
            
            
            
        }
        
        Scene.prototype.repositionCorners = function(){
            this.corners['topLeft'] = {x:this.bX, y:this.bY};
            this.corners['topRight'] = {x:this.bX+this.bW, y:this.bY};
            this.corners['bottomRight'] = {x:this.bX+this.bW, y:this.bY+this.bH};
            this.corners['bottomLeft'] = {x:this.bX, y:this.bY+this.bH};
        }
        
        Scene.prototype.inCorner = function(x, y){
            for(var key in this.corners){
                if(Math.sqrt(Math.pow(x-this.corners[key].x, 2)+Math.pow(y-this.corners[key].y, 2)) <= 10){
                    return key;
                }
            }
        }
        Scene.prototype.drawCube = function(x, y){
            this.ctx.beginPath();
            this.ctx.arc(x, y, 5, 0, Math.PI*2, true);
            this.ctx.fill();
        }
        Scene.prototype.drawCubes = function(){
            this.ctx.fillStyle = 'rgb(255, 255, 255)'
            this.drawCube(this.bX, this.bY);
            this.drawCube(this.bX+this.bW, this.bY+this.bH);
            this.drawCube(this.bX+this.bW, this.bY);
            this.drawCube(this.bX, this.bY+this.bH);
        }
        
        Scene.prototype.drawBackground = function(){
            this.ctx.drawImage(this.img, 0, 0);
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
            this.ctx.fillRect(0, 0, this.img.width, this.img.height);
        }
        
        Scene.prototype.draw = function(){
            //Calculations
            this.repositionCorners();
            
            //Rendering
            this.drawBackground();
            this.ctx.drawImage(this.img, this.bX, this.bY, this.bW, this.bH, this.bX, this.bY, this.bW, this.bH);
            this.drawCubes();
        }
        
        Scene.prototype.drawImage = function(){
            this.ctx.drawImage(this.img, 0, 0);
        }
        
        Scene.prototype.getCroppedImage= function(){
            var imageData = this.ctx.getImageData(this.bX, this.bY, this.bW, this.bH);
            canvas.width = this.bW
            canvas.height = this.bH
            this.ctx.putImageData(imageData, 0, 0)
            var url = canvas.toDataURL();
            console.log(url);    
            window.open(url);
            return url;
        }
        return {
            restrict: 'A',
            link: function postLink(scope, element, attrs) {
                var cubes = []
                var canvas = element[0];
                var fileReader = new FileReader();
                var ctx = canvas.getContext('2d');
                var mouseX;
                var mouseY;
                var corner;
                var scene;
                var image;
                var mousedown = false;
                
                fileReader.onload = function(evt){
                    console.log(evt);
                    image = new Image();
                    image.onload = function(e){
                        canvas.width = image.width;
                        canvas.height = image.height;
                        scene = new Scene(ctx, image);
                        scene.drawImage();
                    };
                    image.src = evt.target.result;
                    
                }
                
                element.addClass('file-cropper');
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
                
                element.bind('drop', function(evt){
                    evt.preventDefault();
                    evt.stopPropagation();
                    element.removeClass('active');
                    //Get original evt within jquery evt
                    var e = evt.originalEvent
                    //Get the files
                    var file = e.dataTransfer.files[0];
                    fileReader.readAsDataURL(file);
                })

                function mouseDown(e){
                    mousedown = true;
                    mouseX = e.offsetX;
                    mouseY = e.offsetY;
                    corner = scene.inCorner(e.offsetX, e.offsetY);
                }
                
                function mouseMove(e){
                    if(mousedown){
                        if(corner){
                            switch(corner){
                                case "topLeft":
                                    scene.bW = scene.bW + (mouseX-e.offsetX);
                                    scene.bH = scene.bH + (mouseY-e.offsetY);
                                    scene.bY = scene.bY - (mouseY-e.offsetY);
                                    scene.bX = scene.bX - (mouseX-e.offsetX);
                                    break;
                                case "topRight":
                                    scene.bW = scene.bW - (mouseX-e.offsetX);
                                    scene.bH = scene.bH + (mouseY-e.offsetY);
                                    scene.bY = scene.bY - (mouseY-e.offsetY);
                                    break;
                                case "bottomRight":
                                    scene.bW = scene.bW - (mouseX-e.offsetX);
                                    scene.bH = scene.bH - (mouseY-e.offsetY);
                                    break;
                                case "bottomLeft":
                                    scene.bX = scene.bX - (mouseX-e.offsetX);
                                    scene.bH = scene.bH - (mouseY-e.offsetY);
                                    scene.bW = scene.bW + (mouseX-e.offsetX);
                                    break;
                            }
                        }else{
                            scene.bX = scene.bX - (mouseX - e.offsetX);
                            scene.bY = scene.bY - (mouseY - e.offsetY);
                        }
                        
                        mouseX = e.offsetX;
                        mouseY = e.offsetY;
                        scene.draw();
                        
                    }
                }
                
                function mouseUp(e){
                    mousedown = false;
                    corner = false;
                }
                
                function mouseLeave(e){
                    mousedown = false;
                    corner = false;
                }
                
                
                element.bind('click', function(){
                    scope.crop();
                });
                /*
                 * API Section
                 * 
                 * Methods:
                 * -crop
                 * -save
                 */
                scope.crop = function(){
                    scene.draw();
                    element.bind('mousedown', mouseDown);
                    element.bind('mousemove', mouseMove);
                    element.bind('mouseup', mouseUp);
                    element.bind('mouseleave', mouseLeave);
                };
                
                scope.save = function(){
                    element.unbind('mousedown', mouseDown);
                    element.unbind('mousemove', mouseMove);
                    element.unbind('mouseup', mouseUp);
                    element.unbind('mouseleave', mouseLeave);
                };
                
                scope.getImage = function(){
                    return 
                }
            }
        };
    }]);
