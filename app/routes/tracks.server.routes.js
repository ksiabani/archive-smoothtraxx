'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var tracks = require('../../app/controllers/tracks.server.controller');

	// Tracks Routes
	app.route('/tracks')
		.get(tracks.list)
		.post(users.requiresLogin, tracks.create);

	app.route('/tracks/:trackId')
		.get(tracks.read)
		.put(users.requiresLogin, tracks.hasAuthorization, tracks.update)
		.delete(users.requiresLogin, tracks.hasAuthorization, tracks.delete);

	// Finish by binding the Track middleware
	app.param('trackId', tracks.trackByID);
};
