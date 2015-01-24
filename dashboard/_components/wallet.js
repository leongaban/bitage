/*global angular */
/* =========================================
   WALLET Module
   ========================================= */

(function() {

	var app = angular.module('app-wallet', [])
	.controller('WalletCtrl', ['$scope', '$sce', '$compile', function($scope, $sce, $compile) {
		
		var vm = $scope;
		// $sce = Strict Contextual Escaping

		var public_address = '',
			qr_code 	   = '',
			currency	   = 'USD';

		var send_html = '<div ng-show="modal_send" class="send_form"><div class="label_input_combo"><label for="to_input">Send to address</label><input id="to_input" class="form-input" type="text" placeholder=""></div><div class="label_input_combo"><div ng-click="switchCurrency()" class="btn_usd noselect">'+currency+'</div><label for="amount_input" class="label_amount">Amount</label><input id="amount_input" class="form-input" type="text" placeholder=""></div><button class="btn btn_med btn_send_now">Send</button></div>';

		// Modal settings:
		vm.$parent.modal 		 = false;
		vm.$parent.modal_receive = true;
		vm.$parent.modal_send 	 = false;
		
		// Button actions
		vm.openModal = function(m) {
			vm.$parent.modal = m;

			switch (m) {
				case 'receive':
					// API call to get user public address
					// Code to generate QR code
					// Update receive_obj

					vm.$parent.title = "Your Public Address";
					public_address   = "17dPAMzZiosQYVty6ES4KSWN8R8XFcxShH";
					qr_code 		 = "_assets/img/qrcode.png";

					vm.$parent.modal_bind = $sce.trustAsHtml('<div ng-show="modal_receive" class="modal_qr"><img src="'+qr_code+'"/></div><p ng-show="modal_receive" class="public_address">'+public_address+'</p>');

					break;

				case 'send':
					vm.$parent.title = "Send Bitcoin";
					vm.$parent.modal_bind = $sce.trustAsHtml(send_html);
					// vm.$parent.modal_bind = $compile($sce.trustAsHtml(send_html));
					break;
			}
		};

		vm.$parent.switchCurrency = function() {
			console.log('clicked');
			if (currency === 'USD') {
				currency = 'BTC';
			} else {
				currency === 'USD';
			}
		};

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

	}]);

})();