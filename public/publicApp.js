/*global angular*/
/* =========================================
--------------------------------------------

	Bigate Public views
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

		var vm = $scope;

		vm.isMobileNavOpen = true;

		vm.showHome = function() {
	    	return $state.is('home');
	   	}
		vm.showLogo = function() {
	    	return $state.is('home');
	   	}
	   	vm.showTicker = function() {
	    	return $state.is('home');
	   	}

	   	// Quick form submit          
        vm.submitForm = function(isValid) {

            // check to make sure form is valid
            if (isValid) {
                alert('our form is amazing');
            } else {
            	alert('Please correct the form');
            }
        };

  //       vm.mobileMenu = function() {
  //       	var menu = document.getElementById('main_nav');

  //       	if (menu.style.display == 'block') {
		// 		menu.style.display = 'none';
  //       	} else {
		// 		menu.style.display = 'block';
		// 	}
		// };

	}]);

})();