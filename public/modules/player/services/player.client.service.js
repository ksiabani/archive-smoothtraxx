'use strict';

//Tracks service used to communicate Tracks REST endpoints
angular.module('core').factory('Player', ['$resource',
  function ($resource) {
    return $resource('/tracks', {}, {
          query:{ method: 'JSONP', params: {callback: 'JSON_CALLBACK'}, isArray: true }
          //jsonpquery: { method: 'JSONP', params: {callback: 'JSON_CALLBACK'}, isArray: true }
        });
    //return {
    //  similar: $resource('/tracks/:trackId/player', {}, {
    //    query: {method: 'GET', params: {}, isArray: false}
    //  }),
    //  popular: $resource('/tracks/:trackId/popular', {}, {
    //    query: {method: 'GET', params: {}, isArray: false}
    //  }),
    //  latest: $resource('/tracks/:trackId/latest', {}, {
    //  query: {method: 'GET', params: {}, isArray: false}
    //})
    //};
  }
]);


//app.factory('JsonResource', function($resource) {
//  return $resource('events.json', {}, {
//    query: {
//      method: 'GET',
//      transformResponse: function(data) {
//        return angular.fromJson(data).events;
//      },
//      isArray: true
//    }
//  });
//});


//app.route('/tracks/:trackId/player')
//    .get(player.playlist);


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
