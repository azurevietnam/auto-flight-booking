document.addEventListener('DOMContentLoaded', function () {
	document.getElementById('option').addEventListener('click', function () {
		chrome.tabs.create({
			url: 'src/options_custom/index.html'
		});

		trackEvent('option', 'clicked');

		window.close();
	}, false)
}, false);