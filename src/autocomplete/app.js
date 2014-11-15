function hereDoc(f) {
  return f.toString().
      replace(/^[^\/]+\/\*!?/, '').
      replace(/\*\/[^\/]+$/, '');
}

Handlebars.registerHelper('json', function(context) {
    return JSON.stringify(context);
});

angular
	.module('app', ['ui.router', 'ui.bootstrap'])
	.config(function($compileProvider, $stateProvider, $urlRouterProvider) {
		$compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension|javascript):/);

	  $urlRouterProvider.otherwise("/index");

	  $stateProvider
	  	.state('index', {
	  		url: '/index',
	  		templateUrl: 'partials/index.html'
	  	})
	    .state('vietjetair', {
	      url: "/vietjetair",
	      templateUrl: "partials/vietjetair.html",
	      controller: function($scope, $compile) {
	      	var str = hereDoc(function() {/*!
	      	  javascript:(function () {
	      	  	var passenger = {
	      	  		{{#each adults}}
	      	  		"#txtPax{{this.index}}_Gender": "{{this.gender}}",
	      	  		"#txtPax{{this.index}}_LName": "{{this.lastName}}",
	      	  		"#txtPax{{this.index}}_FName": "{{this.firstName}}",
	      	  		"#txtPax{{this.index}}_Addr1": "{{this.address}}",
	      	  		"#txtPax{{this.index}}_City": "{{this.province}}",
	      	  		"#txtPax{{this.index}}_Ctry": "234",
	      	  		"#txtPax{{this.index}}_Phone2": "{{this.mobilePhone}}",
	      	  		"#txtPax{{this.index}}_Phone1": "{{this.mobilePhone}}",
	      	  		"#txtPax{{this.index}}_EMail": "{{this.email}}",
	      	  		{{/each}}
	      	  		{{#each children}}
	      	  		"#txtPax{{this.index}}_Gender": "C",
	      	  		"#txtPax{{this.index}}_LName": "{{this.lastName}}",
	      	  		"#txtPax{{this.index}}_FName": "{{this.firstName}}",
	      	  		{{/each}}
	      	  		"#txtCardNo": "{{cardNumber}}",
	      	  		"#txtCVC": "{{cardCVC}}",
	      	  		"#txtCardholder": "{{cardName}}",
	      	  		"#txtAddr1": "{{cardAddress}}",
	      	  		"#txtPhone": "{{cardPhone}}",
	      	  		"#txtCity": "{{cardCity}}",
	      	  		"#lstCtry": "234"
	      	  	};

	      	  	if ($('#txtPax1_Gender').length) {
	      	  		for (var selector in passenger) {
	      	  			$(selector).val(passenger[selector]);
	      	  		}

	      	  		$('.button')[0].click();
	      	  	}

	      	  	if ($('.lstShopSelect').length) {
	      	  		var $bagSelect = $('.lstShopSelect'),
	      	  			adults = {{{json adults}}},
	      	  			children = {{{json children}}},
	      	  			direction = ($bagSelect.length == adults.length + children.length) ? 1 : 2,
	      	  			bagIndex = 0;

					adults.forEach(function (adult) {
						var bag1El = $bagSelect[bagIndex],
							bag2El;

						bag1El.selectedIndex = adult.bag1;
						$(bag1El).trigger('change');

						if (direction == 2) {
							bagIndex++;

							bag2El = $bagSelect[bagIndex];

							bag2El.selectedIndex = adult.bag2;
							$(bag2El).trigger('change');
						}

						bagIndex++;
					});

					if (Array.isArray(children)) {
						children.forEach(function (child) {
							var bag1El = $bagSelect[bagIndex],
								bag2El;

							bag1El.selectedIndex = child.bag1;
							$(bag1El).trigger('change');

							if (direction == 2) {
								bagIndex++;

								bag2El = $bagSelect[bagIndex];

								bag2El.selectedIndex = child.bag2;
								$(bag2El).trigger('change');
							}

							bagIndex++;
						});
					}

					$('.button')[0].click();
	      	  	}

	      	  	if ($('#paymentSection').length) {
					$('img[src="images/merchvisa2.gif"]')[0].click();

	      	  		var expiryDate = '{{expiryYear}}/{{expiryMonth}}';
					
	      	  		var index = $('#dlstExpiry').find('option[value^="'+ expiryDate +'"]').index();

					$('#dlstExpiry')[0].selectedIndex = index;

      	  			for (var selector in passenger) {
      	  				$(selector).val(passenger[selector]);
      	  			}
      	  			
      	  			$('.button')[0].click();
	      	  	}
				
				if ($('#chkIAgree').length) {
					$('#chkIAgree')[0].checked = true;

					$('.button')[1].click();
				}

	      	  	return false;
	      	  })();
	      	*/});

			var infoTemplate = Handlebars.compile(str);
			$scope.vietjet = {
				adults: [{}],
				children: []
			};

			try {
				var vietjet = localStorage.getItem('vietjet') ? JSON.parse(localStorage.getItem('vietjet')) : {};
			} catch (e) {
				var vietjet = {};
			}
			

			if (vietjet['adults']) {
				$scope.vietjet = angular.extend($scope.vietjet, vietjet);
			}

	          $scope.addAdult = function () {
	          	$scope.vietjet.adults.push({});
	          };

	          $scope.removeAdult = function (index) {
	          	$scope.vietjet.adults.splice(index, 1);
	          };

	          $scope.addChild = function () {
	          	$scope.vietjet.children.push({});
	          };

	          $scope.removeChild = function (index) {
	          	$scope.vietjet.children.splice(index, 1);
	          };

	          $scope.generate = function () {
	          	localStorage.setItem('vietjet', JSON.stringify($scope.vietjet));

	          	var index = 1;

	          	if (Array.isArray($scope.vietjet.adults)) {
	          		$scope.vietjet.adults.forEach(function (adult) {
	          			adult.index = index++;
	          		});
	          	}

	          	if (Array.isArray($scope.vietjet.children)) {
	          		$scope.vietjet.children.forEach(function (child) {
	          			child.index = index++;
	          		});
	          	}

	          	$scope.generatedCode = infoTemplate($scope.vietjet);
	          };
	      }
	    })
	    .state('jetstar', {
	      url: "/jetstar",
	      templateUrl: "partials/jetstar.html",
	      controller: function ($scope) {
	      	var str = hereDoc(function() {/*!
	      	  javascript:(function () {
	      	  	var passenger = {
	      	  		{{#each adults}}
	      	  		"#ControlGroupPassengerView_PassengerInputViewPassengerView_DropDownListTitle_{{this.index}}": "{{this.gender}}",
	      	  		"#ControlGroupPassengerView_PassengerInputViewPassengerView_TextBoxLastName_{{this.index}}": "{{this.lastName}}",
	      	  		"#ControlGroupPassengerView_PassengerInputViewPassengerView_TextBoxFirstName_{{this.index}}": "{{this.firstName}}",
	      	  		"#txtPax{{this.index}}_Addr1": "{{this.address}}",
	      	  		"#txtPax{{this.index}}_City": "{{this.province}}",
	      	  		"#txtPax{{this.index}}_Ctry": "234",
	      	  		"#txtPax{{this.index}}_Phone2": "{{this.mobilePhone}}",
	      	  		"#txtPax{{this.index}}_Phone1": "{{this.mobilePhone}}",
	      	  		"#txtPax{{this.index}}_EMail": "{{this.email}}",
	      	  		{{/each}}
	      	  		"#ControlGroupPassengerView_ContactInputViewPassengerView_DropDownListTitle": "{{contact.gender}}",
	      	  		"#ControlGroupPassengerView_ContactInputViewPassengerView_TextBoxFirstName": "{{contact.firstName}}",
	      	  		"#ControlGroupPassengerView_ContactInputViewPassengerView_TextBoxLastName": "{{contact.lastName}}",
	      	  		"#ControlGroupPassengerView_ContactInputViewPassengerView_TextBoxEmailAddress": "{{contact.email}}",
	      	  		"#ControlGroupPassengerView_ContactInputViewPassengerView_TextBoxEmailAddressConfirm": "{{contact.email}}",
	      	  		"#ControlGroupPassengerView_ContactInputViewPassengerView_TextBoxOtherPhone": "{{contact.phone}}",
	      	  		"#ControlGroupPassengerView_ContactInputViewPassengerView_TextBoxAddressLine1": "{{contact.street}}",
	      	  		"#ControlGroupPassengerView_ContactInputViewPassengerView_TextBoxCity": "{{contact.city}}",
	      	  		"#ControlGroupPassengerView_ContactInputViewPassengerView_DropDownListStateProvince": "{{contact.province}}",
	      	  		"#ControlGroupPassengerView_ContactInputViewPassengerView_TextBoxPostalCode": "{{contact.zipcode}}"
	      	  	};

	      	  	if ($('#ControlGroupPassengerView_PassengerInputViewPassengerView_DropDownListTitle_1').length) {
					$('.manage-baggage-trigger')[0].click();

	      	  		for (var selector in passenger) {
	      	  			$(selector).val(passenger[selector]).trigger('change');
	      	  		}

	      	  		var adults = {{{json adults}}},
	      	  			direction = {{direction}};

	      	  		adults.forEach(function (adult, index) {
						$('#ControlGroupPassengerView_PassengerInputViewPassengerView_AdditionalBaggagePassengerView_AdditionalBaggageDropDownListJourney0Pax' + index).val(adult.bag1).trigger('change');

						if (direction == 2) {
							$('#ControlGroupPassengerView_PassengerInputViewPassengerView_AdditionalBaggagePassengerView_AdditionalBaggageDropDownListJourney1Pax' + index).val(adult.bag2).trigger('change');
						}
	      	  		});

	      	  		$('#ControlGroupPassengerView_ButtonSubmit').trigger('click');
	      	  	}

	      	  	if ($('[name="card_number1"]').length) {
					var cardNumber = '{{cardNumber}}';

					[0, 1, 2, 3].forEach(function (index) {
						$('[name="card_number'+ (index + 1) +'"]').val(cardNumber.substring(index * 4, (index + 1) * 4))
							.trigger('change')
							.trigger('keydown')
							.trigger('keyup')
							.trigger('blur');
					});

					$('#ControlGroupPayView_PaymentSectionPayView_UpdatePanelPayView_PaymentInputPayView_TextBoxCC__AccountHolderName').val('{{cardName}}').trigger('focusin');
					$('#ControlGroupPayView_PaymentSectionPayView_UpdatePanelPayView_PaymentInputPayView_DropDownListEXPDAT_Month').val('{{expiryMonth}}').trigger('focusin').trigger('change');
					$('#ControlGroupPayView_PaymentSectionPayView_UpdatePanelPayView_PaymentInputPayView_DropDownListEXPDAT_Year').val('{{expiryYear}}').trigger('focusin').trigger('change');
					$('#ControlGroupPayView_PaymentSectionPayView_UpdatePanelPayView_PaymentInputPayView_TextBoxCC__VerificationCode').trigger('focusin').val('{{cardCVC}}').trigger('keydown');

					$('#ControlGroupPayView_AgreementInputPayView_CheckBoxAgreement').prop('checked', true).trigger('change');

					$('#ControlGroupPayView_ButtonSubmit')[0].click();
	      	  	}

	      	  	return false;
	      	  })();
	      	*/});

			var infoTemplate = Handlebars.compile(str);

			$scope.jetstar = {
				adults: [{}],
				children: []
			};

			try {
				var jetstar = localStorage.getItem('jetstar') ? JSON.parse(localStorage.getItem('jetstar')) : {};
			} catch (e) {
				var jetstar = {};
			}
			
			if (jetstar['adults']) {
				$scope.jetstar = angular.extend($scope.jetstar, jetstar);
			}

	      	$scope.addAdult = function () {
	      		$scope.jetstar.adults.push({});
	      	};

	      	$scope.removeAdult = function (index) {
	      		$scope.jetstar.adults.splice(index, 1);
	      	};

	      	$scope.addChild = function () {
	      		$scope.jetstar.children.push({});
	      	};

	      	$scope.removeChild = function (index) {
	      		$scope.jetstar.children.splice(index, 1);
	      	};

	      	$scope.generate = function () {
	      		var jetstar = {};

	      		angular.copy($scope.jetstar, jetstar);

	      		localStorage.setItem('jetstar', JSON.stringify(jetstar));

	      		var index = 1;

	      		if (Array.isArray($scope.jetstar.adults)) {
	      			$scope.jetstar.adults.forEach(function (adult) {
	      				adult.index = index++;
	      			});
	      		}

	      		if (Array.isArray($scope.jetstar.children)) {
	      			$scope.jetstar.children.forEach(function (child) {
	      				child.index = index++;
	      			});
	      		}

	      		$scope.generatedCode = infoTemplate($scope.jetstar);
	      	};
	      }
	    })
		.state('vietnam-airlines', {
			url: "/vietnam-airlines",
			templateUrl: "partials/vietnam-airlines.html",
			controller: function($scope, $compile) {
		      	var str = hereDoc(function() {/*!
		      	  javascript:(function () {
		      	  	var passenger = {
		      	  		{{#each adults}}
		      	  		"#prefix-{{this.index}}": "{{this.prefix}}",
		      	  		"#first_name-{{this.index}}": "{{this.first_name}}",
		      	  		"#last_name-{{this.index}}": "{{this.last_name}}",
		      	  		"#dob-{{this.index}}_0": "{{this.dob_day}}",
		      	  		"#dob-{{this.index}}_1": "{{this.dob_month}}",
		      	  		"#dob-{{this.index}}_2": "{{this.dob_year}}",
		      	  		{{/each}}
		      	  		{{#each children}}
		      	  		"#prefix-{{this.index}}": "{{this.prefix}}",
		      	  		"#first_name-{{this.index}}": "{{this.first_name}}",
		      	  		"#last_name-{{this.index}}": "{{this.last_name}}",
		      	  		"#dob-{{this.index}}_0": "{{this.dob_day}}",
		      	  		"#dob-{{this.index}}_1": "{{this.dob_month}}",
		      	  		"#dob-{{this.index}}_2": "{{this.dob_year}}",
		      	  		{{/each}}
		      	  		{{#each contact.phone_numbers}}
						"#phoneType{{this.index}}": "{{this.phone_type}}",
						"#phone{{@index}}-1-areaCode-raw": "{{this.area_code}}",
						"#phone{{@index}}-1-number-raw": "{{this.number}}",
						"#phone{{@index}}-1-areaCode": "{{this.area_code}}",
						"#phone{{@index}}-1-number": "{{this.number}}",
		      	  		{{/each}}
		      	  		"#phone0-1-countryCode": "84",
		      	  		"#phone1-1-countryCode": "84",
		      	  		"#contactInfo-email-1": "{{this.contact.email1}}",
		      	  		"#email_retype-1": "{{this.contact.email1}}",
		      	  		"#txtCardNo": "{{cardNumber}}",
		      	  		"#txtCVC": "{{cardCVC}}",
		      	  		"#txtCardholder": "{{cardName}}",
		      	  		"#txtAddr1": "{{cardAddress}}",
		      	  		"#txtPhone": "{{cardPhone}}",
		      	  		"#txtCity": "{{cardCity}}",
		      	  		"#lstCtry": "234"
		      	  	};

		      	  	if ($('#prefix-0').length) {
						$('.toggle-passenger').each(function () {
							this.click();
						});

		      	  		for (var selector in passenger) {
		      	  			$(selector).val(passenger[selector]);

		      	  			if ($(selector).length) {
								$(selector)[0].click();
		      	  			}
		      	  		}

		      	  		var adults = {{{json adults}}},
		      	  			children = {{{json children}}},
		      	  			length = 0,
							index = 0;

						if (Array.isArray(adults)) {
							for (var i = 0; i < adults.length; i++) {
								if (adults[i].gender == 'MALE') {
									$('#gender-'+ index +'-MALE').trigger('click');
								} else {
									$('#gender-'+ index +'-FEMALE').trigger('click');
								}

								index++;
							}
						}

						if (Array.isArray(children)) {
							for (var i = 0; i < children.length; i++) {
								if (children[i].gender == 'MALE') {
									$('#gender-'+ index +'-MALE').trigger('click');
								} else {
									$('#gender-'+ index +'-FEMALE').trigger('click');
								}

								index++;
							}					
						}
		      	  	}

		      	  	if ($('#payment').length) {
						var paymentType = '{{payment_type}}';

						var canSubmit = false;

						if (paymentType == 'creditCardTypes-0-ba-1' || paymentType == 'creditCardTypes-0-ik-0') {
							$('[value="creditCardTypes"]').trigger('click');
							$('#payc_1').addClass('loading');
							
							var t1 = setInterval(function () {
								if (!$('#payc_1').hasClass('loading') || $('#cardNumberPart_0').length) {
									clearInterval(t1);
									$('#payc_1').removeClass('loading');

									$('#creditCardSelect-0').val(paymentType);
									
									YUI().use('node-event-simulate', function(Y) {
										Y.one('#creditCardSelect-0').simulate("change");
									});

									$('#card-details-0').addClass('loading');
									
									var t2 = setInterval(function () {
										if (!$('#card-details-0').hasClass('loading') || $('#cardNumberPart_0').length) {
											clearInterval(t2);
											$('#card-details-0').removeClass('loading');

											if (paymentType == 'creditCardTypes-0-ba-1') {
												var cardNumber = '{{visa_card_number}}';

												[0, 1, 2, 3].forEach(function (index) {
													$('#cardNumberPart_' + index).val(cardNumber.substring(index * 4, (index + 1) * 4))
												});
												$('[name="selectedCards[0].cardNumber"]').val('{{visa_card_number}}');
												$('[name="selectedCards[0].expDate.month"]').val('{{visa_expdate_month}}');
												$('[name="selectedCards[0].expDate.year"]').val('{{visa_expdate_year}}');
												$('[name="selectedCards[0].cvcNumber"]').val('{{visa_cvc_number}}');
												$('[name="selectedCards[0].nameOnCard"]').val('{{visa_name_on_card}}');
											} else if (paymentType == 'creditCardTypes-0-ik-0') {
												var cardNumber = '{{master_card_card_number}}';

												[0, 1, 2, 3].forEach(function (index) {
													$('#cardNumberPart_' + index).val(cardNumber.substring(index * 4, (index + 1) * 4))
												});
												$('[name="selectedCards[0].cardNumber"]').val('{{master_card_card_number}}');
												$('[name="selectedCards[0].expDate.month"]').val('{{master_card_expdate_month}}');
												$('[name="selectedCards[0].expDate.year"]').val('{{master_card_expdate_year}}');
												$('[name="selectedCards[0].cvcNumber"]').val('{{master_card_cvc_number}}');
												$('[name="selectedCards[0].nameOnCard"]').val('{{master_card_name_on_card}}');												
											}

											canSubmit = true;
										}											
									}, 50);													
								}
							}, 50);


						} else if (paymentType == 'pay_now') {
							$('[value="pay_now"]').trigger('click');

							canSubmit = true;
						} else if (paymentType == 'pay_later') {
							$('[value="pay_later"]').trigger('click');
							$('#multi-fop-body-0').addClass('loading');

							var t1 = setInterval(function () {
								if ($('#multi-fop-body-0').hasClass('loading') || $('[name="smlPayLaterBankName"]').length) {
									clearInterval(t1);
									$('#multi-fop-body-0').removeClass('loading');

									$('[name="smlPayLaterBankName"]').val('{{pay_later_bank_name}}');
									canSubmit = true;
								}
							}, 50);
						}
						
						var confirmTimer = setInterval(function () {
							if (canSubmit) {
								if (!$('#confirm').prop('checked')) {
									$('#confirm').trigger('click');
								}

								clearInterval(confirmTimer);
							}
						}, 10);
		      	  	}

		      	  	return false;
		      	  })();
		      	*/});

				var infoTemplate = Handlebars.compile(str);

				$scope.vna = {
					adults: [{}],
					children: [],
					contact: {
						phone_numbers: [
							{
								phone_type: "home"
							},
							{
								phone_type: "mobile"
							}
						]
					}
				};

				try {
					var vna = localStorage.getItem('vna') ? JSON.parse(localStorage.getItem('vna')) : {};
				} catch (e) {
					var vna = {};
				}

				if (vna['adults']) {
					$scope.vna = angular.extend($scope.vna, vna);
				}

				$scope.addAdult = function () {
					$scope.vna.adults.push({});
				};

				$scope.removeAdult = function (index) {
					$scope.vna.adults.splice(index, 1);
				};

				$scope.addChild = function () {
					$scope.vna.children.push({});
				};

				$scope.removeChild = function (index) {
					$scope.vna.children.splice(index, 1);
				};

				$scope.generate = function () {
					var vna = {};

					angular.copy($scope.vna, vna);

					localStorage.setItem('vna', JSON.stringify(vna));

					var index = 0;

					if (Array.isArray($scope.vna.adults)) {
						$scope.vna.adults.forEach(function (adult) {
							adult.index = index++;
						});
					}

					if (Array.isArray($scope.vna.children)) {
						$scope.vna.children.forEach(function (child) {
							child.index = index++;
						});
					}

					$scope.generatedCode = infoTemplate($scope.vna);
				};
			}
		})
	})
	.controller('Ctrl', function ($scope) {

	});