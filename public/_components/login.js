/*global angular */
/* =========================================
   LOGIN Module
   ========================================= */

(function() {

	var app = angular.module('app-login', [])
	.controller('LoginCtrl', ['$scope', function($scope) {

		var vm = $scope;

		// Quick form submit          
        vm.$parent.submitLoginForm = function(isValid) {

            // check to make sure form is valid
            if (isValid) {
                alert('our form is amazing');
            }

        };
	    
	}]);

})();