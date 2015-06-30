'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
	Channel = mongoose.model('Channel'),
	_ = require('lodash');

/**
 * Create a Channel
 */
exports.create = function(req, res) {
	var channel = new Channel(req.body);
	channel.user = req.user;

	channel.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(channel);
		}
	});
};

/**
 * Show the current Channel
 */
exports.read = function(req, res) {
	res.jsonp(req.channel);
};

/**
 * Update a Channel
 */
exports.update = function(req, res) {
	var channel = req.channel ;

	channel = _.extend(channel , req.body);

	channel.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(channel);
		}
	});
};

/**
 * Delete an Channel
 */
exports.delete = function(req, res) {
	var channel = req.channel ;

	channel.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(channel);
		}
	});
};

/**
 * List of Channels
 */
exports.list = function(req, res) { 
	Channel.find().sort('-created').populate('user', 'displayName').exec(function(err, channels) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(channels);
		}
	});
};

/**
 * Channel middleware
 */
exports.channelByID = function(req, res, next, id) { 
	Channel.findById(id).populate('user', 'displayName').exec(function(err, channel) {
		if (err) return next(err);
		if (! channel) return next(new Error('Failed to load Channel ' + id));
		req.channel = channel ;
		next();
	});
};

/**
 * Channel authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.channel.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
