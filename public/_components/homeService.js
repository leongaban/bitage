/*global angular */
/* =========================================
   Home Service
   ========================================= */

(function() {

	var app = angular.module('homeService')
    .service('homeService', ['$http', function($http) {

        // this.postSignUpForm = function(fdata) {
        //     console.log(fdata);
            
        //     // process the form
        //     var request = $http({
        //             method  : 'POST',
        //             url     : '/signup',
        //             data    : $.param(fdata),
        //             headers : { 'Content-Type': 'application/x-www-form-urlencoded' }
        //         })
        //         .success(function() {
                 
        //         });
        // };

    }]);

})();