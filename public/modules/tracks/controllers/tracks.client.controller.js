'use strict';

// Tracks controller
angular.module('tracks').controller('TracksController', ['$scope', '$stateParams', '$location', 'Authentication', 'Tracks',
	function($scope, $stateParams, $location, Authentication, Tracks) {
		$scope.authentication = Authentication;

		// Create new Track
		$scope.create = function() {
			// Create new Track object
			var track = new Tracks ({
				name: this.name
			});

			// Redirect after save
			track.$save(function(response) {
				$location.path('tracks/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Track
		$scope.remove = function(track) {
			if ( track ) { 
				track.$remove();

				for (var i in $scope.tracks) {
					if ($scope.tracks [i] === track) {
						$scope.tracks.splice(i, 1);
					}
				}
			} else {
				$scope.track.$remove(function() {
					$location.path('tracks');
				});
			}
		};

		// Update existing Track
		$scope.update = function() {
			var track = $scope.track;

			track.$update(function() {
				$location.path('tracks/' + track._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Tracks
		$scope.find = function() {
			$scope.tracks = Tracks.query();
		};

		// Find existing Track
		$scope.findOne = function() {
			$scope.track = Tracks.get({ 
				trackId: $stateParams.trackId
			});
		};
	}
]);