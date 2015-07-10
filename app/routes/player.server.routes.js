'use strict';

module.exports = function (app) {
  // Root routing
  var player = require('../../app/controllers/player.server.controller');
  //var tracks = require('../../app/controllers/tracks.server.controller');
  //app.route('/').get(core.index);

  // Player Routes
  app.route('/tracks/player')
      .get(player.playlist);

  // Finish by binding the Track middleware
  //app.param('trackId', tracks.trackByID);

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
