/*global angular */
/* =========================================
   REGISTER Module
   ========================================= */

(function() {

<<<<<<< HEAD
  var app = angular.module('app-register', [])
  .controller('RegisterCtrl', ['$scope','$http','$location', function($scope, $http, $location) {

      var vm = $scope;
      var local = $location;
    // Quick form submit          
        vm.$parent.submitRegisterForm = function(isValid) {

            // check to make sure form is valid
            if (isValid) {

                
                // process the form

                var request = $http({
                        method  : 'POST',
                        url     : '/signup',
                        data    : $.param(vm.formData),  // pass in data as strings
                        headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
                    })
                    .success(function() {
                      var locationHost = local.host();
                      console.log(locationHost + '/dashboard');

                     
                    });

=======
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
>>>>>>> 78d283a0651fe6eb786318c4cae6e0160a781b50
            } else {
                alert('Please correct the form');
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