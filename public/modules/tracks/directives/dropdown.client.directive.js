'use strict';

angular.module('tracks').directive('dropdown', [
  function () {
    return {
      restrict: 'E',
      require: '^ngModel',
      scope: {
        ngModel: '=', // selection
        items: '=',   // items to select from
        callback: '&' // callback
      },
      link: function (scope, element, attrs) {
        element.on('click', function (event) {
          event.preventDefault();
        });

        scope.default = 'Choose genre';
        scope.isButton = 'isButton' in attrs;

        // selection changed handler
        scope.select = function (item) {
          scope.ngModel = item;
          if (scope.callback) {
            scope.callback({item: item});
          }
        };
      },
      templateUrl: 'modules/tracks/views/templates/dropdown.client.view.html'
    };
  }
]);
