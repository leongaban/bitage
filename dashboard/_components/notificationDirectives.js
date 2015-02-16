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
	        	'<section ng-show="dash.notification" ' +
					'ng-click="dash.closeMsg()" ' +
					'class="ng-notification"> ' +
					'<p class="notify-msg">{{dash.message}}</p> ' +
					'<div class="notify-bg {{dash.notification_type}}"></div> ' +
				'</section>'
	    };
	});
	
})();
