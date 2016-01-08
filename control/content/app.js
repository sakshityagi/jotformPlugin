'use strict';

(function (angular) {
  angular.module('jotFormPluginContent', ['ui.bootstrap'])
    .controller('ContentHomeCtrl', ['Utils', 'DataStore', 'TAG_NAMES', 'STATUS_CODE', '$timeout', function (Utils, DataStore, TAG_NAMES, STATUS_CODE, $timeout) {
      var ContentHome = this;
      ContentHome.data = {
        content: {
          url: null
        }
      };
      ContentHome.isUrlValidated = null;
      ContentHome.JotUrl = null;
      /*Init method call, it will bring all the pre saved data*/
      var init = function () {
        var success = function (result) {
            console.info('init success result:', result);
            if (result) {
              ContentHome.data = result.data;
              if (!ContentHome.data.content)
                ContentHome.data.content = {};
              ContentHome.JotUrl = ContentHome.data.content.url;
            }
          }
          , error = function (err) {
            if (err && err.code !== STATUS_CODE.NOT_FOUND) {
              console.error('Error while getting data', err);
            }
            else if (err && err.code === STATUS_CODE.NOT_FOUND) {
              saveData(JSON.parse(angular.toJson(ContentHome.data)), TAG_NAMES.JOT_FORM_DATA);
            }
          };
        DataStore.get(TAG_NAMES.JOT_FORM_DATA).then(success, error);
      };
      init();


      ContentHome.validateUrl = function () {
        //  var result =
        var success = function (result) {
            console.log("?????????", result);
            if (result) {
              ContentHome.isUrlValidated = true;
              ContentHome.data.content.url = ContentHome.JotUrl;
              ContentHome.saveData(JSON.parse(angular.toJson(ContentHome.data)), TAG_NAMES.JOT_FORM_DATA);
            }
          },
          error = function (err) {
            ContentHome.isUrlValidated = false;
            console.log("?????????error", err)
          };
        $timeout(function () {
          ContentHome.isUrlValidated = null;
        }, 3000);
        Utils.validateUrl(ContentHome.JotUrl).then(success, error);
      };

      ContentHome.saveData = function (newObj, tag) {
        if (typeof newObj === 'undefined') {
          return;
        }
        var success = function (result) {
            console.info('Saved data result: ', result);
            // updateMasterItem(newObj);
          }
          , error = function (err) {
            console.error('Error while saving data : ', err);
          };
        DataStore.save(newObj, tag).then(success, error);
      };

      /*
       * Method to clear JotForm feed url
       * */
      ContentHome.clearData = function () {
        if (!ContentHome.JotUrl) {
          ContentHome.data.content.url = null;
          ContentHome.saveData(ContentHome.data.content, TAG_NAMES.JOT_FORM_DATA)
        }
      };
    }]);
})(window.angular);
