/*global angular */
/* =============================================================================
   Accounts module
   ========================================================================== */

(function() {

	var app = angular.module('app-accounts-factory',
		['ngAnimate',
		 'ngResource',
		 'account-directives'])

	// Accounts factory (edit-model, get all, update, remove):
	.factory('AccountsFactory', ['$http', function($http) {

		var accountsFactory = {};

		accountsFactory.modalEditAccount = function(vm, id, label, address) {
	        vm.modal_edit_account = true;
	        vm.acct_id 			  = id;
	        vm.acct_label 		  = label;
	        vm.acct_address 	  = address;
			vm.save_btn_text 	  = 'save';
	    };

		// Get all the accounts
		accountsFactory.all = function() {
			return $http.get('/api/stuff');
		};

		// Delete account
		accountsFactory.remove = function(id) {
			return $http.delete('/api/accounts/'+id);
		};
		
		return accountsFactory;

	}]);

})();