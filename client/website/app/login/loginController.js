/*global angular */
/* =========================================
   Login Controller
   ========================================= */

(function() {

	var app = angular.module('app-login', [])
	.controller('LoginCtrl',
        ['$http',
         'authService',
        function($http,
                 authService) {

        // Init LoginCtrl scope:
        // ---------------------
        var vm = this;

		// Quick form submit          
        vm.submitLoginForm = function(isValid) {

            // check to make sure form is valid
            if (isValid) {
                // alert('our form is amazing');
                authService.postLoginForm(vm.formData);
            } else {
            	alert('Please correct the form');
            }

        };
	    
	}]);

})();