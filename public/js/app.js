/*global angular*/
var app = angular.module('bitAge', ['ngAnimate']);

// config
// ----------------------

// CONTROLLER AcctCtrl
// ----------------------
app.controller('AcctCtrl', ['$scope', function($scope) {

	// add timeout for avatar_menu
	// add click on body to hide menu
	// http://tutorials.jenkov.com/angularjs/timeout-interval.html

	// var for #avatar_menu
	var id_avatar_menu = document.getElementById("avatar_menu");
	var avatar_menu_open = false;

	// avatar_menu show/hide boolean
	$scope.avatarMenuBool = false;

	$scope.id_avatar_menu = {};
	$scope.id_avatar_menu.getMenuClick = function(val) {
		$scope.avatarMenuBool = !$scope.avatarMenuBool
        console.log(val);
        console.log($scope.avatarMenuBool);
    };

	

	// document.getElementById('wrapper').onclick = function(e) {
	//     if(e.target != document.getElementById('avatar_menu')) {
	//         console.log('clicked outside');
	//         id_avatar_menu.setAttribute("class", "ng-hide-add");
	//     } else {
	//         console.log('clicked inside');
	//         id_avatar_menu.setAttribute("class", "ng-ng-hide-remove-add");
	//     }
	// }

	$scope.accounts = [];
	$scope.accounts = [
		{ label: 'Blockchain.info', balance: '0.003', address: '17dPAMzZiosQYVty6ES4KSWN8R8XFcxShH' },
		{ label: 'Coinbase wallet', balance: '0.003', address: '14TKW5r2EDhGPHsrsbPrbZq9ZXm96SP68W' },
		{ label: 'Xapo wallet', balance: '0.003', address: '13sizB7zFU9wrxotFAVniG6cJBA9fXzhea' },
		{ label: 'Wood wallet', balance: '1', address: '1Pto8Mm6PphDwJYL3UyNxMPqFUFoigGUUU' }
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