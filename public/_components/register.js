/*global angular */
/* =========================================
   REGISTER Module
   ========================================= */

(function() {

	var app = angular.module('app-register', [])
	.controller('RegisterCtrl', ['$scope', function($scope) {

	    var vm = $scope;

		// Quick form submit          
        vm.$parent.submitRegisterForm = function(isValid) {

            // check to make sure form is valid
            if (isValid) {
                alert('our form is amazing');
            } else {
            	alert('Please correct the form')
            }

        };

	}]);

})();