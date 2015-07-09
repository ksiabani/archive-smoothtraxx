'use strict';

//Tracks service used to communicate Tracks REST endpoints
angular.module('core').factory('Player', ['$resource',
  function($resource) {
    return $resource('tracks/:trackId', { trackId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
]);


//angular.module('myApp.services', ['ngResource']).
//    factory("geoProvider", function($resource) {
//      return {
//        states: $resource('../data/states.json', {}, {
//          query: { method: 'GET', params: {}, isArray: false }
//        }),
//        countries: $resource('../data/countries.json', {}, {
//          query: { method: 'GET', params: {}, isArray: false }
//        })
//      };
//    });
