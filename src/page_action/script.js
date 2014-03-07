function setSetting(key, value) {
	localStorage.setItem('store.settings.' + key, value);
}

function getSetting(key) {
	return JSON.parse(localStorage.getItem('store.settings.' + key));
}

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
	}, false);

	// Options
	var options = {
		minPrice: getSetting('minPrice') || DEFAULTS.minPrice,
		reloadSecond: getSetting('reloadSecond') || DEFAULTS.reloadSecond
	};

	var optionEls = document.querySelectorAll('.option'),
		optionEl;

	for (var i = 0; i < optionEls.length; i++) {
		optionEl = optionEls[i];

		optionEl.value = options[optionEl.dataset.property];

		optionEl.addEventListener('change', function () {
			setSetting(this.dataset.property, this.value);
		}, false);
	}
}, false);