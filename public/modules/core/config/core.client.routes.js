'use strict';

// Setting up route
angular.module('core').config(['$stateProvider', '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider) {
    // Redirect to home view when route not found
    $urlRouterProvider.otherwise('/');

    // Home state routing
    $stateProvider.
        state('home', {
          url: '/',
          templateUrl: 'modules/core/views/home.client.view.html'
        }).
        state('music', {
          url: '/music',
          templateUrl: 'modules/core/views/music.client.view.html'
        }).
        state('radio', {
          url: '/radio',
          templateUrl: 'modules/core/views/radio.client.view.html'
        }).
        state('viewRadio', {
          url: '/radio/:radioId',
          templateUrl: 'modules/core/views/view-radio.client.view.html'
        });
  }
]);
