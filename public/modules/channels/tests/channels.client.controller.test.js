'use strict';

(function() {
	// Channels Controller Spec
	describe('Channels Controller Tests', function() {
		// Initialize global variables
		var ChannelsController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Channels controller.
			ChannelsController = $controller('ChannelsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Channel object fetched from XHR', inject(function(Channels) {
			// Create sample Channel using the Channels service
			var sampleChannel = new Channels({
				name: 'New Channel'
			});

			// Create a sample Channels array that includes the new Channel
			var sampleChannels = [sampleChannel];

			// Set GET response
			$httpBackend.expectGET('channels').respond(sampleChannels);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.channels).toEqualData(sampleChannels);
		}));

		it('$scope.findOne() should create an array with one Channel object fetched from XHR using a channelId URL parameter', inject(function(Channels) {
			// Define a sample Channel object
			var sampleChannel = new Channels({
				name: 'New Channel'
			});

			// Set the URL parameter
			$stateParams.channelId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/channels\/([0-9a-fA-F]{24})$/).respond(sampleChannel);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.channel).toEqualData(sampleChannel);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Channels) {
			// Create a sample Channel object
			var sampleChannelPostData = new Channels({
				name: 'New Channel'
			});

			// Create a sample Channel response
			var sampleChannelResponse = new Channels({
				_id: '525cf20451979dea2c000001',
				name: 'New Channel'
			});

			// Fixture mock form input values
			scope.name = 'New Channel';

			// Set POST response
			$httpBackend.expectPOST('channels', sampleChannelPostData).respond(sampleChannelResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Channel was created
			expect($location.path()).toBe('/channels/' + sampleChannelResponse._id);
		}));

		it('$scope.update() should update a valid Channel', inject(function(Channels) {
			// Define a sample Channel put data
			var sampleChannelPutData = new Channels({
				_id: '525cf20451979dea2c000001',
				name: 'New Channel'
			});

			// Mock Channel in scope
			scope.channel = sampleChannelPutData;

			// Set PUT response
			$httpBackend.expectPUT(/channels\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/channels/' + sampleChannelPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid channelId and remove the Channel from the scope', inject(function(Channels) {
			// Create new Channel object
			var sampleChannel = new Channels({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Channels array and include the Channel
			scope.channels = [sampleChannel];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/channels\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleChannel);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.channels.length).toBe(0);
		}));
	});
}());