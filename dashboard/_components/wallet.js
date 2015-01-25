/*global angular */
/* =========================================
   WALLET Module
   ========================================= */

(function() {

	var app = angular.module('app-wallet', ['wallet-directives'])
	.controller('WalletCtrl', ['$scope', '$sce', function($scope, $sce) {
		
		var vm 			    	= $scope,
			public_address  	= '',
			qr_code 	    	= '';
			vm.$parent.currency	= 'USD';

			// Modal settings:
			vm.$parent.modal 	= false;
			vm.modal_receive 	= false;
			vm.modal_send 	 	= false;
		
		// Open Receive or Send modals:
		vm.openModal = function(m) {
			vm.$parent.modal = m;

			switch (m) {
				case 'receive':
					// API call to get user public address
					// Code to generate QR code
					// Update receive_obj

					vm.$parent.modal_receive  = true;
					vm.$parent.public_address = "17dPAMzZiosQYVty6ES4KSWN8R8XFcxShH";
					vm.$parent.qr_code 	      = "_assets/img/qrcode.png";

					vm.$parent.closeModal = function() {
						vm.$parent.modal_receive = false;
						vm.$parent.modal = false;
					};

					break;

				case 'send':
					// API call to check address
					// Calculate Bitcoin / USD
					// Complete transaction
					
					vm.$parent.modal_send = true;
					vm.$parent.switchCurrency = function() {
						if (vm.$parent.currency === 'USD') {
							vm.$parent.currency = 'BTC';
						} else if (vm.$parent.currency = 'BTC') {
							vm.$parent.currency = 'USD';
						}
					};

					vm.$parent.closeModal = function() {
						vm.$parent.modal_send = false;
						vm.$parent.modal = false;
					};

					break;
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