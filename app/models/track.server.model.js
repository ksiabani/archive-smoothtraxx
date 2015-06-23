'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    mongoosePaginate = require('mongoose-paginate');

/**
 * Track Schema
 *
 */
var TrackSchema = new Schema({
    artist: {
        type: String,
        default: '',
        trim: true,
        required: true
    },
    title: {
        type: String,
        default: '',
        trim: true,
        required: true
    },
    album: {
        type: String,
        default: '',
        trim: true,
        required: true
    },
    publisher: {
        type: String,
        default: '',
        trim: true,
        required: true
    },
    genre: {
        type: String,
        default: '',
        trim: true
    },
    year: {
        type: String,
        default: '',
        trim: true
    },
    released: {
        type: Date,
        default: Date.now
    },
    cover: {
        type: String,
        index: true,
        required: true
    },
    source: {
        type: String,
        trim: true,
        index: true
    },
    filename_128: {
        type: String,
        trim: true,
        index: true
    },
    created: {
        type: Date,
        default: Date.now
    },
    copied: {
        type: Boolean,
        default: false
    }
});

TrackSchema.plugin(mongoosePaginate);
TrackSchema.index({ artist: 1, title: 1, album: 1 });

mongoose.model('Track', TrackSchema);

