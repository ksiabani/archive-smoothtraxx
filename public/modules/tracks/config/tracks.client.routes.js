'use strict';

//Setting up route
angular.module('tracks').config(['$stateProvider',
	function($stateProvider) {
		// Tracks state routing
		$stateProvider.
		state('listTracks', {
			url: '/tracks',
			templateUrl: 'modules/tracks/views/list-tracks.client.view.html'
		}).
		state('createTrack', {
			url: '/tracks/create',
			templateUrl: 'modules/tracks/views/create-track.client.view.html'
		}).
		state('viewTrack', {
			url: '/tracks/:trackId',
			templateUrl: 'modules/tracks/views/view-track.client.view.html'
		}).
		state('editTrack', {
			url: '/tracks/:trackId/edit',
			templateUrl: 'modules/tracks/views/edit-track.client.view.html'
		});
	}
]);