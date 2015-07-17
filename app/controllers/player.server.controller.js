'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    errorHandler = require('./errors.server.controller'),
    Track = mongoose.model('Track');

// /playlist?category=[latest, popular, queue, unheard]&genre=[Soulful House, Deep House, ...]&mode=[all, shuffle]&start_with=[filemame]&label=[label]

exports.playlist = function (req, res) {
  var category = req.query.category;
  var mode = req.query.mode;
  var genre = req.query.genre;
  var label = req.query.label;
  var start_with = req.query.start_with;

  var query = Track.find({});

  if (category === 'latest') {
    query = Track.find({
      genre: {
        $in: [
          'House',
          'Soulful House',
          'Deep House',
          'Afro House',
          'Nu Disco / Indie Dance',
          'Jackin House',
          'Tech House',
          'Techno',
          'Classic House',
          'Soul / Funk / Disco',
          'Lounge / Chill Out',
          'Afro / Latin / Brazilian',
          'Broken Beat / Nu-Jazz',
          'Progressive House',
          'Electro House',
          'Minimal',
          'Electronica',
          'Leftfield',
          'R&B / Hip Hop',
          'DJ Tools',
          'Acapella',
          'Beats'
        ],
        $regex: new RegExp(genre)
      }
    });
  }
  else if (category === 'queue') {
    query = Track.find({
      genre: {
        $nin: [
          'House',
          'Soulful House',
          'Deep House',
          'Afro House',
          'Nu Disco / Indie Dance',
          'Jackin House',
          'Tech House',
          'Techno',
          'Classic House',
          'Soul / Funk / Disco',
          'Lounge / Chill Out',
          'Afro / Latin / Brazilian',
          'Broken Beat / Nu-Jazz',
          'Progressive House',
          'Electro House',
          'Minimal',
          'Electronica',
          'Leftfield',
          'R&B / Hip Hop',
          'DJ Tools',
          'Acapella',
          'Beats'
        ],
        $regex: new RegExp(genre)
      }
    });
  }

  query.sort('-released ').select({artist: 1, title: 1, publisher: 1, filename_128: 1, genre: 1, _id: 0 }).limit(100).exec(function (err, tracks) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(tracks);
		}
	});

};
