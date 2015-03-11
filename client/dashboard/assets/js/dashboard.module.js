/*global angular */
/* =========================================
   NOTIFICATION Directive
   ========================================= */

(function() {

	var app = angular.module('notification-directives', [])
	.directive('notificationMsg', function () {

	    return {
	        restrict: 'E',
	        template: 
	        	'<section ng-show="dash.notification" ' +
					'ng-click="dash.closeMsg()" ' +
					'class="ng-notification"> ' +
					'<p class="notify-msg">{{dash.message}}</p> ' +
					'<div class="notify-bg {{dash.notification_type}}"></div> ' +
				'</section>'
	    };
	});
	
})();

/*global angular */
/* =========================================
   Accounts module
   ========================================= */

(function() {

	var app = angular.module('app-accounts',
		['ngAnimate', 'ngResource', 'account-directives'])

	.controller('AcctCtrl',
		['$scope', '$resource', 'accountsService',
		function($scope, $resource, accountsService) {

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

		this.addAccount = function() {
			var account = new Account();
			account.label = this.label;
			account.address = this.address;
			account.$save();
		}

		// this.addAccount = function() {

		// 	// Create next account id
		// 	var nextId = 'acct-' + (vm.acct.accounts.length + 1);

		// 	// Don't add account if blank
		//     if (this.label === '' ||
		//     	this.label === undefined ||
		//     	this.address === undefined) { return; }

		//     // Add new account to accounts array
		//     this.accounts.push({
		// 		id: nextId,
		// 		label: this.label,
		// 		balance: 0,
		// 		address: this.address
		//     });

		//     // Reset inputs
		//     this.label = '';
		//     this.address = '';
		// };

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

/*global angular */
/* =========================================
   Wallet directive
   ========================================= */

(function() {

	var app = angular.module('account-directives', [])
	.directive('editAccountModal', function () {

	    return {
	    	scope: true,
	        restrict: 'E',
	        template:
	        	'<section ng-show="dash.modal_edit_account" class="modal ng-modal-dialog"> ' +

					'<div ng-click="dash.closeModal()" class="close_modal icon-cancel-1"></div> ' +

					'<h1>Edit Watch Account</h1> ' +
					'<form id="update_acct_form" ng-submit="dash.updateAccount(dash.acct_id)" novalidate>' +
						'<div class="modal_form" data-id="{{dash.acct_id}}"> ' +
							'<div class="label_input_combo"> ' +
								'<label for="to_input">Account Name</label> ' +
								'<input id="to_input" ' +
										'ng-model="dash.new_label" ' +
										'class="form-input" ' +
										'type="text" ' +
										'placeholder="{{dash.acct_label}}"> ' +
							'</div> ' +

							'<div class="label_input_combo"> ' +
								'<label for="amount_input" class="label_amount">Public Address</label> ' +
								'<input id="amount_input" ' +
										'ng-model="dash.new_address" ' +
										'class="public_addy_input form-input" ' +
										'type="text" ' +
										'placeholder="{{dash.acct_address}}"> ' +
							'</div> ' +

							'<button type="submit" ' +
									'class="btn btn_med btn_send_now"> ' +
									'{{dash.save_btn_text}} ' +
							'</button> ' +

							'<button ng-click="dash.removeAccount(dash.acct_id)" ' +
									'class="btn btn_med btn_remove"> ' +
									'Remove' +
							'</button> ' +
						'</div> ' +
					'</form>' +

				'</section>'
	    };
	});

})();

/*global angular*/
/* =========================================
--------------------------------------------

	BITAGE.io Dashboard views app
	"Keep watch over your Bitcoins"
	(Leon Gaban @leongaban | Paulo Rocha @paulinhorocha)

--------------------------------------------
============================================ */

(function() { "use strict";

	var app = angular.module('bitAge',
		['ui.router',
		 'app-wallet',
		 'wallet-directives',
		 'notification-directives',
		 'app-accounts',
		 'app-settings',
		 'app-help'])

	.config([
		'$stateProvider',
		'$urlRouterProvider',
		function($stateProvider, $urlRouterProvider) {

			$stateProvider

				.state('wallet', {
					url: '/wallet',
					templateUrl: 'views/wallet.html'
				})

				.state('accounts', {
					url: '/accounts',
					templateUrl: 'views/accounts.html'
				})

				.state('settings', {
					url: '/settings',
					templateUrl: 'views/settings.html'
				})

				.state('help', {
					url: '/help',
					templateUrl: 'views/help.html'
				});

			$urlRouterProvider.otherwise('wallet');
	}])

	.controller('DashCtrl',
		['$scope', '$state',
		function($scope, $state) {

		var vm = this;
			vm.num;

		vm.qr_code = 'http://placehold.it/200&text=Loading+QR+Code';

		var quotes = [
			{
				quote: "Bitcoin is a protocol, not a currency. Currency is just the first app.",
				author: "Andreas Antonopoulos"
			},
			{
				quote: "The most interesting disruption comes when a problem is not solved but rather made irrelevant.",
				author: "Andreas Antonopoulos"
			},
			{
				quote: "Bitcoin gives us the ability to transmit value globally, instantly, securely, and is far more valuable than email.",
				author: "Andreas Antonopoulos"
			},
			{
				quote: "Money won't create success, the freedom to make it will.",
				author: "Nelson Mandela"
			},
			{
				quote: "Too many people spend money they earned..to buy things they don't want..to impress people that they don't like.",
				author: "Will Rogers"
			},
			{
				quote: "Wealth consists not in having great possessions, but in having few wants.",
				author: "Epictetus"
			},
			{
				quote: "Frugality includes all the other virtues",
				author: "Cicero"
			},
			{
				quote: "An investment in knowledge pays the best interest.",
				author: "Benjamin Franklin"
			},
			{
				quote: "Money is a terrible master but an excellent servant.",
				author: "P.T. Barnum"
			},
			{
				quote: "I'm a great believer in luck, and I find the harder I work the more I have of it.",
				author: "Thomas Jefferson"
			},
			{
				quote: "A journey of a thousand miles must begin with a single step.",
				author: "Lao Tzu"
			},
			{
				quote: "No wealth can ever make a bad man at peace with himself.",
				author: "Plato"
			},
			{
				quote: "It takes as much energy to wish as it does to plan.",
				author: "Eleanor Roosevelt"
			},
			{
				quote: "Not everything that can be counted counts, and not everything that counts can be counted.",
				author: "Albert Einstein"
			},
			{
				quote: "Because bitcoin is a protocol for transmitting value. It will be bigger than Internet and will accelerate Internet.",
				author: "Andreas Antonopoulos"
			},
			{
				quote: "First you're curious and jealous of people having it, then you have it, and then you want more. Bitcoin is just like sex.",
				author: "Andreas Antonopoulos"
			},
			{
				quote: "It's money 2.0, a huge huge huge deal.",
				author: "Chamath Palihapitiya"
			},
			{
				quote: "In Spanish, we have a saying that when a genius points at the moon, a fool looks at the finger. I find that happens a lot with bitcoin.",
				author: "Wences Casares, CEO of Xapo"
			},
			{
				quote: "Bitcoin is a remarkable cryptographic achievement and the ability to create something that is not duplicable in the digital world has enormous value",
				author: "Eric Schmidt, CEO of Google"
			},
			{
				quote: "I really like Bitcoin. I own Bitcoins. It’s a store of value, a distributed ledger. It’s a great place to put assets",
				author: "David Marcus, CEO of Paypal"
			},
			{
				quote: "A portion of what you make, is yours to keep",
				author: "Book - The Richest Man in Babylon"
			}
		];

		function getRandomNum(min, max) {
		    return Math.floor(Math.random() * (max - min + 1)) + min;
		}

		vm.num = getRandomNum(0, 20);

		vm.showQuote = function(i) {
			return quotes[i]["quote"];
		}

		vm.showAuthor = function(i) {
			return quotes[i]["author"];
		}

		// Sidebar tab select:
		vm.$state = $state;
		vm.sidebarClick = function() {
			return $state.includes($state.current.name);
		};

		// Avatar Menu open/close:
		vm.avatarMenuBool = false;
		vm.clickAvatar = function(val, $event) {
			$event.stopPropagation();
			vm.avatarMenuBool = !vm.avatarMenuBool;
		};

		// Detect click on body & close menu
		vm.closeMenu = function () {
			vm.avatarMenuBool = false;
		};

		// Stop the event from bubbling up any further
		vm.menuClick = function ($event) {
			$event.stopPropagation();
		};

		// Close all modals in the DashCtrl scope
		vm.closeModal = function() {
			vm.modal_edit_account = false;
			vm.modal_receive = false;
			vm.modal_send = false;
			vm.modal = false;
		};

	}]);

})();

/*global angular */
/* =========================================
   Settings module
   ========================================= */

(function() {

	var app = angular.module('app-settings', ['ngAnimate', 'flow'])
	.controller('SettingsCtrl',
		['$scope', '$timeout', 'settingsService',
		function($scope, $timeout, settingsService) {

		// Angular File upload:
		//http://flowjs.github.io/ng-flow/
		//https://github.com/flowjs/ng-flow

		var vm = $scope;

		var timeoutMsg = function() {
 			vm.dash.notification = false;
 		};

		vm.dash.closeMsg = function() {
			vm.dash.notification = false;
		};

		this.saveProfile = function(isValid) {

			// check to make sure form is valid
            if (isValid) {
                settingsService.postProfile(
                	this.formData,
					vm.dash,
					$timeout,
					timeoutMsg
				);
            } else {
            	// alert('Please check the form!');
             //   	swal({
                //    title: "Oops!",
                //    text: "Please check the form!",
                //    type: "error",
                //    confirmButtonText: "Ok",
                //    confirmButtonColor: "#024562" });
            }

		};
	}])

	.service('settingsService', [function() {

	    // send updated profile to server
		this.postProfile = function (fdata, dash, $timeout, timeoutMsg) {

			if (fdata !== undefined) {
				console.log(fdata);
				dash.message = 'Profile updated!';
				dash.notification_type = 'success';
			} else if (fdata === undefined) {
				dash.message = 'Please check the form!';
				dash.notification_type = 'error';
			}

			// Show notification
			dash.notification = true;
			$timeout(timeoutMsg, 4000);
		};
	}]);

})();

/*global angular */
/* =========================================
   HELP Module
   ========================================= */

(function() {

	var app = angular.module('app-help', ['notification-directives'])

	.controller('HelpCtrl',
	['$scope', '$http', '$timeout', 'helpService',
	function($scope, $http, $timeout, helpService) {

		var vm = $scope;

		var timeoutMsg = function() {
 			vm.dash.notification = false;
 		};

		vm.dash.closeMsg = function() {
			vm.dash.notification = false;
		};

		// setup e-mail data with unicode symbols
		// send user name, email and public address
		var helpMessage = {
		    from: 'Fred Foo ✔ <foo@blurdybloop.com>', // sender address
		    to: 'leon@bitage.io', // list of receivers
		    subject: 'Bitage Help Request! ✔', // Subject line
		    text: 'Hello world ✔', // plaintext body
		    html: '<b>Hello world ✔</b>' // html body
		};

		// Quick form submit
		this.submitHelpForm = function(isValid) {

			// check to make sure form is valid
			if (isValid) {

				var data = this.formData;
				// Post form in helpService
				helpService.postHelpForm($http, data, vm.dash, $timeout, timeoutMsg);

			} else {

				// Show error notification - sweet alert
				alert('Please correct the form');
			}

		};

	}])

	.service('helpService', [function() {

		this.postHelpForm = function($http, data, dash, $timeout, timeoutMsg) {

			// process the form
			var request = $http({
					method  : 'POST',
					url     : '/help',
					// data    : $.param(vm.formData),
					data    : data.message,
					headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
				})
				.success(function() {
					// Show notification
					dash.message = 'Message sent! We will get back to you soon.';
					dash.notification_type = 'success';
					dash.notification = true;
					$timeout(timeoutMsg, 4000);
				});
		};

	}]);

})();

/*global angular */
/* =========================================
   WALLET Module
   ========================================= */

(function() {

	var app = angular.module('app-wallet',
		['wallet-directives',
		 'notification-directives'])

	.controller('WalletCtrl',
		['$scope', '$sce', '$timeout', 'walletModalService',
		function($scope, $sce, $timeout, walletModalService) {

		var vm 			     = $scope,
			public_address   = '';
			vm.dash.currency = 'USD';
			vm.dash.modal 	 = false;

		var timeoutMsg = function() {
 			vm.dash.notification = false;
 		};

		vm.dash.closeMsg = function() {
			vm.dash.notification = false;
		};

		// Express response listener here for incoming transaction:

		// Open Receive or Send modals:
		this.openModal = function(m) {
			// console.log(m);

			// Show overlay:
			vm.dash.modal = m;

			switch (m) {
				case 'receive':
					// API call to get user public address
					// Code to generate QR code
					// Update receive_obj
					walletModalService.modalRecieve(vm.dash);
					break;

				case 'send':
					// API call to check address
					// Calculate Bitcoin / USD
					// Complete transaction
					walletModalService.modalSend(vm.dash, $timeout, timeoutMsg);
					break;
			}
		};

		// Transaction models
		this.transactions = [
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
	}])

	.service('walletModalService', [function() {

		// wire modal recieve
	    this.modalRecieve = function(dash) {
	        dash.modal_receive  = true;
			dash.public_address = '17dPAMzZiosQYVty6ES4KSWN8R8XFcxShH';
			dash.qr_code 	    = 'assets/img/qrcode.png';
	    };

	    // wire modal send
	    this.modalSend = function(dash, $timeout, timeoutMsg) {
	    	dash.modal_send = true;
			dash.send_btn_text = 'Send';

			// btn_usd in walletDirective html
			dash.switchCurrency = function() {
				if (dash.currency === 'USD') {
					dash.currency = 'BTC';
				} else if (dash.currency = 'BTC') {
					dash.currency = 'USD';
				}
			};

			dash.sendTransaction = function() {

				// Make API call to check address
				dash.send_btn_text = 'Sending...';

				// Get response back and close modal
				dash.modal_send = false;
				dash.modal = false;

				// Show notification
				dash.message = 'Transaction sent!';

				// success or error
				dash.notification_type = 'success';

				// show notifcation and settimeout
				dash.notification = true;
				$timeout(timeoutMsg, 4000);
			};
	    }
	}]);

})();

/*global angular */
/* =========================================
   WALLET Directive
   ========================================= */

(function() {

	var app = angular.module('wallet-directives', [])
	.directive('receiveModal', function () {

	    return {
	        restrict: 'E',
	        template: 
	        	'<section ng-show="dash.modal_receive" class="modal ng-modal-dialog"> ' + 

					'<div ng-click="dash.closeModal()" class="close_modal icon-cancel-1"></div> ' + 

					'<h1>Your Public Address</h1> ' + 

					'<div class="modal_qr"> ' + 
						'<img src="{{dash.qr_code}}"/> ' + 
					'</div> ' + 

					'<p class="public_address">{{dash.public_address}}</p> ' + 
				'</section>'
	    };
	})

	.directive('sendModal', function () {

	    return {
	    	scope: true,
	        restrict: 'E',
	        template: 
	        	'<section ng-show="dash.modal_send" class="modal ng-modal-dialog"> ' + 

					'<div ng-click="dash.closeModal()" class="close_modal icon-cancel-1"></div> ' + 

					'<h1>Send Bitcoin</h1> ' + 

					'<div class="modal_form"> ' + 
						'<div class="label_input_combo"> ' + 
							'<label for="to_input">Send to address</label> ' + 
							'<input id="to_input" class="form-input" type="text" placeholder=""> ' + 
						'</div> ' + 

						'<div class="label_input_combo"> ' + 
							'<div ng-click="dash.switchCurrency()" class="btn_usd noselect">{{dash.currency}}</div> ' + 
							'<label for="amount_input" class="label_amount">Amount</label> ' + 
							'<input id="amount_input" class="form-input" type="text" placeholder=""> ' + 
						'</div> ' + 
						
						'<button ng-click="dash.sendTransaction()" class="btn btn_med btn_send_now">{{dash.send_btn_text}}</button> ' + 
					'</div> ' + 

				'</section>'
	    };
	});

})();