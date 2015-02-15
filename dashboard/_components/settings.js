/*global angular */
/* =========================================
   SETTINGS Module
   ========================================= */

(function() {

	var app = angular.module('app-settings', ['ngAnimate', 'flow'])
	.controller('SettingsCtrl',
		['$scope', '$timeout', 'settingsService', 
		function($scope, $timeout, settingsService) {

		//http://flowjs.github.io/ng-flow/
		//https://github.com/flowjs/ng-flow

		var vm = $scope;

		var timeoutMsg = function() {
 			vm.dash.notification = false;
 		};

		vm.dash.closeMsg = function() {
			vm.dash.notification = false;
		};

		this.saveProfile = function(msg) {
			settingsService.postProfile(vm.dash, $timeout, timeoutMsg);
		};
	    
	}])

	.service('settingsService', [function() {

	    // send updated profile to server
		this.postProfile = function (dash, $timeout, timeoutMsg) {

			// Show notification
			dash.message = 'Profile updated!';
			dash.notification = true;
			$timeout(timeoutMsg, 4000);
		};
	}]);

})();