/*global angular */
/* =========================================
   Accounts module
   ========================================= */

(function() {

	var app = angular.module('app-accounts',
		['ngAnimate', 'ngResource', 'account-directives'])

	.controller('AcctCtrl',
		['$scope', '$resource', 'Accounts',
		function($scope, $resource, Accounts) {

		var vm = $scope;
			vm.$parent.modal = false;

		var Account = $resource('/api/accounts');

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

		// POST new account to '/api/accounts'
		this.addAccount = function() {
			var account = new Account();
			account.label = this.label;
			account.address = this.address;
			account.$save();
		}

		// Open the edit account modal:
		this.editAccount = function(id, label, address) {
			// console.log(id);
			vm.dash.modal = true;
			Accounts.modalEditAccount(vm.dash, id, label, address);
		};

		vm.dash.updateAccount = function(i) {

			console.log(i);

			// Don't add account if blank
		    // if ($scope.new_label === '' ||
		    // 	$scope.new_label === undefined ||
		    // 	$scope.new_address === undefined) { return; }

		    // Update account
		    Accounts.update(i, $scope.new_label, $scope.new_address);
		}

		/*
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
		*/

		/*
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
		*/

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

	// Accounts factory (edit-model, get all, update, remote):
	.factory('Accounts', ['$http', '$resource', function($http, $resource) {

		var accountsFactory = {};

		accountsFactory.modalEditAccount = function(vm, id, label, address) {
	        vm.modal_edit_account = true;
	        vm.acct_id = id;
	        vm.acct_label = label;
	        vm.acct_address = address;
			vm.save_btn_text = 'save';
	    };

		// Get all the accounts
		accountsFactory.all = function() {
			return $http.get('/api/stuff');
		};

		// Updates an account
		accountsFactory.update = function(id) {
			return $http.put('/api/accounts/'+id);
		};

		// Delete account
		accountsFactory.remove = function(id) {
			return $http.delete('/api/accounts/'+id);
		};
		
		return accountsFactory;

	}]);

})();
