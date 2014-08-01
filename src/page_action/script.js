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
	var buttonHtml = '{text}';

	if (status == 'on') {
		buttonHtml = buttonHtml.replace('{text}', 'Tắt theo dõi giá vé');
	} else {
		buttonHtml = buttonHtml.replace('{text}', 'Bật theo dõi giá vé');
	}

	document.querySelector('#toggle').innerHTML = buttonHtml;
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
			trackEvent('toggleButton', 'clicked');

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

	document.getElementById('autocomplete-form').addEventListener('click', function () {
		chrome.tabs.create({
			url: 'src/autocomplete/index.html'
		});

		trackEvent('autocompleteButton', 'clicked');

		window.close();
	});

	document.getElementById('chat').addEventListener('click', function () {
		chrome.tabs.create({
			url: 'src/chat/index.html'
		});

		trackEvent('chatButton', 'clicked');

		window.close();
	});

	document.getElementById('option').addEventListener('click', function () {
		chrome.tabs.create({
			url: 'src/options_custom/index.html'
		});

		trackEvent('optionButton', 'clicked');

		window.close();
	}, false);

	// Options
	var options = {
		minPrice: getSetting('minPrice') || DEFAULTS.minPrice,
		reloadSecond: getSetting('reloadSecond') || DEFAULTS.reloadSecond,
		ring: typeof getSetting('ring') !== 'undefined' ? getSetting('ring') : DEFAULTS.ring
	};

	var optionEls = document.querySelectorAll('.option'),
		optionEl;

	for (var i = 0; i < optionEls.length; i++) {
		optionEl = optionEls[i];

		if (optionEl.type == 'number') {
			optionEl.value = options[optionEl.dataset.property];

			optionEl.addEventListener('change', function () {
				setSetting(this.dataset.property, this.value);
			}, false);
		} else if (optionEl.type == 'checkbox') {
			optionEl.checked = options.ring;

			optionEl.addEventListener('click', function () {
				setSetting(this.dataset.property, (optionEl.checked ? 1 : 0));
			});
		}
	}
}, false);