'use strict';

//Player service used to communicate Tracks REST endpoints
angular.module('player').factory('Player', ['$resource',
  function($resource) {
    return $resource('playlist', {}, {});
  }
]);
