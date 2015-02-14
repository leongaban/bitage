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

		// Setup accounts model
		this.accounts = [];
		this.accounts = [
			{
				id: 'acct-1',
				type: 'Savings',
				label: 'Bitage',
				balance: '1.001',
				address: '16mCDhpziD6kBwPNnh1gSEHhdGFjAYYZdq'
			},
			{
				id: 'acct-2',
				type: 'Savings',
				label: 'Blockchain.info',
				balance: '3.001',
				address: '17dPAMzZiosQYVty6ES4KSWN8R8XFcxShH'
			},
			{
				id: 'acct-3',
				type: 'Savings',
				label: 'Coinbase wallet',
				balance: '0.562',
				address: '14TKW5r2EDhGPHsrsbPrbZq9ZXm96SP68W'
			},
			{
				id: 'acct-4',
				type: 'Savings',
				label: 'Xapo wallet',
				balance: '0.003',
				address: '13sizB7zFU9wrxotFAVniG6cJBA9fXzhea'
			}
		];

		this.addAccount = function() {

			// Create next account id
			var nextId = 'acct-' + (vm.acct.accounts.length + 1);

			// Don't add account if blank
		    if (this.label === '' ||
		    	this.label === undefined ||
		    	this.address === undefined) { return; }

		    // Add new account to accounts array
		    this.accounts.push({
				id: nextId,
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
			// console.log(id);
			vm.dash.modal = true;
			accountsService.modalEditAccount(vm.dash, id, label, address);
		};

		vm.dash.updateAccount = function(i) {

			// Don't add account if blank
		    if (this.new_label === '' ||
		    	this.new_label === undefined ||
		    	this.new_address === undefined) { return; }

			// find account by id and update it's obj values
			function changeAccountValues( id, new_label, new_address ) {
				for (var i in vm.acct.accounts) {
					if (vm.acct.accounts[i].id == id) {
						vm.acct.accounts[i].label = new_label;
						vm.acct.accounts[i].address = new_address;
						break;
					}
				}
			}

			changeAccountValues (i, this.new_label, this.new_address);

			// Hide modal
			vm.dash.modal_edit_account = false;
			vm.dash.modal = false;

			// Reset inputs
		    this.new_label = '';
		    this.new_address = '';

			// Briefly highlight row
			var theRow = angular.element( document.querySelector('#acct-'+i));
			theRow.addClass('ping-row');
		}

		vm.dash.removeAccount = function(acct_id) {

			// Find object by id and remove from array
			for (var i = 0; i < vm.acct.accounts.length; i++) {
			    var obj = vm.acct.accounts[i];

			    if (acct_id.indexOf(obj.id) !== -1) {
			        vm.acct.accounts.splice(i, 1);
			    }
			}

			// Hide modal
			vm.dash.modal_edit_account = false;
			vm.dash.modal = false;

			// Reset inputs
		    this.new_label = '';
		    this.new_address = '';
		};

		// Select public addresses on click
		function selectAddress(element) {
			var text = document.getElementById(element),
				range = document.createRange(),
				selection = window.getSelection();
				range.selectNodeContents(text);
				selection.removeAllRanges();
			    selection.addRange(range);
		};

		// Select entire address on click
		vm.pubAddress = {};
		vm.pubAddress.getClick = function(the_id) {
			selectAddress(the_id);
		};

	}])

	.service('accountsService', [function() {

		// Wire up edit account modal
	    this.modalEditAccount = function(vm, id, label, address) {
	        vm.modal_edit_account = true;
	        vm.acct_id = id;
	        vm.acct_label = label;
	        vm.acct_address = address;
			vm.save_btn_text = 'save';
	    };

	}]);

})();
