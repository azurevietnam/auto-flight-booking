chrome.notifications.onClicked.addListener(function () {
	chrome.tabs.create({
		url: 'http://baynhe.vn'
	}, function () {
		chrome.notifications.clear('baynhe_posts', function () {})
	});
});

function getPostIdFromUrl(url) {
	var postId = 0,
		matches;

	if (matches = url.match(/\d+$/)) {
		postId = parseInt(matches[0]);
	}

	return postId;
}

function getCacheLatestPostId() {
	return localStorage.getItem('latestPostId');
}

function setCacheLatestPostId(postId) {
	return localStorage.setItem('latestPostId', postId);
}

function latestPostProcess() {
	var cacheLatestPostId = getCacheLatestPostId();

	jQuery.get( "http://baynhe.vn/feed", function(data) {
	    var $feed = $(data),
	    	cacheLatestPostFoundIndex = -1;

	    $feed.find('item').each(function (index) {
	    	var $item = $(this);

	    	if (getPostIdFromUrl($item.find('guid').text()) == cacheLatestPostId) {
	    		cacheLatestPostFoundIndex = index;

	    		return false;
	    	}
	    });

	    var latestItems = [];

	    if (!getCacheLatestPostId() || cacheLatestPostFoundIndex == -1) {
	    	cacheLatestPostFoundIndex = 2;
	    }

	    latestItems = $feed.find('item:lt('+ cacheLatestPostFoundIndex +')');

	    // Cache latest item
	    var $cacheLatestItem = $feed.find('item').first();
	    if ($cacheLatestItem.length) {
	    	setCacheLatestPostId(getPostIdFromUrl($cacheLatestItem.find('guid').text()));
	    }

	    // Display latest posts
	    if (latestItems.length) {
		    var notificationItems = [];

		    $.each(latestItems, function () {
		    	var $item = $(this);

		    	notificationItems.push({
		    		title: $item.find('title').text(),
		    		message: $item.find('description').text()
		    	});
		    });

		    chrome.notifications.create('baynhe_posts', {
		    	type: "list",
		    	title: "Bài viết mới từ baynhe.vn",
		    	message: '',
		    	iconUrl: "/icons/icon128.png",
		    	items: notificationItems,
		    }, function () {
		    	
		    });
	    }
	}, 'xml');
}

setInterval(latestPostProcess, 1 * 60 * 1000);

latestPostProcess();