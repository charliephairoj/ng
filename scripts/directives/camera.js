'use strict';

angular.module('employeeApp.directives')
.directive('camera', ['CameraService', function (CameraService) {
	return {
		template: '<div class="camera"><canvas></canvas><video class="camera-video"></video><div class="snapshot-btn"></div><div class="retake-btn">Retake</div></div>',
		restrict: 'EA',
		replace: true,
		scope: {
			onSnapshot: '&'
		},
		link: function postLink(scope, element, attrs) {
			//console.log('test');
			//console.log(CameraService.hasUserMedia());
			if (!CameraService.hasUserMedia()) {return}
			
			var userMedia = CameraService.getUserMedia,
				btn = element.find('.snapshot-btn'),
				retakeBtn = element.find('.retake-btn'),
				canvas = element.find('canvas')[0],
				ctx = canvas.getContext('2d'),
				video = element.find('video')[0],
				width = attrs.width || 1280,
				height = attrs.height || 720;
				
								
			var onSuccess = function (stream) {
				console.log('ok');
				video.src = window.URL.createObjectURL(stream);
				
				video.play();
				console.log(video.videoWidth);
				console.log(video.videoHeight)
				btn.click(function () {
					takeSnapshot();
				});
				
				retakeBtn.click(function () {
					retake();
				});
			}
			
			navigator.getUserMedia({
				video: {
					mandatory: {
						minWidth: width,
						minHeight: height
					}
				},
				audio: false
			}, onSuccess, function (e) {
				console.log(e);
			});
			
			function getImageAsBlob(url) {
		        var bytes = atob(url.split(',')[1]);
		        var stream = new Uint8Array(bytes.length);
		        for (var key in bytes) {
		            stream[key] = bytes.charCodeAt(key);
		        }
		        return new Blob([stream], {type: 'image/jpeg'});
			}
			
			function retake() {
				$(canvas).removeClass('active');
			}
			
			function takeSnapshot() {
				width = video.videoWidth;
				height = video.videoHeight;
				
				canvas.width = width;
				canvas.height = height;
				
				ctx.fillRect(0, 0, width, height);
      			ctx.drawImage(video, 0, 0, width, height);
      			$(canvas).addClass('active');
      			var img = getImageAsBlob(canvas.toDataURL("image/jpeg"));
      			scope.onSnapshot({$image: img});
			}
		}
	};
}]);
