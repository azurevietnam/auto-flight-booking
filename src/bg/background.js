chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
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