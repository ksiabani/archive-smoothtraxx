'use strict';

//Setting up route
angular.module('channels').config(['$stateProvider',
	function($stateProvider) {
		// Channels state routing
		$stateProvider.
		state('listChannels', {
			url: '/channels',
			templateUrl: 'modules/channels/views/list-channels.client.view.html'
		}).
		state('createChannel', {
			url: '/channels/create',
			templateUrl: 'modules/channels/views/create-channel.client.view.html'
		}).
		state('viewChannel', {
			url: '/channels/:channelId',
			templateUrl: 'modules/channels/views/view-channel.client.view.html'
		}).
		state('editChannel', {
			url: '/channels/:channelId/edit',
			templateUrl: 'modules/channels/views/edit-channel.client.view.html'
		});
	}
]);