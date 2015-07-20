'use strict';

// Re-usable $splash module
// http://popdevelop.com/2014/07/sexy-splash-modal-using-bootstrap-css3-and-angularjs/
angular.module('ui.splash', ['ui.bootstrap'])
    .service('$splash', [
      '$modal',
      '$rootScope',
      function($modal, $rootScope) {
        return {
          open: function (attrs, opts) {
            var scope = $rootScope.$new();
            angular.extend(scope, attrs);
            opts = angular.extend(opts || {}, {
              backdrop: false,
              scope: scope,
              templateUrl: 'modules/tracks/views/view-track.client.view.html',
              windowTemplateUrl: 'splash/index.html'
            });
            return $modal.open(opts);
          }
        };
      }
    ])
    .run([
      '$templateCache',
      function ($templateCache) {
        $templateCache.put('splash/index.html',
            '<section class="splash" ng-class="{\'splash-open\': animate}" ng-style="{\'z-index\': 1000, display: \'block\'}" ng-click="close($event)">' +
            '  <div class="splash-inner" ng-transclude></div>' +
            '</section>'
        );
        //$templateCache.put('splash/content.html',
        //    '<div class="splash-content text-center">' +
        //    '  <h1 ng-bind="title"></h1>' +
        //    '  <p class="lead" ng-bind="message"></p>' +
        //    '  <button class="btn btn-lg btn-outline" ng-bind="btnText || \'Ok, cool\'" ng-click="$close()"></button>' +
        //    '</div>'
        //);
      }
    ]);
