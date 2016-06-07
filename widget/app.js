'use strict';

(function (angular,document) {
  angular.module('jotFormPluginWidget', ['ui.bootstrap'])
    .controller('WidgetHomeCtrl', ['$scope', 'Buildfire', 'DataStore', 'TAG_NAMES', 'STATUS_CODE',
      function ($scope, Buildfire, DataStore, TAG_NAMES, STATUS_CODE) {
        var WidgetHome = this;

        /*
         * Fetch user's data from datastore
         */
        WidgetHome.init = function () {
          WidgetHome.success = function (result) {
            if (result.data && result.id) {
              WidgetHome.data = result.data;
              if (!WidgetHome.data.content)
                WidgetHome.data.content = {};
            } else {
              WidgetHome.data = {
                content: {}
              };
              var dummyData = {url: "https://form.jotform.me/60070086181448"};
              WidgetHome.data.content.url = dummyData.url;
            }
          };
          WidgetHome.error = function (err) {
            if (err && err.code !== STATUS_CODE.NOT_FOUND) {
              console.error('Error while getting data', err);
            }
          };
          DataStore.get(TAG_NAMES.JOT_FORM_DATA).then(WidgetHome.success, WidgetHome.error);
        };

        //Refresh web page on pulling the tile bar

        buildfire.datastore.onRefresh(function () {
          var iFrame = document.getElementById("formFrame");
          console.log(iFrame);
          iFrame.src = iFrame.src;
        });

        WidgetHome.onUpdateCallback = function (event) {
          if (event && event.tag === TAG_NAMES.JOT_FORM_DATA) {
            WidgetHome.data = event.data;
            if (WidgetHome.data && !WidgetHome.data.design)
              WidgetHome.data.design = {};
            if (WidgetHome.data && !WidgetHome.data.content)
              WidgetHome.data.content = {};
          }
        };

        DataStore.onUpdate().then(null, null, WidgetHome.onUpdateCallback);

        WidgetHome.init();

      }])
    .filter('returnUrl', ['$sce', function ($sce) {
      return function (url) {
        return $sce.trustAsResourceUrl(url);
      }
    }]);
})(window.angular, window.document);
