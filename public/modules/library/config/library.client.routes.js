'use strict';

// Setting up route
angular.module('library').config(['$stateProvider',
    function($stateProvider) {
        // Articles state routing
        $stateProvider.
            state('dashboardLibrary', {
                url: '/library',
                templateUrl: 'modules/library/views/dashboard.client.view.html'
            })/*.
            state('createArticle', {
                url: '/articles/create',
                templateUrl: 'modules/articles/views/create-article.client.view.html'
            }).
            state('viewArticle', {
                url: '/articles/:articleId',
                templateUrl: 'modules/articles/views/view-article.client.view.html'
            }).
            state('editArticle', {
                url: '/articles/:articleId/edit',
                templateUrl: 'modules/articles/views/edit-article.client.view.html'
            })*/;
    }
]);
