/*global angular*/
/* =========================================
--------------------------------------------

	BITAGE.io Dashboard views app
	"Keep watch over your Bitcoins"
	
   	(Leon Gaban @leongaban | Paulo Rocha @paulinhorocha)

--------------------------------------------
============================================ */

(function() { "use strict";

	var app = angular.module('bitAge',
		['ui.router', 
		 'app-wallet',
		 'wallet-directives',
		 // 'app-accounts',
		 'app-settings',
		 'app-help'])

	.config([
		'$stateProvider',
		'$urlRouterProvider',
		function($stateProvider, $urlRouterProvider) {

			$stateProvider
				.state('wallet', {
					url: '/wallet',
					templateUrl: '_views/wallet.html',
					controller: 'WalletCtrl'
				})

				.state('accounts', {
					url: '/accounts',
					templateUrl: '_views/accounts.html',
					controller: 'AcctCtrl'
				})

				.state('settings', {
					url: '/settings',
					templateUrl: '_views/settings.html',
					controller: 'SettingsCtrl'
				})

				.state('help', {
					url: '/help',
					templateUrl: '_views/help.html',
					controller: 'HelpCtrl'
				});

			$urlRouterProvider.otherwise('wallet');
	}])

	.controller('DashCtrl', ['$state', function($state) {

		var vm = this;

		// Sidebar tab select:
		vm.$state = $state;
		vm.sidebarClick = function() {
			return $state.includes($state.current.name);
		};

		// Avatar Menu open/close:
		vm.avatarMenuBool = false;
		vm.clickAvatar = function(val, $event) {
			$event.stopPropagation();
			vm.avatarMenuBool = !vm.avatarMenuBool;
		};

		// Detect click on body & close menu
		vm.closeMenu = function () {
			vm.avatarMenuBool = false;
		};

		// Stop the event from bubbling up any further
		vm.menuClick = function ($event) {
			$event.stopPropagation();
		};

	}]);

})();