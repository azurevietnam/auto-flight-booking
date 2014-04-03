function getSetting(key) {
	return JSON.parse(localStorage.getItem('store.settings.' + key));
}

chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
	if (request.route == 'setting') {
		sendResponse({
			minPrice: getSetting('minPrice'),
			reloadSecond: getSetting('reloadSecond')
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

		if (getSetting('ring')) {
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
	} else if (request.route == 'jetstar.fields') {
		sendResponse({
			title: getSetting('jetstar.title'),
			firstName: getSetting('jetstar.firstName'),
			lastName:  getSetting('jetstar.lastName'),
			gender: getSetting('jetstar.gender'),
			dob: getSetting('jetstar.dob'),
			mob: getSetting('jetstar.mob'),
			yob: getSetting('jetstar.yob'),

			title2: getSetting('jetstar.title2'),
			firstName2: getSetting('jetstar.firstName2'),
			lastName2:  getSetting('jetstar.lastName2'),
			gender2: getSetting('jetstar.gender2'),
			dob2: getSetting('jetstar.dob2'),
			mob2: getSetting('jetstar.mob2'),
			yob2: getSetting('jetstar.yob2'),

			baggage1: getSetting('jetstar.baggage1'),
			baggage2: getSetting('jetstar.baggage2'),
			email: getSetting('jetstar.email'),
			mobile: getSetting('jetstar.mobile'),
			street: getSetting('jetstar.street'),
			city: getSetting('jetstar.city'),
			province: getSetting('jetstar.province'),
			postCode: getSetting('jetstar.postCode')
		});
	} else if (request.route == 'vietjet.fields') {
		sendResponse({
			gender: getSetting('vietjet.gender'),
			lname: getSetting('vietjet.lname'),
			fname: getSetting('vietjet.fname'),
			addr: getSetting('vietjet.addr'),
			city: getSetting('vietjet.city'),
			email: getSetting('vietjet.email'),
			mobile: getSetting('vietjet.mobile'),
			day: getSetting('vietjet.day'),
			month: getSetting('vietjet.month'),
			year: getSetting('vietjet.year'),

			gender2: getSetting('vietjet.gender2'),
			lname2: getSetting('vietjet.lname2'),
			fname2: getSetting('vietjet.fname2'),
			mobile2: getSetting('vietjet.mobile2'),
			day2: getSetting('vietjet.day2'),
			month2: getSetting('vietjet.month2'),
			year2: getSetting('vietjet.year2'),
		});
	} else if (request.route == 'vietjet.addons') {
		sendResponse({
			baggage11: getSetting('vietjet.baggage11'),
			baggage12: getSetting('vietjet.baggage12'),
			baggage21: getSetting('vietjet.baggage21'),
			baggage22: getSetting('vietjet.baggage22')
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