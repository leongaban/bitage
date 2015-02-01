/*global angular */
/* =========================================
   REGISTER Module
   ========================================= */

(function() {

  var app = angular.module('app-register', [])
  .controller('RegisterCtrl', ['$scope', '$http', function($scope, $http) {

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
                        data    : newUser,  // pass in data as strings
                        headers : { 'Content-Type': 'application/x-www-form-urlencoded' }  // set the headers so angular passing info as form data (not request payload)
                    })
                    .success(function(data) {
                        console.log('data:' + data);

                        if (!data.success) {
                            console.log('there was no data');
                          // if not successful, bind errors to error variables
                          // vm.$parent.errorName = data.errors.name;
                          // vm.$parent.errorSuperhero = data.errors.superheroAlias;
                        } else {
                            console.log('success! time to login...');
                          // if successful, bind success message to message
                          // vm.$parent.message = data.message;
                        }

                    });

            } else {
              alert('Please correct the form')
            }

        };

  }]);

})();