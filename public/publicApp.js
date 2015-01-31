/*global angular*/
/* =========================================
--------------------------------------------

	Biage Public views
	"Keep watch over your Bitcoins"
	
   	(Leon Gaban @leongaban | Paulo Rocha @paulinhorocha)

--------------------------------------------
============================================ */

(function() { "use strict";

	var app = angular.module('bitAge',
		['ui.router',
		 'matchmedia-ng',
		 'app-about',
		 'app-login',
		 'app-register'])

	.config(['matchmediaProvider', function (matchmediaProvider) {
		matchmediaProvider.rules.desktop = "(max-width: 800px)";
	}])

	.config(['$stateProvider', '$urlRouterProvider',
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

	.controller('MainCtrl', ['$scope', '$state', 'matchmedia',
		function($scope, $state, matchmedia) {

		var vm = $scope;

		// Mobile nav
		vm.isMobileNavOpen = false;
		var unregister = matchmedia.onDesktop( function(mediaQueryList){
			vm.isDesktop = mediaQueryList.matches;
			vm.isMobileNavOpen = false;
		});

		vm.showHome = function() {
	    	return $state.is('home');
	   	}

	   	vm.showTicker = function() {
	    	return $state.is('home');
	   	}

	   	// Quick form submit          
        vm.submitForm = function(isValid) {
            if (isValid) {
                alert('our form is amazing');
            } else {
            	alert('Please correct the form');
            }
        };

	}]);

})();