function setSetting(key, value) {
	localStorage.setItem('store.settings.' + key, value);
}

function getSetting(key) {
	return JSON.parse(localStorage.getItem('store.settings.' + key));
}

function getCurrentTab(callback) {
	chrome.tabs.query({ active: true, windowId: chrome.windows.WINDOW_ID_CURRENT }, function(tabs) {
		callback(tabs[0]);
	});
}

function updateToggleButton(status) {
	var buttonHtml = '<button id="toggle">{text}</button>';

	if (status == 'on') {
		buttonHtml = buttonHtml.replace('{text}', 'Tắt theo giõi giá vé');
	} else {
		buttonHtml = buttonHtml.replace('{text}', 'Bật theo giõi giá vé');
	}

	document.querySelector('#buttons').innerHTML = buttonHtml;
}

document.addEventListener('DOMContentLoaded', function () {
	getCurrentTab(function (tab) {
		chrome.tabs.sendMessage(
			tab.id, {
				route: "getStatus",
			}, function(response) {
				updateToggleButton(response.status);
			}
		);
	});

	document.querySelector('body').addEventListener('click', function (event) {
		if (event.target.id == 'toggle') {
			getCurrentTab(function (tab) {
				chrome.tabs.sendMessage(
					tab.id, {
						route: "toggleStatus",
					}, function(response) {
						updateToggleButton(response.status);
					}
				);
			});
		}
	});

	// document.getElementById('option').addEventListener('click', function () {
	// 	chrome.tabs.create({
	// 		url: 'src/options_custom/index.html'
	// 	});

	// 	trackEvent('option', 'clicked');

	// 	window.close();
	// }, false);

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