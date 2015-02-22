/*global angular */
/* =========================================
   Settings module
   ========================================= */

(function() {

	var app = angular.module('app-settings', ['ngAnimate', 'flow'])
	.controller('SettingsCtrl',
		['$scope', '$timeout', 'settingsService',
		function($scope, $timeout, settingsService) {

		// Angular File upload:
		//http://flowjs.github.io/ng-flow/
		//https://github.com/flowjs/ng-flow

		var vm = $scope;

		var timeoutMsg = function() {
 			vm.dash.notification = false;
 		};

		vm.dash.closeMsg = function() {
			vm.dash.notification = false;
		};

		this.saveProfile = function(isValid) {

			// check to make sure form is valid
            if (isValid) {
                settingsService.postProfile(
                	this.formData,
					vm.dash,
					$timeout,
					timeoutMsg
				);
            } else {
            	// alert('Please check the form!');
             //   	swal({
                //    title: "Oops!",
                //    text: "Please check the form!",
                //    type: "error",
                //    confirmButtonText: "Ok",
                //    confirmButtonColor: "#024562" });
            }

		};
	}])

	.service('settingsService', [function() {

	    // send updated profile to server
		this.postProfile = function (fdata, dash, $timeout, timeoutMsg) {

			if (fdata !== undefined) {
				console.log(fdata);
				dash.message = 'Profile updated!';
				dash.notification_type = 'success';
			} else if (fdata === undefined) {
				dash.message = 'Please check the form!';
				dash.notification_type = 'error';
			}

			// Show notification
			dash.notification = true;
			$timeout(timeoutMsg, 4000);
		};
	}]);

})();
