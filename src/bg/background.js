function getOption(key) {
	var options = JSON.parse(localStorage.getItem('options'));

	return options[key] || null;
}

chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
	if (request.route == 'setting') {
		sendResponse({
			minPrice: getOption('minPrice'),
			reloadSecond: getOption('reloadSecond')
		});
	} else if (request.route == 'status') {
		setStatus(sender.tab.id, request.status);
	} else if (request.route == 'found') {
		var items = [],
			hasNote = false;

		if (typeof request.note1 != 'undefined') {
			items.push({ title: 'Ngày đi:', message: request.note1 });
			hasNote = true;
		}

		if (typeof request.note2 != 'undefined') {
			items.push({ title: 'Ngày về:', message: request.note2 });
			hasNote = true;
		}

		if (!hasNote) {
			items.push({title: '...', message: ''});
		}

		var notificationOption = {
			type: "list",
			title: "Tìm thấy vé giá rẻ",
			message: '',
			iconUrl: "/icons/icon128.png",
			items: items
		};

		if (getOption('ring')) {
			var audio = new Audio();
			audio.src = 'sounds/found.ogg';
			audio.play();

			notificationOption.buttons = [
				{
					'title': 'Tắt nhạc'
				}
			];

			chrome.notifications.onButtonClicked.addListener(function (notificationId, buttonIndex) {
				if (notificationId == 'afb_found') {
					audio.pause();
				}
			});
		}

		chrome.notifications.clear('afb_found', function () {
			chrome.notifications.create('afb_found', notificationOption, function () {
			});
		});
	}
});

chrome.tabs.onActivated.addListener(function (info) {
	onSetStatus(info.tabId);
});

function onSetStatus(tabId) {
	setStatus(tabId, 'off');

	chrome.tabs.sendMessage(tabId, {
		route: 'updateStatus'
	}, function (response) {
		setStatus(tabId, response.status);
	});
}

function setStatus(tabId, status) {
	chrome.browserAction.setBadgeText({
		text: status,
		tabId: tabId
	});
}