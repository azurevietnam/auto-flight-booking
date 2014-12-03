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
			'_valueViewer': this._valueViewer,
			'_travelOptions': this._travelOptions,
			'_Detail': this._Detail,
			'_addOn': this._addOn,
			'_itinerary': this._itinerary
		};
	}

	Vietjet.prototype = Object.create(Airline.prototype);
	Vietjet.prototype.constructor = Vietjet;

	Vietjet.prototype._getRoute = function () {
		var path = location.pathname,
			route = '';

		if (path.indexOf('ValueViewer.aspx') >= 0) {
			route = '_valueViewer';
		} else if (path.indexOf('TravelOptions.aspx') >= 0) {
			route = '_travelOptions';
		} else if (path.indexOf('Details.aspx') >= 0) {
			route = '_Detail';
		} else if (path.indexOf('AddOns.aspx') >= 0) {
			route = '_addOn';
		} else if (path.indexOf('Itinerary.aspx') >= 0) {
			route = '_itinerary';
		}

		return route;
	};

	Vietjet.prototype._valueViewer = function () {
		var app = App.getInstance();

		if (!app.isOn()) {
			return false;
		}

		var days1 = [],
			days2 = [],
			price;

		var found = false;

		var valueTables = document.querySelectorAll('.hdrTable700');

		if (typeof valueTables[0] != 'undefined') {
			var days = valueTables[0].querySelectorAll('.fareClass div, .vvDaySearchFlightSelected div');

			for (var i = 0; i < days.length; i++) {
				price = parseInt(days[i].querySelector('.vvFare').textContent.replace(/,/g, ''));

				if (price <= app.settings.minPrice) {
					days1.push(parseInt(days[i].innerHTML));
					found = true;
				}
			}
		}

		if (typeof valueTables[1] != 'undefined') {
			var days = valueTables[1].querySelectorAll('.fareClass div, .vvDaySearchFlightSelected div');

			for (var i = 0; i < days.length; i++) {
				price = parseInt(days[i].querySelector('.vvFare').textContent.replace(/,/g, ''));

				if (price <= app.settings.minPrice) {
					days2.push(parseInt(days[i].innerHTML));
					found = true;
				}
			}
		}

		if (found) {
			this.alertFoundBook({
				note1: days1.join(', '),
				note2: days2.join(', ')
			});

			app.foundDelayReload();
		} else {
			app.delayReload();
		}
	};

	Vietjet.prototype._travelOptions = function () {
		var app = App.getInstance();

		if (!app.isOn()) {
			return false;
		}

		var hours1 = [],
			hours2 = [],
			price,
			matches,
			found = false;

		var priceTables = document.querySelectorAll('.FlightsGrid');

		if (typeof priceTables[0] != 'undefined') {
			var rows = priceTables[0].querySelectorAll('.FaresGrid td');

			for (var i = 0; i < rows.length; i++) {
				price = rows[i].textContent.replace(/,/g, '');

				if (price <= app.settings.minPrice) {
					matches = rows[i].parentNode.parentNode.parentNode.parentNode.parentNode.querySelector('td td td').textContent.match(/\d+:\d+/);

					if (matches) {
						hours1.push(matches[0]);
						found = true;
					}
				}
			}
		}

		if (typeof priceTables[1] != 'undefined') {
			var rows = priceTables[1].querySelectorAll('.FaresGrid td');

			for (var i = 0; i < rows.length; i++) {
				price = rows[i].textContent.replace(/,/g, '');

				if (price <= app.settings.minPrice) {
					matches = rows[i].parentNode.parentNode.parentNode.parentNode.parentNode.querySelector('td td td').textContent.match(/\d+:\d+/);

					if (matches) {
						hours2.push(matches[0]);
						found = true;
					}
				}
			}
		}

		if (found) {
			this.alertFoundBook({
				note1: hours1.join(', '),
				note2: hours2.join(', ')
			});

			app.foundDelayReload();
		} else {
			app.delayReload();
		}
	};

	Vietjet.prototype._Detail = function () {
		var app = App.getInstance();

		app.sendMessage({
			route: 'vietjet.fields'
		}, function (fields) {
			$('#txtPax1_Gender').val(fields.gender);
			$('#txtPax1_LName').val(fields.lname);
			$('#txtPax1_FName').val(fields.fname);
			$('#txtPax1_Addr1').val(fields.addr);
			$('#txtPax1_City').val(fields.city);
			$('#txtPax1_Ctry').val(234).trigger('change');
			$('#txtPax1_EMail').val(fields.email);
			$('#txtPax1_DOB_Day').val(fields.day);
			$('#txtPax1_DOB_Month').val(fields.month);
			$('#txtPax1_DOB_Year').val(fields.year);
			$('#txtPax1_Phone2').val(fields.mobile);
			$('#txtPax1_Phone1').val(fields.mobile);

			$('#txtPax2_Gender').val(fields.gender2);
			$('#txtPax2_LName').val(fields.lname2);
			$('#txtPax2_FName').val(fields.fname2);
			$('#txtPax2_Phone1').val(fields.mobile2);
			$('#txtPax2_DOB_Day').val(fields.day2);
			$('#txtPax2_DOB_Month').val(fields.month2);
			$('#txtPax2_DOB_Year').val(fields.year2);
		});
	};

	Vietjet.prototype._addOn = function () {
/*		var app = App.getInstance();

		app.sendMessage({
			route: 'vietjet.addons'
		}, function (fields) {
			setTimeout(function check() {
				console.log(document.getElementById('lstPaxItem:-1:1:4'));

				if (document.getElementById('lstPaxItem:-1:1:4')) {
					console.log('hello');
				} else {
					setTimeout(check, 1000);
				}
			}, 0);
		});*/
	};

	Vietjet.prototype._itinerary = function () {
		prompt('Auto Flight Booking: Mã đặt chỗ bị ẩn', $('.ResNumber').text());
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
		var app = App.getInstance();

		if (!app.isOn()) {
			return false;
		}

		var found = false,
			tables = document.querySelectorAll('.low-fare-selector'),
			dates1 = [],
			dates2 = [],
			price;

		if (typeof tables[0] != 'undefined') {
			var priceLabels = tables[0].querySelectorAll('ul li');

			for (var i = 0; i < priceLabels.length; i++) {
				if (parseInt(priceLabels[i].dataset.price) <= app.settings.minPrice) {
					dates1.push(priceLabels[i].dataset.date.replace(/\/\d+$/, ''));
					found = true;
				}
			}
		}

		if (typeof tables[1] != 'undefined') {
			var priceLabels = tables[1].querySelectorAll('ul li');

			for (var i = 0; i < priceLabels.length; i++) {
				if (parseInt(priceLabels[i].dataset.price) <= app.settings.minPrice) {
					dates2.push(priceLabels[i].dataset.date.replace(/\/\d+$/, ''));
					found = true;
				}
			}
		}

		if (found) {
			this.alertFoundBook({
				note1: dates1.join(', '),
				note2: dates2.join(', ')
			});

			app.foundDelayReload();
		} else {
			app.delayReload();
		}
	};

	JetStar.prototype._select = function () {
		var app = App.getInstance();

		if (!app.isOn()) {
			return false;
		}
		
		var priceLabels = document.querySelectorAll('.field label'),
			price, found = false;

		for (var i = 0; i < priceLabels.length; i++) {
			var price = priceLabels[i].textContent.replace(/(VND|,|\s)/g, '');

			if (price <= app.settings.minPrice) {
				found = true;
			}
		}

		if (found) {
			this.alertFoundBook({});

			app.foundDelayReload();
		} else {
			app.delayReload();
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
			$('select.add-baggage-each[data-dir="departing"]').val(fields.baggage1);
			$('#ControlGroupPassengerView_PassengerInputViewPassengerView_AdditionalBaggagePassengerView_AdditionalBaggageDropDownListJourney1').val(fields.baggage2);
			$('select.add-baggage-each[data-dir="returning"]').val(fields.baggage2);

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