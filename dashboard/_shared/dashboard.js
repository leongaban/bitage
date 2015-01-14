/*global angular */
/* =========================================
   DASHBOARD Module
   ========================================= */

(function() {

	var app = angular.module('app-dashboard', ['ngAnimate'])
	.controller('DashCtrl', ['$scope', function($scope) {

		// Accounts tab selected:
		$scope.sectionSelected = 1;

		// add timeout for avatar_menu
		// add click on body to hide menu
		// http://tutorials.jenkov.com/angularjs/timeout-interval.html

		// open or close avatar menu
		var id_avatar_menu = document.getElementById("avatar_menu");
		$scope.avatarMenuBool = false;
		$scope.id_avatar_menu = {};
		$scope.id_avatar_menu.getMenuClick = function(val, $event) {
			$event.stopPropagation();
			$scope.avatarMenuBool = !$scope.avatarMenuBool;
		};

		// detect click on body & close menu
		$scope.pageClick = function () {
			$scope.avatarMenuBool = false;
		};

		// stop the event from bubbling up any further
		$scope.menuClick = function ($event) {
			$event.stopPropagation();
		};

	}]);

})();