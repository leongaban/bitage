/*global angular */
/* =========================================
   ACCOUNTS Module
   ========================================= */

(function() {

	var app = angular.module('app-accounts', ['ngAnimate'])
	.controller('AcctCtrl', ['$scope', function($scope) {

		$scope.accounts = [];
		$scope.accounts = [
			{ type: 'Savings', label: 'BitAge', balance: '1.001', address: '16mCDhpziD6kBwPNnh1gSEHhdGFjAYYZdq' },
			{ type: 'Savings', label: 'Blockchain.info', balance: '0.003', address: '17dPAMzZiosQYVty6ES4KSWN8R8XFcxShH' },
			{ type: 'Savings', label: 'Coinbase wallet', balance: '0.003', address: '14TKW5r2EDhGPHsrsbPrbZq9ZXm96SP68W' },
			{ type: 'Savings', label: 'Xapo wallet', balance: '0.003', address: '13sizB7zFU9wrxotFAVniG6cJBA9fXzhea' }
		];

		$scope.addAccount = function() {
			// Don't add account if blank
		    if ($scope.label === '' || 
		    	$scope.label === undefined ||
		    	$scope.address === undefined) { return; }

		    // Add new account to accounts []
		    $scope.accounts.push({
				label: $scope.label,
				balance: 0,
				address: $scope.address
		    });

		    // Reset inputs
		    $scope.label = '';
		    $scope.address = '';
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

		$scope.pubAddress = {};
		$scope.pubAddress.getClick = function(the_id) {
			selectAddress(the_id);
		};
	    
	}]);

})();