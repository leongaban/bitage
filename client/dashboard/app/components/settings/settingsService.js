/*global angular */
/* =============================================================================
   Settings Service to update name, email and password
   ========================================================================== */

(function() {

	var app = angular.module('app-settings-service', [])
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