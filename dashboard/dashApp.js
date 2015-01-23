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
		 // 'app-accounts',
		 'app-settings'])

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
				});

			$urlRouterProvider.otherwise('wallet');
	}])

	.controller('DashCtrl', ['$scope', '$state', function($scope, $state) {

		var vm = $scope;
		vm.title = "Your Public Address:";
		vm.public_address ="17dPAMzZiosQYVty6ES4KSWN8R8XFcxShH";

		// Wallet tab selected:
		vm.$state = $state;
		vm.sidebarClick = function() {
			return $state.includes($state.current.name);
		};

		// Avatar Menu:
		vm.avatarMenuBool = false;
		vm.getMenuClick = function(val, $event) {
			$event.stopPropagation();
			vm.avatarMenuBool = !vm.avatarMenuBool;
		};

		// detect click on body & close menu
		vm.closeMenu = function () {
			vm.avatarMenuBool = false;
		};

		// stop the event from bubbling up any further
		vm.menuClick = function ($event) {
			$event.stopPropagation();
		};

	}]);

})();