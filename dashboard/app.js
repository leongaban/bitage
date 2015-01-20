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
		 'app-dashboard',
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

				.state('Settings', {
					url: '/settings',
					templateUrl: 'settings.html',
					controller: 'SettingsCtrl'
				});

			// default view:
			$urlRouterProvider.otherwise('accounts');
	}]);

})();