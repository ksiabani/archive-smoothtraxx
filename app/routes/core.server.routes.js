'use strict';

module.exports = function (app) {
    // Root routing
    var core = require('../../app/controllers/core.server.controller');
    var tracks = require('../../app/controllers/tracks.server.controller');
    app.route('/').get(core.index);
};
