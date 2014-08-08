function hereDoc(f) {
  return f.toString().
      replace(/^[^\/]+\/\*!?/, '').
      replace(/\*\/[^\/]+$/, '');
}

angular
	.module('app', ['ui.router'])
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
	      	  		"#adult{{@index}}Title": "{{this.title}}",
	      	  		"#adult{{@index}}Lastname": "{{this.lastName}}",
	      	  		"#adult{{@index}}Firstname": "{{this.firstName}}",
	      	  		"#adult{{@index}}Address": "{{this.address}}",
	      	  		"#adult{{@index}}Country": "VNM",
	      	  		"#adult{{@index}}ProState": "{{this.province}}",
	      	  		"#adult{{@index}}MobilePhone": "{{this.mobilePhone}}",
	      	  		"#adult{{@index}}Email": "{{this.email}}",
	      	  		{{/each}}
	      	  		{{#each children}}
	      	  		"#child{{@index}}Title": "{{this.title}}",
	      	  		"#child{{@index}}Lastname": "{{this.lastName}}",
	      	  		"#child{{@index}}Firstname": "{{this.firstName}}",
					"#child{{@index}}MobilePhone": "{{this.mobilePhone}}",
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

	      	  	if ($('#adult0Title').length) {
	      	  		for (var selector in passenger) {
	      	  			$(selector).val(passenger[selector]);
	      	  		}

	      	  		$('[type="submit"]').trigger('click');
	      	  	}

	      	  	if ($('#addOn_adult_0_flight_outbound_1').length) {
	      	  		$('[type="submit"]').trigger('click');
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