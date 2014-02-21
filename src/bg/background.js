chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
	chrome.notifications.create('found', {
		type: "basic",
		title: "Primary Title",
		message: "Found " + request.dates.join(', '),
		iconUrl: "/icons/icon128.png"
	}, function () {

	})
});

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
	if (changeInfo.status !== "complete")
	{
		return;
	}

	if (tab.url.indexOf('vietjetair.com') >= 0
		|| tab.url.indexOf('ameliaweb5.intelisys.ca') >= 0) {
		chrome.pageAction.show(tabId);
	}
});