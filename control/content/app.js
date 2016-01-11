'use strict';

(function (angular, window) {
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
      ContentHome.init = function () {
        ContentHome.success = function (result) {
          console.info('init success result:', result);
          if (result) {
            ContentHome.data = result.data;
            if (!ContentHome.data.content)
              ContentHome.data.content = {};
            ContentHome.JotUrl = ContentHome.data.content.url;
          }
        };
        ContentHome.error = function (err) {
          if (err && err.code !== STATUS_CODE.NOT_FOUND) {
            console.error('Error while getting data', err);
          }
          else if (err && err.code === STATUS_CODE.NOT_FOUND) {
            ContentHome.saveData(JSON.parse(angular.toJson(ContentHome.data)), TAG_NAMES.JOT_FORM_DATA);
          }
        };
        DataStore.get(TAG_NAMES.JOT_FORM_DATA).then(ContentHome.success, ContentHome.error);
      };
      ContentHome.init();


      ContentHome.validateUrl = function () {
        //  var result =
        ContentHome.success = function (result) {
          console.log("?????????", result);
          if (result) {
            ContentHome.isUrlValidated = true;
            ContentHome.data.content.url = ContentHome.JotUrl;
            ContentHome.saveData(JSON.parse(angular.toJson(ContentHome.data)), TAG_NAMES.JOT_FORM_DATA);
          }
        };
        ContentHome.error = function (err) {
          ContentHome.isUrlValidated = false;
          console.log("?????????error", err)
        };
        $timeout(function () {
          ContentHome.isUrlValidated = null;
        }, 3000);
        Utils.validateUrl(ContentHome.JotUrl).then(ContentHome.success, ContentHome.error);
      };

      ContentHome.saveData = function (newObj, tag) {
        if (typeof newObj === 'undefined') {
          return;
        }
        ContentHome.success = function (result) {
          console.info('Saved data result: ', result);
          // updateMasterItem(newObj);
        };
        ContentHome.error = function (err) {
          console.error('Error while saving data : ', err);
        };
        DataStore.save(newObj, tag).then(ContentHome.success, ContentHome.error);
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

      ContentHome.gotToPage = function () {
        window.open('http://www.jotform.com/', '_blank');
      };

      ContentHome.gotToSite = function () {
        window.open('http://www.jotform.com/help/322-How-To-Make-Mobile-Friendly-Forms-on-JotForm', '_blank');
      };

    }]);
})(window.angular, window);
