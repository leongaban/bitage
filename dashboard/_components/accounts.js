/*global angular */
/* =========================================
   Accounts module
   ========================================= */

(function() {

	var app = angular.module('app-accounts',
		['ngAnimate', 'account-directives'])

	.controller('AcctCtrl', 
		['$scope', 'accountsService',
		function($scope, accountsService) {

		var vm = $scope;
			vm.$parent.modal = false;

		this.accounts = [];
		this.accounts = [
			{ type: 'Savings', label: 'Bitage', balance: '1.001', address: '16mCDhpziD6kBwPNnh1gSEHhdGFjAYYZdq' },
			{ type: 'Savings', label: 'Blockchain.info', balance: '3.001', address: '17dPAMzZiosQYVty6ES4KSWN8R8XFcxShH' },
			{ type: 'Savings', label: 'Coinbase wallet', balance: '0.562', address: '14TKW5r2EDhGPHsrsbPrbZq9ZXm96SP68W' },
			{ type: 'Savings', label: 'Xapo wallet', balance: '0.003', address: '13sizB7zFU9wrxotFAVniG6cJBA9fXzhea' }
		];

		this.addAccount = function() {
			// Don't add account if blank
		    if (this.label === '' ||
		    	this.label === undefined ||
		    	this.address === undefined) { return; }

		    // Add new account to accounts []
		    this.accounts.push({
				label: this.label,
				balance: 0,
				address: this.address
		    });

		    // Reset inputs
		    this.label = '';
		    this.address = '';
		};

		// Open edit account modal:
		this.editAccount = function(id, label, address) {
			vm.dash.modal = id;
			accountsService.modalEditAccount(vm.dash, id, label, address);
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

		// Wire modal recieve
	    this.modalEditAccount = function(vm, id, label, address) {
	        vm.modal_edit_account = true;
	        vm.acct_label = label;
	        vm.acct_address = address;
			vm.save_btn_text = 'save';
	    };

	}]);

})();
