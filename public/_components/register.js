/*global angular */
/* =========================================
   REGISTER Module
   ========================================= */

(function() {

  var app = angular.module('app-register', [])
  .controller('RegisterCtrl', ['$scope','$http', function($scope, $http) {

      var vm = $scope;

    // Quick form submit          
        vm.$parent.submitRegisterForm = function(isValid) {

            // vm.$parent.formData = {};
            var newUser = 'test';
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
                     
                    });

            } else {
              alert('Please correct the form')
            }

        };

  }]);

})();