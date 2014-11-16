var _gaq = _gaq || [];
_gaq.push(['_setAccount', 'UA-36769951-4']);

var gaParam = getUrlValue(document.location.href, "ga");
if (gaParam) {
	if (gaParam == "NOQUERY") {
		sendGA(['_trackPageview', document.location.pathname]);
	} else {
		sendGA(['_trackPageview', document.location.pathname + "?ga=" + gaParam]);
	}
} else {
	sendGA(['_trackPageview']);
}

(function() {
  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
  ga.src = 'https://ssl.google-analytics.com/ga.js';
  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
})();

function trackEvent(buttonId, eventName) {
	_gaq.push(['_trackEvent', buttonId, eventName]);
}