/*global angular */
/* =========================================
   WALLET Module
   ========================================= */

(function() {

	var app = angular.module('app-wallet', [])
	.controller('WalletCtrl', ['$scope', '$sce', function($scope, $sce) {
		
		var vm = $scope;
		// $sce = Strict Contextual Escaping

		// Modal vars:
		var public_address ="17dPAMzZiosQYVty6ES4KSWN8R8XFcxShH";
		var qr_code = "_assets/img/qrcode.png";
		var receive_modal_html = '<div ng-show="modal_receive" class="modal_qr"><img src="'+qr_code+'"/></div><p ng-show="modal_receive" class="public_address">'+public_address+'</p>';
		var send_modal_html = '<div ng-show="modal_send" class="send_form"><div class="label_input_combo"><label for="to_input">Send to address</label><input id="to_input" class="form-input" type="text" placeholder=""></div><div class="label_input_combo"><div class="btn_usd noselect">USD</div><label for="amount_input" class="label_amount">Amount</label><input id="amount_input" class="form-input" type="text" placeholder=""></div><button class="btn btn_med btn_send_now">Send</button></div>;'

		// Modal settings:
		vm.$parent.modal = false;
		vm.$parent.modal_receive = true;
		vm.$parent.receive_modal_bind = $sce.trustAsHtml(receive_modal_html);
		vm.$parent.modal_send = false;
		vm.$parent.title = "Your Public Address";
		// vm.$parent.title = "Send Bitcoin";

		// Button actions
		vm.openModal = function(m) {
			vm.$parent.modal = m;
		};

		vm.transactions = [
			{
				type: 'incoming',
				comment: 'Recieved from multiple addresses',
				time: '10 hours ago',
				amount: 0.00498623
			},
			{
				type: 'incoming',
				comment: 'Recieve from 1MgZLyz6d8djEqe68XoPpsjx9BFQyVAtXN',
				time: '12 hours ago',
				amount: 0.003
			},
			{
				type: 'outgoing',
				comment: 'Sent to 17dPAMzZiosQYVty6ES4KSWN8R8XFcxShH',
				time: 'Jan 15th 2015',
				amount: 0.01
			},
			{
				type: 'incoming',
				comment: 'Recieved from multiple addresses',
				time: 'Jan 14th 2015',
				amount: 0.02874
			},
			{
				type: 'outgoing',
				comment: 'Sent to 1GS9E86Y3mhK7Qwm1vqvgCmpE5u6MMxPML',
				time: 'Jan 12th 2015',
				amount: 0.064904
			}
		];

	}]);

})();