function hereDoc(f) {
  return f.toString().
      replace(/^[^\/]+\/\*!?/, '').
      replace(/\*\/[^\/]+$/, '');
}

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
	      	  		"#cardNumber": "{{cardNumber}}",
	      	  		"#expiryMonth": "{{expiryMonth}}",
	      	  		"#expiryYear": "{{expiryYear}}",
	      	  		"#cardCVC": "{{cardCVC}}",
	      	  		"#cardName": "{{cardName}}",
	      	  		"#address": "{{cardAddress}}",
	      	  		"#email": "{{cardEmail}}",
	      	  		"#phone": "{{cardPhone}}",
	      	  		"#country": "VNM"
	      	  	};

	      	  	if ($('#txtPax1_Gender').length) {
	      	  		for (var selector in passenger) {
	      	  			$(selector).val(passenger[selector]);
	      	  		}

	      	  		$('.button')[0].click();
	      	  	}

	      	  	if (document.getElementById('lstPaxItem:-1:1:12')) {
	      	  		var adults = {{{json adults}}},
	      	  			children = {{{json children}}},
	      	  			passengerIndex = 1;
	      	  			bagIndex = 12;

					adults.forEach(function (adult) {
						var bag1El = document.getElementById('lstPaxItem:-'+ passengerIndex +':1:' + bagIndex),
							bag2El;

						bag1El.selectedIndex = adult.bag1;
						$(bag1El).trigger('change');

						bagIndex += 14;

						bag2El = document.getElementById('lstPaxItem:-'+ passengerIndex +':2:' + bagIndex);

						bag2El.selectedIndex = adult.bag2;
						$(bag2El).trigger('change');

						bagIndex += 14;
						passengerIndex++;
					});

					if (Array.isArray(children)) {
						children.forEach(function (child) {
							var bag1El = document.getElementById('lstPaxItem:-'+ passengerIndex +':1:' + bagIndex),
								bag2El;

							bag1El.selectedIndex = child.bag1;
							$(bag1El).trigger('change');

							bagIndex += 14;

							bag2El = document.getElementById('lstPaxItem:-'+ passengerIndex +':2:' + bagIndex);

							bag2El.selectedIndex = child.bag2;
							$(bag2El).trigger('change');

							bagIndex += 14;
							passengerIndex++;
						});
					}
	      	  	}

	      	  	if ($('#paymentInfo').length) {
	      	  		if ($('#paymentInfo').is(':hidden')) {
	      	  			$('[value="visaCard"]').next().trigger('click');
	      	  		} else {
	      	  			for (var selector in passenger) {
	      	  				$(selector).val(passenger[selector]);
	      	  			}		
	      	  			
	      	  			$('[type="checkbox"]').trigger('click');
	      	  			$('[type="submit"]').trigger('click');
	      	  		}
	      	  	}
	      	  	return false;
	      	  })();
	      	*/});

			Handlebars.registerHelper('json', function(context) {
			    return JSON.stringify(context);
			});

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
	      templateUrl: "partials/jetstar.html"
	    });
	})
	.controller('Ctrl', function ($scope) {
	});