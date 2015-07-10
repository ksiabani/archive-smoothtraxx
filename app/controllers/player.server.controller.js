'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    errorHandler = require('./errors.server.controller'),
    Track = mongoose.model('Track'),
    _ = require('lodash')
    ;


exports.playlist = function (req, res) {
  var playType = req.query.type;
  var artist =  req.query.artist;
  var genre = req.query.genre;

  Track.find().sort('-released ').select({ filename_128: 1, _id: 0 }).limit(100).exec(function (err, tracks) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      var playlist = tracks.map( function (track) {

        var playlistTrack = {};
        playlistTrack.sources = [];
        //var src = '$sce.trustAsResourceUrl(\'https://s3-eu-west-1.amazonaws.com/smx2015/RaiNAS_1/RaiNAS/music/live/2015/' + track.filename_128 + '\')';
        playlistTrack.sources.content = {};
        playlistTrack.sources.content.src = '$sce.trustAsResourceUrl(\'https://s3-eu-west-1.amazonaws.com/smx2015/RaiNAS_1/RaiNAS/music/live/2015/' + track.filename_128 + '\')';
        playlistTrack.sources.content.type = 'audio/mpeg';
        //playlistTrack.type = 'audio/mpeg';
        playlistTrack.sources.push(playlistTrack.sources.content);
        return playlistTrack;
      });
      res.jsonp(playlist);
    }
  });
};


/*
{
"0":
  {
  "sources":"$sce.trustAsResourceUrl('https://s3-eu-west-1.amazonaws.com/smx2015/RaiNAS_1/RaiNAS/music/live/2015/1b34937252814a2bfdc948d73e8f7378.mp3')",
  "type":"audio/mpeg"
  }
}

*/
/**
 * Track middleware
 */
exports.trackByID = function (req, res, next, id) {
  Track.findById(id).populate('user', 'displayName').exec(function (err, track) {
    if (err) return next(err);
    if (!track) return next(new Error('Failed to load Track ' + id));
    req.track = track;
    next();
  });
};
