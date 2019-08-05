chrome.extension.sendMessage({}, function(response) {
	var readyStateCheckInterval = setInterval(function() {
	if (document.readyState === "complete") {
		clearInterval(readyStateCheckInterval);
		
		const vid = document.querySelector('video');
		function seek(coord) {
			vid.currentTime = coord / 8000;
			setTimeout(() => {vid.pause()}, 10);
		}

		chrome.runtime.onMessage.addListener(
			function(request, sender, sendResponse) {
				console.log("got message");
				switch (request.action) {
					case "seek":
						seek(request.to)
						break;
					default:
						break;
				}
			}
		)

	}
	}, 10);
});