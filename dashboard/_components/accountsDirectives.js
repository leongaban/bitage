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
					'<form id="update_acct_form" ng-submit="dash.updateAccount(dash.acct_id)" ' +
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