describe('Unit: jotFormPluginWidget app', function () {
  describe('Unit: app', function () {
    beforeEach(module('jotFormPluginWidget'));
    var location, route, rootScope;
    beforeEach(inject(function () {

    }));
    var WidgetHome, scope, $rootScope, $controller, Buildfire, ActionItems, TAG_NAMES, STATUS_CODE, LAYOUTS, STATUS_MESSAGES, CONTENT_TYPE, q, Utils;

    beforeEach(inject(function (_$rootScope_, _$q_, _$controller_, _TAG_NAMES_, _STATUS_CODE_, _STATUS_MESSAGES_) {
      $rootScope = _$rootScope_;
      q = _$q_;
      scope = $rootScope.$new();
      $controller = _$controller_;
      TAG_NAMES = _TAG_NAMES_;
      STATUS_CODE = _STATUS_CODE_;
      STATUS_MESSAGES = _STATUS_MESSAGES_;
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
      inject(function (_$filter_) {
        $filter = _$filter_;
      });

    }));

    beforeEach(function () {
      WidgetHome = $controller('WidgetHomeCtrl', {
        $scope: scope,
        $q: q,
        Buildfire: Buildfire,
        TAG_NAMES: TAG_NAMES,
        ActionItems: ActionItems,
        STATUS_CODE: STATUS_CODE,
        CONTENT_TYPE: CONTENT_TYPE,
        LAYOUTS: LAYOUTS,
      });
    });
    describe('It will test the defined methods', function () {

      it('it should pass if WidgetHome.init is called for error', function () {
        var result= {};
        WidgetHome.init();
    //    WidgetHome.success()
      });
      it('it should pass if WidgetHome.init is called for error', function () {
        WidgetHome.init();
        WidgetHome.error()
      });

      it('it should pass if  WidgetHome.onUpdateCallback is called for error', function () {
        var event = {
          tag:TAG_NAMES.JOT_FORM_DATA
        }
        WidgetHome.data= {
          design:""
        }
              WidgetHome.onUpdateCallback(event)
      });

    });
    describe('Test the filter', function () {


      it('should return the updated Url with filter returnUrl', function () {
        // Arrange.
        var url = 'https://form.jotform.com/60068237709257', result;
        var updatedUrl = 'https://form.jotform.com/60068237709257';
        // Act.
        result = $filter('returnUrl')(url);});

    });
  });
});