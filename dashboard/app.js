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
		 'app-accounts',
		 'app-settings'])

	.config([
		'$stateProvider',
		'$urlRouterProvider',
		function($stateProvider, $urlRouterProvider) {

			$stateProvider
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

			$urlRouterProvider.otherwise('accounts');
	}]);

})();