'use strict';

/*angular.module('core').factory('OtherService', function($resource) {
  return $resource('http://echo.jsontest.com/key/:val', {val: '@val'});
});


//Tracks service used to communicate Tracks REST endpoints
angular.module('core').factory('Player', ['$resource', '$q', 'OtherService',
  function ($resource, $q, OtherService) {

    var getResult = function() {
      var fullResult = $q.defer();
      $resource('http://time.jsontest.com/').get().$promise.then(function(data) {
        var promisses = [];
        for (var i = 0; i < 2; i++) {
          var ires = $q.defer();
          promisses.push(ires);
          OtherService.get({val: data.milliseconds_since_epoch+i}).$promise.then(function(keyValue) {
            //console.log(keyValue);
            data['key'+keyValue.key] = keyValue.key;
            ires.resolve(keyValue);
          });
        }
        $q.all(promisses).then(function() {
          fullResult.resolve(data);
        });
      });
      return fullResult.promise;
    };
    return {
      getResult: getResult
    };



  }


]);*/



//return $resource('/tracks', {}, {
//    query: {method: 'GET', params: {}, isArray: true}
//      //query:{ method: 'JSONP', params: {callback: 'JSON_CALLBACK'}, isArray: true }
//      //jsonpquery: { method: 'JSONP', params: {callback: 'JSON_CALLBACK'}, isArray: true }
//    });
//  //return {
//  //  similar: $resource('/tracks/:trackId/player', {}, {
//  //    query: {method: 'GET', params: {}, isArray: false}
//  //  }),
//  //  popular: $resource('/tracks/:trackId/popular', {}, {
//  //    query: {method: 'GET', params: {}, isArray: false}
//  //  }),
//  //  latest: $resource('/tracks/:trackId/latest', {}, {
//  //  query: {method: 'GET', params: {}, isArray: false}
//  //})
//  //};
//}

//angular.module('myApp').service('TimeService', function($q, $resource, OtherService) {
//  var getResult = function() {
//    var fullResult = $q.defer();
//    $resource('http://time.jsontest.com/').get().$promise.then(function(data) {
//      var promisses = [];
//      for (var i = 0; i < 2; i++) {
//        var ires = $q.defer();
//        promisses.push(ires);
//        OtherService.get({val: data.milliseconds_since_epoch+i}).$promise.then(function(keyValue) {
//          //console.log(keyValue);
//          data['key'+keyValue.key] = keyValue.key;
//          ires.resolve(keyValue);
//        });
//      }
//      $q.all(promisses).then(function() {
//        fullResult.resolve(data);
//      });
//    });
//    return fullResult.promise;
//  };
//  return {
//    getResult: getResult
//  };
//});


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
