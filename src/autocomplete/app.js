angular
	.module('app', ['ui.router'])
	.config(function($stateProvider, $urlRouterProvider) {
	  $urlRouterProvider.otherwise("/vietjetair");

	  $stateProvider
	    .state('vietjetair', {
	      url: "/vietjetair",
	      templateUrl: "partials/vietjetair.html",
	      controller: function($scope) {
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
	          	$scope.generatedCode = 'javascript:(function () {alert("hello"); return false;})();';
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