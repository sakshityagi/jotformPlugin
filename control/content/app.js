'use strict';

(function (angular) {
  angular.module('jotFormPluginContent', ['ui.bootstrap'])
    .controller('ContentHomeCtrl', ['Utils', 'DataStore', 'TAG_NAMES', 'STATUS_CODE', function (Utils, DataStore, TAG_NAMES, STATUS_CODE) {
      var ContentHome = this;
          ContentHome.content={
                  url:""
              };
          ContentHome.JotUrl = null;
          /*Init method call, it will bring all the pre saved data*/
          var init = function () {
              var success = function (result) {
                      console.info('init success result:', result);
                      if (result) {
                          ContentHome.content = result.data;
                          ContentHome.JotUrl = ContentHome.content.url;
                      }
                  }
                  , error = function (err) {
                      if (err && err.code !== STATUS_CODE.NOT_FOUND) {
                          console.error('Error while getting data', err);
                      }
                      else if (err && err.code === STATUS_CODE.NOT_FOUND) {
                          saveData(JSON.parse(angular.toJson(ContentHome.content)), TAG_NAMES.JOT_FORM_DATA);
                      }
                  };
              DataStore.get(TAG_NAMES.JOT_FORM_DATA).then(success, error);
          };
          init();



      ContentHome.validateUrl = function () {
      //  var result =
        var success = function(result){
          var result = result
              console.log("?????????",result)
                if(result) {
                    ContentHome.content.url = ContentHome.JotUrl;
                    ContentHome.saveData(JSON.parse(angular.toJson(ContentHome.content)), TAG_NAMES.JOT_FORM_DATA);
                }
            },
            error = function(err){
              console.log("?????????error",err)
            }
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
                  ContentHome.content.url = null;
                  ContentHome.saveData(ContentHome.content,TAG_NAMES.JOT_FORM_DATA )
              }
          };
    }]);
})(window.angular);
