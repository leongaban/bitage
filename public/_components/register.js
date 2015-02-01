/*global angular */
/* =========================================
   REGISTER Module
   ========================================= */

(function() {

  var app = angular.module('app-register', [])
  .controller('RegisterCtrl', ['$scope','$http', '$location', function($scope, $http, $location) {

    var vm = $scope;
    var location = $location;

    // Sign up form submit          
    vm.$parent.submitRegisterForm = function(isValid) {

        // check to make sure form is valid
        if (isValid) {

            // process the form
            var request = $http({
                    method  : 'POST',
                    url     : '/signup',
                    data    : $.param(vm.formData),
                    headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
                })
                .success(function() {
                 
                });

        } else {
            alert('Please correct the form');
        }

    };

  }]);

})();