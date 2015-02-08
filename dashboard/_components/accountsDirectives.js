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

					'<div class="send_form"> ' + 
						'<div class="label_input_combo"> ' + 
							'<label for="to_input">Account Name</label> ' + 
							'<input id="to_input" class="form-input" type="text" placeholder="Bitage"> ' + 
						'</div> ' + 

						'<div class="label_input_combo"> ' + 
							'<label for="amount_input" class="label_amount">Public Address</label> ' + 
							'<input id="amount_input" class="public_addy_input form-input" type="text" placeholder="16mCDhpziD6kBwPNnh1gSEHhdGFjAYYZdq"> ' + 
						'</div> ' + 
						
						'<button ng-click="updateWatchAccount()" class="btn btn_med btn_send_now">{{dash.save_btn_text}}</button> ' + 
					'</div> ' + 

				'</section>'
	    };
	});

})();