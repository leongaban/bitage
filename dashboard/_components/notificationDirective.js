/*global angular */
/* =========================================
   NOTIFICATION Directive
   ========================================= */

(function() {

	var app = angular.module('notification-directives', [])
	.directive('notificationMsg', function () {

	    return {
	        restrict: 'E',
	        template: 
	        	'<section ng-show="notification" ' +
					'ng-click="closeMsg()" ' +
					'class="ng-notification"> ' +
					'<p class="notify-msg">{{message}}</p> ' +
					'<div class="notify-bg success"></div> ' +
				'</section>'
	    };
	});

})();
