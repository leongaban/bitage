/*global angular*/
/* =========================================
--------------------------------------------

	BITAGE.io
	"Keep watch over your Bitcoins"
	
   		by: NodeDallas.io
   		(Leon Gaban @leongaban | Paulo Rocha @paulinhorocha)

--------------------------------------------
============================================ */

(function() { "use strict";

	var app = angular.module('bitAge',
		['ui.router', 
		 // 'app-dashboard',
		 'app-wallet',
		 'app-accounts',
		 'app-settings'])

	.config([
		'$stateProvider',
		'$urlRouterProvider',
		function($stateProvider, $urlRouterProvider) {

			$stateProvider
				.state('wallet', {
					url: '/wallet',
					templateUrl: 'wallet.html',
					controller: 'WalletCtrl'
				})

				.state('accounts', {
					url: '/accounts',
					templateUrl: 'accounts.html',
					controller: 'AcctCtrl'
				})

				.state('settings', {
					url: '/settings',
					templateUrl: 'settings.html',
					controller: 'SettingsCtrl'
				});

			// default view:
			$urlRouterProvider.otherwise('accounts');
	}])

	.controller('DashCtrl', ['$scope', '$state', function($scope, $state) {

		// Wallet tab selected:
		$scope.$state = $state;

		$scope.sidebarClick = function() {
			return $state.includes($state.current.name);
		};

		// Avatar Menu:
		var id_avatar_menu = document.getElementById("avatar_menu");
		$scope.avatarMenuBool = false;
		$scope.id_avatar_menu = {};
		$scope.id_avatar_menu.getMenuClick = function(val, $event) {
			$event.stopPropagation();
			$scope.avatarMenuBool = !$scope.avatarMenuBool;
		};

		// detect click on body & close menu
		$scope.closeMenu = function () {
			$scope.avatarMenuBool = false;
		};

		// stop the event from bubbling up any further
		$scope.menuClick = function ($event) {
			$event.stopPropagation();
		};

	}]);

})();