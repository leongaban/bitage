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
					templateUrl: '_views/wallet.html'
				})

				.state('accounts', {
					url: '/accounts',
					templateUrl: '_views/accounts.html'
				})

				.state('settings', {
					url: '/settings',
					templateUrl: '_views/settings.html'
				})

				.state('help', {
					url: '/help',
					templateUrl: '_views/help.html',
					controller: 'HelpCtrl'
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
			}
		];

		function getRandomNum(min, max) {
		    return Math.floor(Math.random() * (max - min + 1)) + min;
		}

		vm.num = getRandomNum(0, 10);

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
