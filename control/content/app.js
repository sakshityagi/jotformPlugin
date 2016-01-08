'use strict';

(function (angular) {
  angular.module('jotFormPluginContent', ['ui.bootstrap'])
    .controller('ContentHomeCtrl', ['Utils', function (Utils) {
      var ContentHome = this;
      ContentHome.validateUrl = function () {
        var result = Utils.validateUrl(ContentHome.content.url);
        console.log("?????????????????", result);
      };
    }]);
})(window.angular);
