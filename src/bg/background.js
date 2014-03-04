function getSetting(key) {
	return JSON.parse(localStorage.getItem('store.settings.' + key));
}

chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
	if (request.route == 'setting') {
		sendResponse({
			minPrice: getSetting('minPrice'),
			reloadSecond: getSetting('reloadSecond')
		});
	} else if (request.route == 'showAppIcon') {
		chrome.pageAction.show(sender.tab.id);
		var icon = request.status == 'on' ? '/icons/icon19.png' : '/icons/icon19-disabled.png';

		chrome.pageAction.setIcon({
			tabId: sender.tab.id,
			path: icon
		}, function () {

		})
	} else if (request.route == 'found') {
		var items = [
			{ title: 'Ngày đi:', message: request.note1 }
		];

		if (typeof request.note1 != 'undefined') {
			items.push({ title: 'Ngày về:', message: request.note2 });
		}

		chrome.notifications.clear('afb_found', function () {
			chrome.notifications.create('afb_found', {
				type: "list",
				title: "Tìm thấy vé giá rẻ",
				message: '',
				iconUrl: "/icons/icon128.png",
				items: items
			}, function () {
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
	}
});