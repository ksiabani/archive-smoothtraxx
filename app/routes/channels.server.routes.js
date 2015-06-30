'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var channels = require('../../app/controllers/channels.server.controller');

	// Channels Routes
	app.route('/channels')
		.get(channels.list)
		.post(users.requiresLogin, channels.create);

	app.route('/channels/:channelId')
		.get(channels.read)
		.put(users.requiresLogin, channels.hasAuthorization, channels.update)
		.delete(users.requiresLogin, channels.hasAuthorization, channels.delete);

	// Finish by binding the Channel middleware
	app.param('channelId', channels.channelByID);
};
