'use strict';

function Airline() {
	this.routes = {};
}

Airline.prototype.init = function () {
	if (typeof this.routes[this._getRoute()] != 'undefined') {
		this.routes[this._getRoute()].call(this);
	}
};

Airline.prototype._getRoute = function () {
	return '';
};

Airline.prototype.alertFoundBook = function (dates) {
	chrome.runtime.sendMessage({dates: dates}, function(response) {
	  console.log(response);
	});
};

function Vietjet() {

}

function JetStar() {
	Airline.call(this);

	this.routes = {
		'CalendarSelect': this._calendarSelect,
		'Select': this._select,
	};
}

JetStar.prototype = Object.create(Airline.prototype);
JetStar.prototype.constructor = JetStar;

JetStar.prototype._getRoute = function () {
	var path = location.pathname,
		route = '';

	if (path.indexOf('/Select.aspx') == 0) {
		route = 'Select';
	} else if (path.indexOf('/CalendarSelect.aspx') == 0) {
		route = 'CalendarSelect';
	}

	return route;
};

JetStar.prototype._calendarSelect = function() {
	var priceLabels = document.querySelectorAll('.low-fare-selector ul li'),
		price;

	var found = false, dates = [];


	for (var i = 0; i < priceLabels.length; i++) {
		if (parseInt(priceLabels[i].dataset.price) <= App.minPrice) {
			dates.push(priceLabels[i].dataset.date);
			found = true;
		}
	}

	if (found) {
		this.alertFoundBook(dates);
	}

	setTimeout(function () {
		location.reload();
	}, 10000);
};

JetStar.prototype._select = function () {
	var priceLabels = document.querySelectorAll('.field label'),
		price;

	for (var i = 0; i < priceLabels.length; i++) {
	}
};

function App() {

}

App.prototype.init = function() {
	// Setting
	App.minPrice = 500000;

	var url = location.toString(),
		airline;

	if (url.indexOf('booknow.jetstar.com') >= 0 || url.indexOf('book.jetstar.com') >= 0) {
		airline = new JetStar();
	}

	if (airline) {
		airline.init();
	}
};

var app = new App();

app.init();

/*var MIN_PRICE = 700000;

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

chrome.runtime.sendMessage({greeting: "hello"}, function(response) {
  console.log(response);
});*/