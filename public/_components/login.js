/*global angular */
/* =========================================
   LOGIN Module
   ========================================= */

(function() {

	var app = angular.module('app-login', [])
	.controller('LoginCtrl', ['$scope', function($scope) {

		var vm = $scope;

        var postLoginForm = function() {
            console.log(vm.formData);
            
            // process the form
            vm.$parent.processForm = function() {
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
        vm.$parent.submitLoginForm = function(isValid) {

            // check to make sure form is valid
            if (isValid) {
                // alert('our form is amazing');
                postLoginForm();
            } else {
            	alert('Please correct the form')
            }

        };
	    
	}]);

})();