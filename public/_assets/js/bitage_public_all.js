/*global angular */
/* =========================================
   ABOUT Module
   ========================================= */

(function() {

	var app = angular.module('app-about', [])
	.controller('AboutCtrl', ['$scope', function($scope) {

		vm = this;

	}]);

})();
/*global angular */
/* =========================================
   Login Controller
   ========================================= */

(function() {

	var app = angular.module('app-login', [])
	.controller('LoginCtrl', ['$http', function($http) {

        var vm = this;

        var postLoginForm = function() {
            console.log(vm.formData);
            
            // process the form
            // login data contains remember boolean
            var request = $http({
                    method  : 'POST',
                    url     : '/signin',
                    data    : $.param(vm.formData),
                    headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
                })
                .success(function() {
                
                });
        };

		// Quick form submit          
        vm.submitLoginForm = function(isValid) {

            // check to make sure form is valid
            if (isValid) {
                // alert('our form is amazing');
                postLoginForm();
            } else {
            	alert('Please correct the form');
            }

        };
	    
	}]);

})();
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
					templateUrl: '_views/about.html'
				})

				.state('login', {
					url: '/login',
					templateUrl: '_views/login.html'
				})

				.state('register', {
					url: '/register',
					templateUrl: '_views/register.html'
				});

			$urlRouterProvider.otherwise('/home');
	}])

	.controller('MainCtrl',
		['$http', '$location', '$state', 'matchmedia', 'homeService',
		function($http, $location, $state, matchmedia, homeService) {

		var vm = this;

		// Show HTML only on home
		vm.showHome = function() {
	    	return $state.is('home');
		}

		// Display BTC ticker
		vm.showTicker = function() {
	    	return $state.is('home');
		}

		// Mobile nav
		vm.isMobileNavOpen = false
		var unregister = matchmedia.onDesktop( function(mediaQueryList) {
			vm.isDesktop = mediaQueryList.matches;
			vm.isMobileNavOpen = false;
		});

		var postSignUpForm = function() {
            console.log(vm.formData);
            
            // process the form
            var request = $http({
                    method  : 'POST',
                    url     : '/signup',
                    data    : $.param(vm.formData),
                    headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
                })
                .success(function(data) {
                    console.log('go to wallet');

                    
                });
		};

	   	// Quick form submit
        vm.submitForm = function(isValid) {
            if (isValid) {
                console.log('Creating user:');
                homeService.postSignUpForm(vm.formData);
            } else {
            	alert('Please correct the form');
            }
        };
	}])

	.service('homeService', ['$http', function($http) {

        this.postSignUpForm = function(fdata) {
            console.log(fdata);

            var request = $http({
                    method  : 'POST',
                    url     : '/signup',
                    data    : $.param(fdata),
                    headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
                })
                .success(function() {

                });
        };
    }]);

})();

/*global angular */
/* =========================================
   REGISTER Module
   ========================================= */

(function() {

    var app = angular.module('app-register', [])
    .controller('RegisterCtrl',
        ['$http', '$location', 'registerService',
        function($http, $location, registerService) {

        var vm = this;
        var location = $location;

        // Sign up form submit
        vm.submitForm = function(isValid) {

            // check to make sure form is valid
            if (isValid) {
                registerService.postSignUpForm(vm.formData, location);
            } else {
               swal({
                   title: "Oops!",
                   text: "Please check the form!",
                   type: "error",
                   confirmButtonText: "Ok",
                   confirmButtonColor: "#024562" });
            }

        };

    }])

    .service('registerService', ['$http', function($http) {

        this.postSignUpForm = function(fdata, location) {

            console.log(location);

            var request = $http({
                    method  : 'POST',
                    url     : '/signup',
                    data    : $.param(fdata),
                    headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
                })
                .success(function() {

                });
        };
    }]);

})();
