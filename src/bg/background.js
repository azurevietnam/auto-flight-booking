chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
	chrome.notifications.create('afb_flight_found', {
		type: "basic",
		title: "Primary Title",
		message: "Primary message to display",
		iconUrl: "icons/icon48.png",
		priority: 2
	}, function () {

	});

    sendResponse({name: 'Bob'});
});