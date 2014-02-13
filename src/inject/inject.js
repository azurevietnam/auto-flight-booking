'use strict';

var MIN_PRICE = 700000;

var found = false;

$('.vvFare').each(function () {
	var price = parseInt(this.textContent.replace(/,/g, ''));

	if (price < MIN_PRICE) {
		alert('Vé có giá thấp hơn ' + MIN_PRICE + ' được tìm thấy!!!');
		found = true;

		return false;
	}
});

setTimeout(function () {
	if (!found) {
		location.reload();
	}
}, 10000);