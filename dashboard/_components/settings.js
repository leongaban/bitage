/*global angular */
/* =========================================
   SETTINGS Module
   ========================================= */

(function() {

	var app = angular.module('app-settings', ['ngAnimate', 'flow'])
	.controller('SettingsCtrl', ['$scope', function($scope) {

		//http://flowjs.github.io/ng-flow/
		//https://github.com/flowjs/ng-flow

		$scope.settings = {};
	    
	}]);

})();