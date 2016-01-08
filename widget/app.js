'use strict';

(function (angular) {
  angular.module('jotFormPluginWidget', ['ui.bootstrap'])
    .controller('WidgetHomeCtrl', ['$scope', 'Buildfire', 'DataStore', 'TAG_NAMES', 'STATUS_CODE',
      function ($scope, Buildfire, DataStore, TAG_NAMES, STATUS_CODE) {
        var WidgetHome = this;

        /*
         * Fetch user's data from datastore
         */
        var init = function () {
          var success = function (result) {
              console.log(">>>>>", result);
              WidgetHome.data = result.data;
              if (!WidgetHome.data.content)
                WidgetHome.data.content = {};
            }
            , error = function (err) {
              if (err && err.code !== STATUS_CODE.NOT_FOUND) {
                console.error('Error while getting data', err);
              }
            };
          DataStore.get(TAG_NAMES.JOT_FORM_DATA).then(success, error);
        };

        var onUpdateCallback = function (event) {
          if (event && event.tag === TAG_NAMES.JOT_FORM_DATA) {
            WidgetHome.data = event.data;
            if (!WidgetHome.data.design)
              WidgetHome.data.design = {};
            if (!WidgetHome.data.content)
              WidgetHome.data.content = {};
          }
        };
        
        DataStore.onUpdate().then(null, null, onUpdateCallback);

        init();

      }]);
})(window.angular);
