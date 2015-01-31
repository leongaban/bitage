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

		vm.showHome = function() {
	    	return $state.is('home');
	   	}

	   	vm.showTicker = function() {
	    	return $state.is('home');
	   	}

		// Mobile nav
		vm.isMobileNavOpen = false;
		var unregister = matchmedia.onDesktop( function(mediaQueryList) {
			vm.isDesktop = mediaQueryList.matches;
			vm.isMobileNavOpen = false;
		});

		var postSignUpForm = function() {
            console.log(vm.formData);
            
            // process the form
            vm.processForm = function() {
                $http({
                    method  : 'POST',
                    url     : 'process.php',
                    data    : $.param(vm.formData),
                    headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
                })
                .success(function(data) {
                    console.log(data);

                    if (!data.success) {
                        console.log('display error on page');
                        alert('There was an error in getting response');
                      // if not successful, bind errors to error variables
                    } else {
                        console.log('success! time to login...');
                    }

                });
            };
		};

	   	// Quick form submit          
        vm.submitForm = function(isValid) {
            if (isValid) {
                // alert('our form is amazing');
                postSignUpForm();
            } else {
            	alert('Please correct the form');
            }
        };

	}]);

})();