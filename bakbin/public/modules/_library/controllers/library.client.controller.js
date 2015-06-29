'use strict';

// Tracks controller
angular.module('library')
    .controller('LibraryController', ['$scope', '$stateParams', '$location', 'Authentication', 'Tracks',
        function($scope, $stateParams, $location, Authentication, Tracks) {
            $scope.authentication = Authentication;




            $scope.queryPage = 1;
            $scope.queryLimit = 4;

            // Find a list of Tracks
            $scope.find = function() {
                //$scope.tracks = Tracks.query({p: 'item/1'});
                $scope.tracks = Tracks.query({page: $scope.queryPage, limit: $scope.queryLimit});
            };

            // Find existing Track
            $scope.findOne = function() {
                $scope.track = Tracks.get({
                    trackId: $stateParams.trackId
                });
            };

            $scope.showMore = function () {
                $scope.queryLimit *= 2;
                $scope.find();
            }
        }
    ]);
