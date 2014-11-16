function getCurrentTab(callback) {
	chrome.tabs.query({ active: true, windowId: chrome.windows.WINDOW_ID_CURRENT }, function(tabs) {
		callback(tabs[0]);
	});
}

angular.module('app', [])
	.controller('Ctrl', function ($scope) {
		/* Options */
		$scope.options = {
			minPrice: 500000,
			reloadSecond: 5,
			ring: true
		};

		var storeOptions = localStorage.getItem('options');
		storeOptions = storeOptions ? JSON.parse(storeOptions) : {};

		$scope.options = angular.extend($scope.options, storeOptions);

		$scope.$watch('options', function (val) {
			localStorage.setItem('options', JSON.stringify(val));
		}, true);

		$scope.buttonPriceWatcherText = 'Bật theo dõi giá vé';

		$scope.updateToggleButton = function (status) {
			if (status == 'on') {
				$scope.buttonPriceWatcherText = 'Tắt theo dõi giá vé';
			} else {
				$scope.buttonPriceWatcherText = 'Bật theo dõi giá vé';
			}
		};

		$scope.togglePriceWatcher = function () {
			getCurrentTab(function (tab) {
				chrome.tabs.sendMessage(
					tab.id, {
						route: "toggleStatus",
					}, function(response) {
						if (response) {
							$scope.$apply(function () {
								$scope.updateToggleButton(response.status);
							});
						} else {
							alert('Bạn hãy bật trang giá vé của hãng bay để kích hoạt chức năng theo dõi giá vé!');
						}
					}
				);
			});
		};

		getCurrentTab(function (tab) {
			chrome.tabs.sendMessage(
				tab.id, {
					route: "getStatus",
				}, function(response) {
					if (response) {
						$scope.$apply(function () {
							$scope.updateToggleButton(response.status);
						});
					}
				}
			);
		});

		/* Navigations */
		$scope.openHelp = function () {
			chrome.tabs.create({
				url: 'src/help/index.html'
			});
		};

		$scope.openAutocompleteForm = function () {
			chrome.tabs.create({
				url: 'src/autocomplete/index.html'
			});
		};

		$scope.openChatbox = function () {
			chrome.tabs.create({
				url: 'src/chat/index.html'
			});
		};
	});