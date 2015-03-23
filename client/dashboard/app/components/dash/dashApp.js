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
		// ['ui.router'])

		['ui.router',
		 'notification-directives',
		 'account-directives',
		 'app-accounts',
		 'app-wallet-controller',
		 'app-wallet-directives',
		 'app-wallet-modal-service',
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