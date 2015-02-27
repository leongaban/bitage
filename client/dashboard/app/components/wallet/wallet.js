/*global angular */
/* =========================================
   WALLET Module
   ========================================= */

(function() {

	var app = angular.module('app-wallet',
		['wallet-directives',
		 'notification-directives'])

	.controller('WalletCtrl',
		['$scope', '$sce', '$timeout', 'walletModalService',
		function($scope, $sce, $timeout, walletModalService) {

		var vm 			     = $scope,
			public_address   = '';
			vm.dash.currency = 'USD';
			vm.dash.modal 	 = false;

		var timeoutMsg = function() {
 			vm.dash.notification = false;
 		};

		vm.dash.closeMsg = function() {
			vm.dash.notification = false;
		};

		// Express response listener here for incoming transaction:

		// Open Receive or Send modals:
		this.openModal = function(m) {
			// console.log(m);

			// Show overlay:
			vm.dash.modal = m;

			switch (m) {
				case 'receive':
					// API call to get user public address
					// Code to generate QR code
					// Update receive_obj
					walletModalService.modalRecieve(vm.dash);
					break;

				case 'send':
					// API call to check address
					// Calculate Bitcoin / USD
					// Complete transaction
					walletModalService.modalSend(vm.dash, $timeout, timeoutMsg);
					break;
			}
		};

		// Transaction models
		this.transactions = [
			{
				type: 'incoming',
				status: 'Pending',
				comment: 'Recieved from multiple addresses',
				time: '10 minutes ago',
				amount: 0.00498623
			},
			{
				type: 'incoming',
				status: 'Confirmed',
				comment: 'Recieve from 1MgZLyz6d8djEqe68XoPpsjx9BFQyVAtXN',
				time: '12 hours ago',
				amount: 0.003
			},
			{
				type: 'outgoing',
				status: 'Confirmed',
				comment: 'Sent to 17dPAMzZiosQYVty6ES4KSWN8R8XFcxShH',
				time: 'Jan 15th 2015',
				amount: 0.01
			},
			{
				type: 'incoming',
				status: 'Confirmed',
				comment: 'Recieved from multiple addresses',
				time: 'Jan 14th 2015',
				amount: 0.02874
			},
			{
				type: 'outgoing',
				status: 'Confirmed',
				comment: 'Sent to 1GS9E86Y3mhK7Qwm1vqvgCmpE5u6MMxPML',
				time: 'Jan 12th 2015',
				amount: 0.064904
			}
		];
	}])

	.service('walletModalService', [function() {

		// wire modal recieve
	    this.modalRecieve = function(dash) {
	        dash.modal_receive  = true;
			dash.public_address = '17dPAMzZiosQYVty6ES4KSWN8R8XFcxShH';
			dash.qr_code 	    = 'assets/img/qrcode.png';
	    };

	    // wire modal send
	    this.modalSend = function(dash, $timeout, timeoutMsg) {
	    	dash.modal_send = true;
			dash.send_btn_text = 'Send';

			// btn_usd in walletDirective html
			dash.switchCurrency = function() {
				if (dash.currency === 'USD') {
					dash.currency = 'BTC';
				} else if (dash.currency = 'BTC') {
					dash.currency = 'USD';
				}
			};

			dash.sendTransaction = function() {

				// Make API call to check address
				dash.send_btn_text = 'Sending...';

				// Get response back and close modal
				dash.modal_send = false;
				dash.modal = false;

				// Show notification
				dash.message = 'Transaction sent!';

				// success or error
				dash.notification_type = 'success';

				// show notifcation and settimeout
				dash.notification = true;
				$timeout(timeoutMsg, 4000);
			};
	    }
	}]);

})();
