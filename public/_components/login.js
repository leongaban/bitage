/*global angular */
/* =========================================
   Login Controller
   ========================================= */

(function() {

	var app = angular.module('app-login', [])
	.controller('LoginCtrl', ['$http', function($http) {

		// var vm = $scope;
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