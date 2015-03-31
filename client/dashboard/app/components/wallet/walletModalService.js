/*global angular */
/* =========================================
   WALLET Modal Service
   ========================================= */

(function() {

	var app = angular.module('app-wallet-modal-service', [])

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