chrome.extension.sendMessage({}, function(response) {

	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);
		
		const COORDS_PER_SECOND = 8000;

		const vid = document.querySelector('video');
		function seek(coord) {
			vid.currentTime = coord / COORDS_PER_SECOND;
			setTimeout(() => {vid.pause()}, 10);
		}

		var videoElem = document.querySelector('video');

		function downloadCurrentFrame(video) {
			var canvas = document.createElement('canvas');
			canvas.height = video.videoHeight;
			canvas.width = video.videoWidth;
			var ctx = canvas.getContext('2d');
			ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
			return {
				dataURL: canvas.toDataURL(),
				coordinate: video.currentTime * COORDS_PER_SECOND,
				videoName: document.querySelector('h1.title').innerText.trim()
			};
		}
	

		chrome.runtime.onMessage.addListener(
			function(request, sender, sendResponse) {
				console.log("got message");
				switch (request.action) {
					case "seek":
						seek(request.to);
						sendResponse({});
						break;
					case "download":
						sendResponse(downloadCurrentFrame(videoElem));
						break;
					default:
						break;
				}
			}
		)

	}
	}, 10);
});