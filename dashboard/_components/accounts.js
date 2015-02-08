/*global angular */
/* =========================================
   ACCOUNTS Module
   ========================================= */

(function() {

	var app = angular.module('app-accounts',
		['ngAnimate', 'account-directives'])

	.controller('AcctCtrl', 
	['$scope', 'accountsService',
	function($scope, accountsService) {

		var vm = $scope;
			vm.$parent.modal = false;

		vm.accounts = [];
		vm.accounts = [
			{ type: 'Savings', label: 'Bitage', balance: '1.001', address: '16mCDhpziD6kBwPNnh1gSEHhdGFjAYYZdq' },
			{ type: 'Savings', label: 'Blockchain.info', balance: '3.001', address: '17dPAMzZiosQYVty6ES4KSWN8R8XFcxShH' },
			{ type: 'Savings', label: 'Coinbase wallet', balance: '0.562', address: '14TKW5r2EDhGPHsrsbPrbZq9ZXm96SP68W' },
			{ type: 'Savings', label: 'Xapo wallet', balance: '0.003', address: '13sizB7zFU9wrxotFAVniG6cJBA9fXzhea' }
		];

		vm.addAccount = function() {
			// Don't add account if blank
		    if (vm.label === '' ||
		    	vm.label === undefined ||
		    	vm.address === undefined) { return; }

		    // Add new account to accounts []
		    vm.accounts.push({
				label: vm.label,
				balance: 0,
				address: vm.address
		    });

		    // Reset inputs
		    vm.label = '';
		    vm.address = '';
		};

		// Open edit account modal:
		vm.editAccount = function(m) {

			// Show overlay:
			vm.$parent.modal = m;
			accountsService.modalEditAccount(vm);

			// This needs to be refactored, exists in wallet.js and should be in a reusable service:
			// vm.$parent.closeModal = function() {
			// 	vm.$parent.modal_receive = false;
			// 	vm.$parent.modal = false;
			// };
		};

		// select public addresses on click
		function selectAddress(element) {
			var text = document.getElementById(element),
				range = document.createRange(),
				selection = window.getSelection();
				range.selectNodeContents(text);
				selection.removeAllRanges();
			    selection.addRange(range);
		};

		vm.pubAddress = {};
		vm.pubAddress.getClick = function(the_id) {
			selectAddress(the_id);
		};

	}])

	.service('accountsService', [function() {

		// wire modal recieve
	    this.modalEditAccount = function(vm) {
	        vm.$parent.modal_edit_account  = true;
			vm.$parent.send_btn_text = 'save';
			// vm.$parent.qr_code 	      = '_assets/img/qrcode.png';

			vm.$parent.closeModal = function() {
				vm.$parent.modal_edit_account = false;
				vm.$parent.modal = false;
			};
	    };

	}]);

})();
