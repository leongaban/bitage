/*global angular*/
/* =========================================
--------------------------------------------

	BITAGE.io Public views app
	"Keep watch over your Bitcoins"
	
   	(Leon Gaban @leongaban | Paulo Rocha @paulinhorocha)

--------------------------------------------
============================================ */

(function() { "use strict";

	var app = angular.module('bitAge',
		['ui.router',
		 'app-about',
		 'app-login',
		 'app-register'])

	.config([
		'$stateProvider',
		'$urlRouterProvider',
		function($stateProvider, $urlRouterProvider) {

			$stateProvider
				.state('home', { url: '/home' })

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

			$urlRouterProvider.otherwise('/home');
	}])

	.controller('MainCtrl', ['$scope', '$state',  function($scope, $state) {
		$scope.showHome = function() {
	    	return $state.is('home');
	   	}
		$scope.showLogo = function() {
	    	return $state.is('home');
	   	}
	   	$scope.showTicker = function() {
	    	return $state.is('home');
	   	}
	}]);

})();