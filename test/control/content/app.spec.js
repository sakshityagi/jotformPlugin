describe('Unit: jotFormPluginContent content app', function () {
  describe('Unit: app routes', function () {
    beforeEach(module('jotFormPluginContent'));
    var location, route, rootScope;
    beforeEach(inject(function () {

    }));
    var ContentHome, scope, $rootScope, $controller, Buildfire, ActionItems, TAG_NAMES, STATUS_CODE, LAYOUTS, STATUS_MESSAGES, CONTENT_TYPE, q, Utils;

    beforeEach(inject(function (_Utils_, _$rootScope_, _$q_, _$controller_, _TAG_NAMES_, _STATUS_CODE_, _STATUS_MESSAGES_) {
      $rootScope = _$rootScope_;
      q = _$q_;
      scope = $rootScope.$new();
      $controller = _$controller_;
      TAG_NAMES = _TAG_NAMES_;
      STATUS_CODE = _STATUS_CODE_;
      STATUS_MESSAGES = _STATUS_MESSAGES_;
      Utils = _Utils_;
      Buildfire = {
        components: {
          carousel: {
            editor: function (name) {
              return {}
            },
            viewer: function (name) {
              return {}
            }
          }

        },     spinner: {
          hide: function () {
            return {}
          },
          show: function () {
            return {}
          }

        }
      };

      ActionItems = jasmine.createSpyObj('ActionItems', ['showDialog']);
    }));

    beforeEach(function () {
      ContentHome = $controller('ContentHomeCtrl', {
        $scope: scope,
        $q: q,
        Buildfire: Buildfire,
        TAG_NAMES: TAG_NAMES,
        ActionItems: ActionItems,
        STATUS_CODE: STATUS_CODE,
        CONTENT_TYPE: CONTENT_TYPE,
        LAYOUTS: LAYOUTS,
        Utils:Utils
      });
    });
    describe('It will test the defined methods', function () {
      it('it should pass if ContentHome is defined', function () {
        expect(ContentHome).not.toBeUndefined();
      });
      it('it should pass if clearData is called', function () {
        ContentHome.clearData();
      });

      it('it should pass if ContentHome.validateUrl is called', function () {
        ContentHome.data = {
          content:{
            url:"hhhh"
          }
        }
        ContentHome.validateUrl();
        var result  = true;
        ContentHome.success(result);
      });

      it('it should pass if ContentHome.init is called', function () {

        ContentHome.init();
        var result  = true;

       // ContentHome.success(result)
        ContentHome.error(null)
      });

      it('it should pass if ContentHome.init is called', function () {

        ContentHome.init();
        var result  = true;

        // ContentHome.success(result)
      });
    });

  });
});