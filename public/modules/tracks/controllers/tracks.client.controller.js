'use strict';

// Tracks controller
angular.module('tracks').controller('TracksController', ['$scope', '$rootScope', '$stateParams', '$location', 'Authentication', 'Tracks', '$sce', '$timeout', 'Shared', '$log', '$window',
    function ($scope, $rootScope, $stateParams, $location, Authentication, Tracks, $sce, $timeout, Shared, $log, $window) {

        $scope.authentication = Authentication;
        $scope.queryLimit = 10;
        $scope.tracksGenre = '';
        $scope.tracksCategory = 'latest';
        $scope.dropdown = {
            title: 'Choose Genre'
        };

        $scope.goBack = function() {
            $window.history.back();
        };

        $scope.genres = [
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
        ];

        $scope.play = function (options) {
            Shared.setShowPlayer(true);
            options.category = $scope.tracksCategory;
            options.mode = options.mode || 'shuffle';
            options.genre = $scope.tracksGenre;
            Shared.setPlayerParams(options);
            $rootScope.$broadcast('initPlayer');
        };

        //load tracks category
        $scope.loadTracksCategory = function (category) {
            $scope.tracksCategory = category;
            console.log($scope.tracksCategory);
            $scope.find();
        };

        //load tracks genre
        $scope.loadTracksGenre = function (genre) {
            $scope.dropdown.title = genre;
            $scope.tracksGenre = genre === 'All genres' ? '' : genre;
            $scope.find();
        };

        // Create new Track
        $scope.create = function () {
            // Create new Track object
            var track = new Tracks({
                name: this.name
            });

            // Redirect after save
            track.$save(function (response) {
                $location.path('tracks/' + response._id);

                // Clear form fields
                $scope.name = '';
            }, function (errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        // Remove existing Track
        $scope.remove = function (track) {
            if (track) {
                track.$remove();

                for (var i in $scope.tracks) {
                    if ($scope.tracks [i] === track) {
                        $scope.tracks.splice(i, 1);
                    }
                }
            } else {
                $scope.track.$remove(function () {
                    $location.path('tracks');
                });
            }
        };

        // Update existing Track
        $scope.update = function () {
            var track = $scope.track;

            track.$update(function () {
                $location.path('tracks/' + track._id);
            }, function (errorResponse) {
                $scope.error = errorResponse.data.message;
            });
        };

        // Find a list of Tracks
        $scope.find = function () {
            $scope.queryPage = 1;
            $scope.tracks = Tracks.query({
                    page: $scope.queryPage,
                    limit: $scope.queryLimit,
                    category: $scope.tracksCategory,
                    genre: $scope.tracksGenre
                });
        };

        // Used with infinite scrolling
        // http://stackoverflow.com/questions/20047354/angularjs-push-array-of-data-retrieved-from-a-resource-service-in-another-array
        $scope.findMore = function () {
            $scope.busy = true;
            $scope.queryPage += 1;
            Tracks.query({
                    page: $scope.queryPage,
                    limit: $scope.queryLimit,
                    category: $scope.tracksCategory,
                    genre: $scope.tracksGenre
                },
                function (data) {
                    $scope.tracks.push.apply($scope.tracks, data);
                    $scope.busy = false;
                });
        };

        // Find existing Track
        $scope.findOne = function () {
            $scope.track = Tracks.get({
                trackId: $stateParams.trackId
            });
        };
    }
]);
