/*global angular */
/* =========================================
   HELP Module
   ========================================= */

(function() {

	var app = angular.module('app-help', ['notification-directives'])

	.controller('HelpCtrl', ['$scope', '$http', function($scope, $http) {

		var vmt = this;
		var vms = $scope;

		var timeoutMsg = function() {
			vms.$parent.notification = false;
		};

		vms.$parent.closeMsg = function() {
			vms.$parent.notification = false;
		};

		// setup e-mail data with unicode symbols
		// send user name, email and public address
		var helpMessage = {
		    from: 'Fred Foo ✔ <foo@blurdybloop.com>', // sender address
		    to: 'leon@bitage.io', // list of receivers
		    subject: 'Bitage Help Request! ✔', // Subject line
		    text: 'Hello world ✔', // plaintext body
		    html: '<b>Hello world ✔</b>' // html body
		};

		var postHelpForm = function(timeoutMsg) {
			console.log(vmt.formData);

			// Show notification
			vms.$parent.message = 'Thanks! We will get back to you soon.';
			vms.$parent.notification = true;
			// $timeout(timeoutMsg, 4000);

			// process the form
			// login data contains remember boolean
			var request = $http({
					method  : 'POST',
					url     : '/help',
					data    : $.param(vm.formData),
					headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
				})
				.success(function() {

				});
		};

		// Quick form submit
		vmt.submitHelpForm = function(isValid) {

			// check to make sure form is valid
			if (isValid) {
				alert('our form is amazing');
				postHelpForm();
				// Show notification
				// vms.$parent.message = 'Thanks! We will get back to you soon.';
				// vms.$parent.notification = true;
				// $timeout(timeoutMsg, 4000);
			} else {
				alert('Please correct the form');
			}

		};

	}]);

})();
