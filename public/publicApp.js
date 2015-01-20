/*global angular*/
/* =========================================
--------------------------------------------

	BITAGE.io Public views app
	"Keep watch over your Bitcoins"
	
   		by: NodeDallas.io
   		(Leon Gaban @leongaban | Paulo Rocha @paulinhorocha)

--------------------------------------------
============================================ */

(function() { "use strict";

	var app = angular.module('bitAge',
		['ui.router',
		 'app-home',
		 'app-about',
		 'app-login',
		 'app-register'])

	.config([
		'$stateProvider',
		'$urlRouterProvider',
		function($stateProvider, $urlRouterProvider) {

			$stateProvider
				.state('home', {
					url: '/home',
					templateUrl: '_views/home.html',
					controller: 'HomeCtrl'
				})

				.state('about', {
					url: '/about',
					templateUrl: '_views/about.html',
					controller: 'AboutCtrl'
				})

				.state('login', {
					url: '/login',
					templateUrl: '_views/login.html',
					controller: 'LoginCtrl'
				})

				.state('register', {
					url: '/register',
					templateUrl: '_views/register.html',
					controller: 'RegisterCtrl'
				});

			// default view:
			$urlRouterProvider.otherwise('/home');
	}]);

})();