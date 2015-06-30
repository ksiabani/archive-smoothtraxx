'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Channel Schema
 */
var ChannelSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Channel name',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Channel', ChannelSchema);