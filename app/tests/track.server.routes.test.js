'use strict';

var should = require('should'),
	request = require('supertest'),
	app = require('../../server'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Track = mongoose.model('Track'),
	agent = request.agent(app);

/**
 * Globals
 */
var credentials, user, track;

/**
 * Track routes tests
 */
describe('Track CRUD tests', function() {
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

		// Save a user to the test db and create new Track
		user.save(function() {
			track = {
				name: 'Track Name'
			};

			done();
		});
	});

	it('should be able to save Track instance if logged in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Track
				agent.post('/tracks')
					.send(track)
					.expect(200)
					.end(function(trackSaveErr, trackSaveRes) {
						// Handle Track save error
						if (trackSaveErr) done(trackSaveErr);

						// Get a list of Tracks
						agent.get('/tracks')
							.end(function(tracksGetErr, tracksGetRes) {
								// Handle Track save error
								if (tracksGetErr) done(tracksGetErr);

								// Get Tracks list
								var tracks = tracksGetRes.body;

								// Set assertions
								(tracks[0].user._id).should.equal(userId);
								(tracks[0].name).should.match('Track Name');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to save Track instance if not logged in', function(done) {
		agent.post('/tracks')
			.send(track)
			.expect(401)
			.end(function(trackSaveErr, trackSaveRes) {
				// Call the assertion callback
				done(trackSaveErr);
			});
	});

	it('should not be able to save Track instance if no name is provided', function(done) {
		// Invalidate name field
		track.name = '';

		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Track
				agent.post('/tracks')
					.send(track)
					.expect(400)
					.end(function(trackSaveErr, trackSaveRes) {
						// Set message assertion
						(trackSaveRes.body.message).should.match('Please fill Track name');
						
						// Handle Track save error
						done(trackSaveErr);
					});
			});
	});

	it('should be able to update Track instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Track
				agent.post('/tracks')
					.send(track)
					.expect(200)
					.end(function(trackSaveErr, trackSaveRes) {
						// Handle Track save error
						if (trackSaveErr) done(trackSaveErr);

						// Update Track name
						track.name = 'WHY YOU GOTTA BE SO MEAN?';

						// Update existing Track
						agent.put('/tracks/' + trackSaveRes.body._id)
							.send(track)
							.expect(200)
							.end(function(trackUpdateErr, trackUpdateRes) {
								// Handle Track update error
								if (trackUpdateErr) done(trackUpdateErr);

								// Set assertions
								(trackUpdateRes.body._id).should.equal(trackSaveRes.body._id);
								(trackUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should be able to get a list of Tracks if not signed in', function(done) {
		// Create new Track model instance
		var trackObj = new Track(track);

		// Save the Track
		trackObj.save(function() {
			// Request Tracks
			request(app).get('/tracks')
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Array.with.lengthOf(1);

					// Call the assertion callback
					done();
				});

		});
	});


	it('should be able to get a single Track if not signed in', function(done) {
		// Create new Track model instance
		var trackObj = new Track(track);

		// Save the Track
		trackObj.save(function() {
			request(app).get('/tracks/' + trackObj._id)
				.end(function(req, res) {
					// Set assertion
					res.body.should.be.an.Object.with.property('name', track.name);

					// Call the assertion callback
					done();
				});
		});
	});

	it('should be able to delete Track instance if signed in', function(done) {
		agent.post('/auth/signin')
			.send(credentials)
			.expect(200)
			.end(function(signinErr, signinRes) {
				// Handle signin error
				if (signinErr) done(signinErr);

				// Get the userId
				var userId = user.id;

				// Save a new Track
				agent.post('/tracks')
					.send(track)
					.expect(200)
					.end(function(trackSaveErr, trackSaveRes) {
						// Handle Track save error
						if (trackSaveErr) done(trackSaveErr);

						// Delete existing Track
						agent.delete('/tracks/' + trackSaveRes.body._id)
							.send(track)
							.expect(200)
							.end(function(trackDeleteErr, trackDeleteRes) {
								// Handle Track error error
								if (trackDeleteErr) done(trackDeleteErr);

								// Set assertions
								(trackDeleteRes.body._id).should.equal(trackSaveRes.body._id);

								// Call the assertion callback
								done();
							});
					});
			});
	});

	it('should not be able to delete Track instance if not signed in', function(done) {
		// Set Track user 
		track.user = user;

		// Create new Track model instance
		var trackObj = new Track(track);

		// Save the Track
		trackObj.save(function() {
			// Try deleting Track
			request(app).delete('/tracks/' + trackObj._id)
			.expect(401)
			.end(function(trackDeleteErr, trackDeleteRes) {
				// Set message assertion
				(trackDeleteRes.body.message).should.match('User is not logged in');

				// Handle Track error error
				done(trackDeleteErr);
			});

		});
	});

	afterEach(function(done) {
		User.remove().exec();
		Track.remove().exec();
		done();
	});
});