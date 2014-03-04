document.addEventListener('DOMContentLoaded', function () {
	document.getElementById('toggle').addEventListener('click', function () {
		chrome.tabs.query({ active: true, windowId: chrome.windows.WINDOW_ID_CURRENT }, function(tabs) {
			chrome.tabs.sendMessage(
				tabs[0].id, {
					route: "toggleStatus",
				}, function(response) {
					windows.close();
				}
			);
		});
	});

	document.getElementById('option').addEventListener('click', function () {
		chrome.tabs.create({
			url: 'src/options_custom/index.html'
		});

		trackEvent('option', 'clicked');

		window.close();
	}, false)
}, false);