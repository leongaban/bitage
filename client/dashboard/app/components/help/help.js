// /*global angular */
// /* =========================================
//    HELP Module
//    ========================================= */

// (function() {

// 	var app = angular.module('app-help', ['notification-directives'])

// 	.controller('HelpCtrl',
// 	['$scope', '$http', '$timeout', 'helpService',
// 	function($scope, $http, $timeout, helpService) {

// 		var vm = $scope;

// 		var timeoutMsg = function() {
//  			vm.dash.notification = false;
//  		};

// 		vm.dash.closeMsg = function() {
// 			vm.dash.notification = false;
// 		};

// 		// setup e-mail data with unicode symbols
// 		// send user name, email and public address
// 		var helpMessage = {
// 		    from: 'Fred Foo ✔ <foo@blurdybloop.com>', // sender address
// 		    to: 'leon@bitage.io', // list of receivers
// 		    subject: 'Bitage Help Request! ✔', // Subject line
// 		    text: 'Hello world ✔', // plaintext body
// 		    html: '<b>Hello world ✔</b>' // html body
// 		};

// 		// Quick form submit
// 		this.submitHelpForm = function(isValid) {

// 			// check to make sure form is valid
// 			if (isValid) {

// 				var data = this.formData;
// 				// Post form in helpService
// 				helpService.postHelpForm($http, data, vm.dash, $timeout, timeoutMsg);

// 			} else {

// 				// Show error notification - sweet alert
// 				alert('Please correct the form');
// 			}

// 		};

// 	}])

// 	.service('helpService', [function() {

// 		this.postHelpForm = function($http, data, dash, $timeout, timeoutMsg) {

// 			// process the form
// 			var request = $http({
// 					method  : 'POST',
// 					url     : '/help',
// 					// data    : $.param(vm.formData),
// 					data    : data.message,
// 					headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
// 				})
// 				.success(function() {
// 					// Show notification
// 					dash.message = 'Message sent! We will get back to you soon.';
// 					dash.notification_type = 'success';
// 					dash.notification = true;
// 					$timeout(timeoutMsg, 4000);
// 				});
// 		};

// 	}]);

// })();
