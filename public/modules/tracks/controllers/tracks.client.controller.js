'use strict';

// Tracks controller
angular.module('tracks').controller('TracksController', ['$scope', '$stateParams', '$location', 'Authentication', 'Tracks',
    function ($scope, $stateParams, $location, Authentication, Tracks) {
        $scope.authentication = Authentication;

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

        //// Find a list of Tracks
        //$scope.find = function() {
        //	$scope.tracks = Tracks.query();
        //};

        // Find a list of Tracks
        $scope.find = function (tracksCategory) {
            $scope.queryPage = 1;
            $scope.queryLimit = 10;
            $scope.tracks = Tracks.query({page: $scope.queryPage, limit: $scope.queryLimit, category: tracksCategory});
        };

        $scope.findMore = function (tracksCategory) {
            $scope.busy = true;
            $scope.queryPage += 1;
            Tracks.query({page: $scope.queryPage, limit: $scope.queryLimit, category: tracksCategory},
                function (data) {
                    $scope.tracks.push.apply($scope.tracks, data);
                    $scope.busy = false;
                });
        };

        $scope.loadPop = function() {
            var tracksCategory = 'new';
            $scope.find(tracksCategory);
            return tracksCategory;

        };

        $scope.loadNew = function() {
            setTimeout(function() {
                console.log('You\'ve selected New');
            });

        };

        $scope.loadQueue = function() {
            setTimeout(function() {
                console.log('You\'ve selected Q');
            });

        };

        //$scope.moreResultsBoats = function () {
        //    $scope.pagIndex = $scope.pagIndex + 1;
        //    Boat.query({pagIndex: $scope.pagIndex},
        //        function success(result) {
        //            console.log('Ejecuting callback. Result:' + result);
        //            $scope.boats.push.apply($scope.boats, result);
        //        }
        //    );
        //};

        // Find existing Track
        $scope.findOne = function () {
            $scope.track = Tracks.get({
                trackId: $stateParams.trackId
            });
        };
    }
]);
