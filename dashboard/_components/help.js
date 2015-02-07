/*global angular */
/* =========================================
   HELP Module
   ========================================= */

(function() {

	var app = angular.module('app-help', ['notification-directives'])

	.controller('HelpCtrl', ['$scope', '$http', function($scope, $http) {

		var vm = this;

		var timeoutMsg = function() {
			vm.$parent.notification = false;
		};

		$scope.$parent.closeMsg = function() {
			$scope.$parent.notification = false;
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

		var postHelpForm = function() {
			console.log(vm.formData);

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
		vm.submitHelpForm = function(isValid) {

			// check to make sure form is valid
			if (isValid) {
				alert('our form is amazing');
				postHelpForm();
				// Show notification
				vm.$parent.message = 'Thanks! We will get back to you soon.';
				vm.$parent.notification = true;
				$timeout(timeoutMsg, 4000);
			} else {
				alert('Please correct the form');
			}

		};

	}]);

})();
