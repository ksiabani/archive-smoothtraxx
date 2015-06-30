'use strict';

//Channels service used to communicate Channels REST endpoints
angular.module('channels').factory('Channels', ['$resource',
	function($resource) {
		return $resource('channels/:channelId', { channelId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);