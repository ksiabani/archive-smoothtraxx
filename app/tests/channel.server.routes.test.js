'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Channel = mongoose.model('Channel'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, channel;

/**
 * Channel routes tests
 */
describe('Channel CRUD tests', function() {
	beforeEach(function(done) {
		// Create user credentials
		credentials = {
			username: 'username',
			password: 'password'
		};

		// Create a new user
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: credentials.username,
			password: credentials.password,
			provider: 'local'
		});

		// Save a user to the test db and create new Channel
		user.save(function() {
			channel = {
				name: 'Channel Name'
			};

			done();
		});
	});

	it('should be able to save Channel instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Channel
				agent.post('/channels')
					.send(channel)
					.expect(200)
					.end(function(channelSaveErr, channelSaveRes) {
						// Handle Channel save error
						if (channelSaveErr) done(channelSaveErr);

						// Get a list of Channels
						agent.get('/channels')
							.end(function(channelsGetErr, channelsGetRes) {
								// Handle Channel save error
								if (channelsGetErr) done(channelsGetErr);

								// Get Channels list
								var channels = channelsGetRes.body;

								// Set assertions
								(channels[0].user._id).should.equal(userId);
								(channels[0].name).should.match('Channel Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Channel instance if not logged in', function(done) {
		agent.post('/channels')
			.send(channel)
			.expect(401)
			.end(function(channelSaveErr, channelSaveRes) {
				// Call the assertion callback
				done(channelSaveErr);
			});
	});

	it('should not be able to save Channel instance if no name is provided', function(done) {
		// Invalidate name field
		channel.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Channel
				agent.post('/channels')
					.send(channel)
					.expect(400)
					.end(function(channelSaveErr, channelSaveRes) {
						// Set message assertion
						(channelSaveRes.body.message).should.match('Please fill Channel name');
						
						// Handle Channel save error
						done(channelSaveErr);
					});
			});
	});

	it('should be able to update Channel instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Channel
				agent.post('/channels')
					.send(channel)
					.expect(200)
					.end(function(channelSaveErr, channelSaveRes) {
						// Handle Channel save error
						if (channelSaveErr) done(channelSaveErr);

						// Update Channel name
						channel.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Channel
						agent.put('/channels/' + channelSaveRes.body._id)
							.send(channel)
							.expect(200)
							.end(function(channelUpdateErr, channelUpdateRes) {
								// Handle Channel update error
								if (channelUpdateErr) done(channelUpdateErr);

								// Set assertions
								(channelUpdateRes.body._id).should.equal(channelSaveRes.body._id);
								(channelUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Channels if not signed in', function(done) {
		// Create new Channel model instance
		var channelObj = new Channel(channel);

		// Save the Channel
		channelObj.save(function() {
			// Request Channels
			request(app).get('/channels')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Channel if not signed in', function(done) {
		// Create new Channel model instance
		var channelObj = new Channel(channel);

		// Save the Channel
		channelObj.save(function() {
			request(app).get('/channels/' + channelObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', channel.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Channel instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Channel
				agent.post('/channels')
					.send(channel)
					.expect(200)
					.end(function(channelSaveErr, channelSaveRes) {
						// Handle Channel save error
						if (channelSaveErr) done(channelSaveErr);

						// Delete existing Channel
						agent.delete('/channels/' + channelSaveRes.body._id)
							.send(channel)
							.expect(200)
							.end(function(channelDeleteErr, channelDeleteRes) {
								// Handle Channel error error
								if (channelDeleteErr) done(channelDeleteErr);

								// Set assertions
								(channelDeleteRes.body._id).should.equal(channelSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Channel instance if not signed in', function(done) {
		// Set Channel user 
		channel.user = user;

		// Create new Channel model instance
		var channelObj = new Channel(channel);

		// Save the Channel
		channelObj.save(function() {
			// Try deleting Channel
			request(app).delete('/channels/' + channelObj._id)
			.expect(401)
			.end(function(channelDeleteErr, channelDeleteRes) {
				// Set message assertion
				(channelDeleteRes.body.message).should.match('User is not logged in');

				// Handle Channel error error
				done(channelDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Channel.remove().exec();
		done();
	});
});