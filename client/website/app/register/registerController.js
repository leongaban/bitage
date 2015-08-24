/*global angular */
/* =========================================
   REGISTER Module
   ========================================= */

(function() {

    var app = angular.module('app-register', [])
    .controller('RegisterCtrl',
        ['$http',
         'authService',
        function($http,
                 authService) {

        // Init RegisterCtrl scope:
        // ------------------------
        var vm = this;

        // Sign up form submit
        vm.submitForm = function(isValid) {

            // check to make sure form is valid
            if (isValid) {
                authService.postSignUpForm(vm.formData);
            } else {
                swal({
                   title: "Oops!",
                   text: "Please check the form!",
                   type: "error",
                   confirmButtonText: "Ok",
                   confirmButtonColor: "#024562" });
            }

        };

    }]);

})();