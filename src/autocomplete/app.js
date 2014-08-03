function hereDoc(f) {
  return f.toString().
      replace(/^[^\/]+\/\*!?/, '').
      replace(/\*\/[^\/]+$/, '');
}

angular
	.module('app', ['ui.router'])
	.config(function($compileProvider, $stateProvider, $urlRouterProvider) {
		$compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|chrome-extension|javascript):/);

	  $urlRouterProvider.otherwise("/vietjetair");

	  $stateProvider
	    .state('vietjetair', {
	      url: "/vietjetair",
	      templateUrl: "partials/vietjetair.html",
	      controller: function($scope, $compile) {
	      	var str = hereDoc(function() {/*!
	      	  javascript:(function () {
	      	  	var passenger = {
	      	  		{{#each adults}}
	      	  		"#adult{{@index}}Title": "{{this.title}}",
	      	  		"#adult{{@index}}Lastname": "{{this.firstName}}",
	      	  		"#adult{{@index}}Firstname": "{{this.lastName}}",
	      	  		"#adult{{@index}}Address": "{{this.address}}",
	      	  		"#adult{{@index}}Country": "VNM",
	      	  		"#adult{{@index}}ProState": "{{this.province}}",
	      	  		"#adult{{@index}}MobilePhone": "{{this.mobilePhone}}",
	      	  		"#adult{{@index}}Email": "{{this.email}}",
	      	  		{{/each}}
	      	  		{{#each children}}
	      	  		"#child{{@index}}Title": "{{this.title}}",
	      	  		"#child{{@index}}Lastname": "{{this.firstName}}",
	      	  		"#child{{@index}}Firstname": "{{this.lastName}}",
					"#child{{@index}}MobilePhone": "{{this.mobilePhone}}",
	      	  		{{/each}}
	      	  		"#cardNumber": "4450930000935358",
	      	  		"#expiryMonth": "10",
	      	  		"#expiryYear": "2016",
	      	  		"#cardCVC": "061",
	      	  		"#cardName": "TRINH THI QUYNH DUNG",
	      	  		"#address": "Phuong 13 - Quan Tan Binh - Ho Chi Minh",
	      	  		"#email": "quynhdungtrinh@gmail.com",
	      	  		"#phone": "0909244812",
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

	          $scope.adults = [{}];

	          $scope.children = [];

	          $scope.addAdult = function () {
	          	$scope.adults.push({});
	          };

	          $scope.removeAdult = function (index) {

	          };

	          $scope.addChild = function () {
	          	$scope.children.push({});
	          };

	          $scope.removeChild = function (index) {

	          };

	          $scope.generate = function () {
	          	$scope.generatedCode = infoTemplate($scope);
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