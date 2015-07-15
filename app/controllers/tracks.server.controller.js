'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    errorHandler = require('./errors.server.controller'),
    Track = mongoose.model('Track'),
    _ = require('lodash')
    ;

/**
 * Create a Track
 */
exports.create = function (req, res) {
    var track = new Track(req.body);
    track.user = req.user;

    track.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(track);
        }
    });
};

/**
 * Show the current Track
 */
exports.read = function (req, res) {
    res.jsonp(req.track);
};

/**
 * Update a Track
 */
exports.update = function (req, res) {
    var track = req.track;

    track = _.extend(track, req.body);

    track.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(track);
        }
    });
};

/**
 * Delete a Track
 */
exports.delete = function (req, res) {
    var track = req.track;

    track.remove(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        } else {
            res.jsonp(track);
        }
    });
};

/**
 * List of Tracks
 * Deprecated: Use List of Tracks with pagination middleware
 */
//exports.list = function(req, res) {
//	Track.find().sort('-created').populate('user', 'displayName').limit(20).exec(function(err, tracks) {
//		if (err) {
//			return res.status(400).send({
//				message: errorHandler.getErrorMessage(err)
//			});
//		} else {
//			res.jsonp(tracks);
//		}
//	});
//};

/**
 * List of Tracks (with pagination)
 * > If no category set is a list of tracks with valid genres sorted by release date desceding
 * > If category is 'queue', is a list of tracks awaiting publication (includes tracks that:
 *                                                                          have an invalid genre
 *                                                                          are missing cover
 *                                                                          have a suggestion for change (or change request)
 */
exports.list = function (req, res) {
    //var queryPage = req.query.page;
    var queryPage = 1;
    //var queryLimit = req.query.limit;
    var queryLimit = 10;
    var category =  req.query.category;
    var genre = req.query.genre;

    if (!category) {
        Track.paginate(
            {
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
            },
            queryPage, queryLimit, function (err, pageCount, tracks, itemCount) {
                if (err) {
                    return res.status(400).send({
                        message: errorHandler.getErrorMessage(err)
                    });
                } else {
                    res.jsonp(tracks);
                }
            },
            {
                //columns: 'title',
                //populate: [ 'some_ref', 'other_ref' ],
                sortBy: {
                    released: -1
                }
            });
    }
    else if (category === 'queue') {

        Track.paginate(
            {
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
            },
            queryPage, queryLimit, function (err, pageCount, tracks, itemCount) {
                if (err) {
                    return res.status(400).send({
                        message: errorHandler.getErrorMessage(err)
                    });
                } else {
                    res.jsonp(tracks);
                }
            },
            {
                //columns: 'title',
                //populate: [ 'some_ref', 'other_ref' ],
                sortBy: {
                    released: -1
                }
            });

    }

};

/**
 * Queue:
 * list of tracks awaiting publication
 * Includes tracks that:
 *  have an invalid genre
 *  missing cover
 *  have a suggestion for change (or change request)
 */
//exports.listQueue = function (req, res) {
//    var queryPage = req.query.page;
//    var queryLimit = req.query.limit;
//    var category =  req.query.category;
//
//
//};

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

/**
 * Track authorization middleware
 */
exports.hasAuthorization = function (req, res, next) {
    if (req.track.user.id !== req.user.id) {
        return res.status(403).send('User is not authorized');
    }
    next();
};

