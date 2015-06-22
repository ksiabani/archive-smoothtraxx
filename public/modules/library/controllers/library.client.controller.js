'use strict';

// Tracks controller
angular.module('library')
    .controller('LibraryController', ['$scope', '$stateParams', '$location', 'Authentication', 'Tracks',
        function($scope, $stateParams, $location, Authentication, Tracks) {
            $scope.authentication = Authentication;

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
