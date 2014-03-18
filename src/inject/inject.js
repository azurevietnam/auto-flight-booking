(function () {
	'use strict';

	// Set a cookie
	function setCookie(name, value, hours)
	{
		var exp = new Date();
		exp.setTime(exp.getTime() + (hours * 60 * 60 * 1000));
		document.cookie = name + "=" + value + "; expires=" + exp.toGMTString() + "; path=/";
	}

	// Get the content in a cookie
	function getCookie(name)
	{
		// Search for the start of the goven cookie
		var prefix = name + "=",
			cookieStartIndex = document.cookie.indexOf(prefix),
			cookieEndIndex;

		// If the cookie is not found return null
		if (cookieStartIndex == -1)
		{
			return null;
		}

		// Look for the end of the cookie
		cookieEndIndex = document.cookie.indexOf(";", cookieStartIndex + prefix.length);
		if (cookieEndIndex == -1)
		{
			cookieEndIndex = document.cookie.length;
		}

		// Extract the cookie content
		return unescape(document.cookie.substring(cookieStartIndex + prefix.length, cookieEndIndex));
	}

	// Remove a cookie
	function deleteCookie(name)
	{
		setCookie(name, null, -60);
	}

	function Airline() {
		this.routes = {};
	}

	Airline.prototype.init = function () {
		if (typeof this.routes[this._getRoute()] != 'undefined') {
			this.routes[this._getRoute()].call(this);
		}

		var app = App.getInstance();
		app.updateStatus();
	};

	Airline.prototype._getRoute = function () {
		return '';
	};

	Airline.prototype.alertFoundBook = function (data) {
		data.route = 'found';

		chrome.runtime.sendMessage(data, function(response) {});
	};

	function Vietjet() {
		Airline.call(this);

		this.routes = {
			'_valueViewer': this._valueViewer
		};
	}

	Vietjet.prototype = Object.create(Airline.prototype);
	Vietjet.prototype.constructor = Vietjet;

	Vietjet.prototype._getRoute = function () {
		var path = location.pathname,
			route = '';

		if (path.indexOf('ValueViewer.aspx') >= 0) {
			route = '_valueViewer';
		}

		return route;
	};

	Vietjet.prototype._valueViewer = function () {
		var app = App.getInstance();

		var days = document.querySelectorAll('.vvDayFlightLow div'),
			days1 = [],
			days2 = [],
			day,
			price;

		var found = false;

		for (var i = 0; i < days.length; i++) {
			price = parseInt(days[i].querySelector('.vvFare').textContent.replace(/,/g, ''));

			if (price <= app.settings.minPrice) {
				days1.push(parseInt(days[i].innerHTML));
				found = true;
			}
		}

		if (found) {
			this.alertFoundBook({
				note1: days1.join(', '),
				note2: '28, 29, 30'
			});

			app.foundDelayReload();
		} else {
			app.delayReload();
		}
	};

	function JetStar() {
		Airline.call(this);

		this.routes = {
			'CalendarSelect': this._calendarSelect,
			'Select': this._select,
			'Passenger': this._passenger,
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
		} else if (path.indexOf('/Passenger.aspx') == 0) {
			route = 'Passenger';
		}

		return route;
	};

	JetStar.prototype._calendarSelect = function() {
		var app = App.getInstance(),
			priceLabels = document.querySelectorAll('.low-fare-selector ul li'),
			price;

		var found = false,
			dates = [];

		for (var i = 0; i < priceLabels.length; i++) {
			if (parseInt(priceLabels[i].dataset.price) <= app.settings.minPrice) {
				dates.push(priceLabels[i].dataset.date);
				found = true;
			}
		}

		if (found) {
			this.alertFoundBook({
				note1: dates.join(', '),
				note2: ''
			});

			app.foundDelayReload();
		} else {
			app.delayReload();
		}

	};

	JetStar.prototype._select = function () {
		var priceLabels = document.querySelectorAll('.field label'),
			price;

		for (var i = 0; i < priceLabels.length; i++) {
		}
	};

	JetStar.prototype._passenger = function () {
		var app = App.getInstance();

		app.sendMessage({
			route: 'jetstar.fields'
		}, function (fields) {
			$('#ControlGroupPassengerView_PassengerInputViewPassengerView_DropDownListTitle_1').val(fields.title);
			$('#ControlGroupPassengerView_PassengerInputViewPassengerView_TextBoxFirstName_1').val(fields.lastName);
			$('#ControlGroupPassengerView_PassengerInputViewPassengerView_TextBoxLastName_1').val(fields.firstName);
			$('#ControlGroupPassengerView_PassengerInputViewPassengerView_DropDownListGender_1').val(fields.gender);
			$('#ControlGroupPassengerView_PassengerInputViewPassengerView_DropDownListBirthDateDay_1').val(fields.dob);
			$('#ControlGroupPassengerView_PassengerInputViewPassengerView_DropDownListBirthDateMonth_1').val(fields.mob);
			$('#ControlGroupPassengerView_PassengerInputViewPassengerView_DropDownListBirthDateYear_1').val(fields.yob);

			$('#ControlGroupPassengerView_PassengerInputViewPassengerView_DropDownListTitle_2').val(fields.title2);
			$('#ControlGroupPassengerView_PassengerInputViewPassengerView_TextBoxFirstName_2').val(fields.lastName2);
			$('#ControlGroupPassengerView_PassengerInputViewPassengerView_TextBoxLastName_2').val(fields.firstName2);
			$('#ControlGroupPassengerView_PassengerInputViewPassengerView_DropDownListGender_2').val(fields.gender2);
			$('#ControlGroupPassengerView_PassengerInputViewPassengerView_DropDownListBirthDateDay_2').val(fields.dob2);
			$('#ControlGroupPassengerView_PassengerInputViewPassengerView_DropDownListBirthDateMonth_2').val(fields.mob2);
			$('#ControlGroupPassengerView_PassengerInputViewPassengerView_DropDownListBirthDateYear_2').val(fields.yob2);

			$('#ControlGroupPassengerView_PassengerInputViewPassengerView_AdditionalBaggagePassengerView_AdditionalBaggageDropDownListJourney0').val(fields.baggage1);
			$('#ControlGroupPassengerView_PassengerInputViewPassengerView_AdditionalBaggagePassengerView_AdditionalBaggageDropDownListJourney1').val(fields.baggage2);

			$('#ControlGroupPassengerView_ContactInputViewPassengerView_DropDownListTitle').val(fields.title);
			$('#ControlGroupPassengerView_ContactInputViewPassengerView_TextBoxFirstName').val(fields.lastName);
			$('#ControlGroupPassengerView_ContactInputViewPassengerView_TextBoxLastName').val(fields.firstName);

			$('#ControlGroupPassengerView_ContactInputViewPassengerView_TextBoxEmailAddress').val(fields.email);
			$('#ControlGroupPassengerView_ContactInputViewPassengerView_TextBoxEmailAddressConfirm').val(fields.email);

			$('#ControlGroupPassengerView_ContactInputViewPassengerView_TextBoxOtherPhone').val(fields.mobile);
			$('#ControlGroupPassengerView_ContactInputViewPassengerView_TextBoxHomePhone').val(fields.mobile);
			$('#ControlGroupPassengerView_ContactInputViewPassengerView_TextBoxWorkPhone').val(fields.mobile);

			$('#ControlGroupPassengerView_ContactInputViewPassengerView_TextBoxAddressLine1').val(fields.street);
			$('#ControlGroupPassengerView_ContactInputViewPassengerView_TextBoxCity').val(fields.city);

			$('#ControlGroupPassengerView_ContactInputViewPassengerView_DropDownListStateProvince').val(fields.province);
			$('#ControlGroupPassengerView_ContactInputViewPassengerView_TextBoxPostalCode').val(fields.postCode);
		});
	};

	function App() {

	}

	App.setInstance = function (app) {
		App.instance = app;
	};

	App.getInstance = function () {
		return App.instance;
	};

	App.prototype.init = function() {
		var self = this;

		chrome.runtime.onMessage.addListener(this.onMessage.bind(this));

		// Setting
		this.sendMessage({
			route: "setting"
		}, function (settings) {
			self.settings = settings;

			var url = location.toString(),
				airline;

			if (url.indexOf('booknow.jetstar.com') >= 0 || url.indexOf('book.jetstar.com') >= 0) {
				airline = new JetStar();
			} else if (url.indexOf('ameliaweb5.intelisys.ca') >= 0) {
				airline = new Vietjet();
			}

			if (airline) {
				airline.init();
			}
		});
	};

	App.prototype.foundDelayReload = function () {
		setTimeout(function () {
			location.reload();			
		}, 60000);
	};

	App.reloadTimeout = 0;

	App.prototype.delayReload = function () {
		App.reloadTimeout = setTimeout(function () {
			location.reload();
		}, this.settings.reloadSecond * 1000);
	};

	App.prototype.sendMessage = function(request, callback) {
		chrome.runtime.sendMessage(request, function(response) {
			callback(response);
		});
	};

	App.prototype.onMessage = function (request, sender, sendResponse) {
		if (request.route == 'toggleStatus') {
			this.toggleStatus(sendResponse);
		} else if (request.route == 'updateStatus') {
			this.updateStatus();
		} else if (request.route == 'getStatus') {
			this.updateStatus(sendResponse);
		}
	};

	App.prototype.isOn = function () {
		var status = getCookie('afb_status');

		return !status || status == 'off' ? false : true;
	};

	App.prototype.toggleStatus = function (sendResponse) {
		var newStatus = this.isOn() ? 'off' : 'on';

		setCookie('afb_status', newStatus);

		this.updateStatus();

		if (typeof sendResponse == 'function') {
			sendResponse({
				request: 'toggleStatus',
				status: newStatus
			});
		}

		if (newStatus == 'off') {
			clearTimeout(App.reloadTimeout);
		} else {
			location.reload();
		}
	};

	App.prototype.updateStatus = function (sendResponse) {
		var status = this.isOn() ? 'on' : 'off',
			request = {
				route: 'status',
				status: status
			};

		if (typeof sendResponse == 'function') {
			sendResponse(request);
		} else {
			this.sendMessage(request, function () {});
		}
	};

	var app = new App();

	App.setInstance(app);
	app.init();
})();