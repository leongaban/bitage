/*global angular */
/* =========================================
   HELP Module
   ========================================= */

(function() {

	var app = angular.module('app-help',['notification-directives'])

	.controller('HelpCtrl', ['$scope', function($scope) {

		var vm = this;

		// setup e-mail data with unicode symbols
		// send user name, email and public address
		var helpMessage = {
		    from: 'Fred Foo ✔ <foo@blurdybloop.com>', // sender address
		    to: 'leon@bitage.io', // list of receivers
		    subject: 'Bitage Help Request! ✔', // Subject line
		    text: 'Hello world ✔', // plaintext body
		    html: '<b>Hello world ✔</b>' // html body
		};

		// Quick form submit
		vm.submitHelpForm = function(isValid) {

			// check to make sure form is valid
			if (isValid) {
				alert('our form is amazing');
				postLoginForm();
			} else {
				alert('Please correct the form');
			}

		};

	}]);

})();
