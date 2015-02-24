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