'use strict';

(function (angular) {
  angular.module('jotFormPluginContent', ['ui.bootstrap'])
    .controller('ContentHomeCtrl', ['Utils', function (Utils) {
      var ContentHome = this;
      ContentHome.validateUrl = function () {
      //  var result =
        var success = function(result){
          var result = result
              console.log("?????????",result)
            },
            error = function(err){
              console.log("?????????error",err)
            }
           Utils.validateUrl(ContentHome.content.url).then(success, error);
       };
    }]);
})(window.angular);
