/*global angular */
/* =========================================
   REGISTER Module
   ========================================= */

(function() {

    var app = angular.module('app-register', [])
    .controller('RegisterCtrl',
        ['$http', '$location', 'registerService',
        function($http, $location, registerService) {

        var vm = this;
        var location = $location;

        // Sign up form submit          
        vm.submitForm = function(isValid) {

            // check to make sure form is valid
            if (isValid) {
                console.log('Creating user:');
                registerService.postSignUpForm(vm.formData);
            } else {
               swal({   title: "Ops!",   text: "Please check the form!",   type: "error",   confirmButtonText: "Ok", confirmButtonColor: "#024562" });
            }

        };

    }])

    .service('registerService', ['$http', function($http) {

        this.postSignUpForm = function(fdata) {
            console.log(fdata);
            
            var request = $http({
                    method  : 'POST',
                    url     : '/signup',
                    data    : $.param(fdata),
                    headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
                })
                .success(function() {
                 
                });
        };
    }]);

})();