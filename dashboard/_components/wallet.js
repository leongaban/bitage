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
			public_address   = '',
			qr_code 	     = '';
			vm.dash.currency = 'USD';
			vm.dash.modal 	 = false;

		var timeoutMsg = function() {
 			vm.$parent.notification = false;
 		};

		vm.$parent.closeMsg = function() {
			vm.$parent.notification = false;
		};

		// Express response listener here for incoming transaction:

		// Open Receive or Send modals:
		vm.openModal = function(m) {

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
		vm.transactions = [
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
	    this.modalRecieve = function(vm) {
	        vm.modal_receive  = true;
			vm.public_address = '17dPAMzZiosQYVty6ES4KSWN8R8XFcxShH';
			vm.qr_code 	      = '_assets/img/qrcode.png';
	    };

	    // wire modal send
	    this.modalSend = function(vm, $timeout, timeoutMsg) {
	    	vm.modal_send = true;
			vm.send_btn_text = 'Send';

			// btn_usd in walletDirective html
			vm.switchCurrency = function() {
				if (vm.currency === 'USD') {
					vm.currency = 'BTC';
				} else if (vm.currency = 'BTC') {
					vm.currency = 'USD';
				}
			};

			vm.sendTransaction = function() {

				// Make API call to check address
				vm.send_btn_text = 'Sending...';

				// Get response back and close modal
				vm.modal_send = false;
				vm.modal = false;

				// Show notification
				vm.message = 'Transaction sent!';
				vm.notification = true;
				$timeout(timeoutMsg, 4000);
			};
	    }
	}]);

})();
