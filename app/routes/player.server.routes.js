'use strict';

module.exports = function (app) {

  var player = require('../../app/controllers/player.server.controller');

  // Player Routes
  app.route('/playlist')
      .get(player.playlist);

};

//// Tracks Routes
//app.route('/tracks')
//	.get(tracks.list)
//	.post(users.requiresLogin, tracks.create);
//
//app.route('/tracks/:trackId')
//	.get(tracks.read)
//	.put(users.requiresLogin, tracks.hasAuthorization, tracks.update)
//	.delete(users.requiresLogin, tracks.hasAuthorization, tracks.delete);
//
////app.route('/tracks/:trackId/queue')
////    .get(tracks.listQueue);
//
//// Finish by binding the Track middleware
//app.param('trackId', tracks.trackByID);
