/*global angular */
/* =========================================
   Auth Service
   ========================================= */

(function() {

    var app = angular.module('app-auth-service', [])
    .service('authService', ['$http', function($http) {

    	// Sign up
        this.postSignUpForm = function(fdata) {
            console.log(fdata);

            var request = $http({
                    method  : 'POST',
                    url     : '/signup',
                    data    : $.param(fdata),
                    headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
                })
                .success(function() {
                	console.log('go to wallet');
                });
        };

        // Login
        this.postLoginForm = function() {
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

    }]);

})();