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
    $scope.find = function () {
      $scope.queryPage = 1;
      $scope.queryLimit = 20;
      $scope.tracks = Tracks.query({page: $scope.queryPage, limit: $scope.queryLimit});
    };

    $scope.findMore = function () {
      $scope.queryPage += 1;
      //$scope.tracks.push.apply = Tracks.query({page: $scope.queryPage, limit: $scope.queryLimit});
      var some_data = Tracks.query({page: $scope.queryPage, limit: $scope.queryLimit});
      //$scope.tracks.push.apply(some_data);
      //$scope.tracks = Tracks.query({page: $scope.queryPage, limit: $scope.queryLimit});
      $scope.tracks = $scope.tracks.concat(some_data);
    };

    //Blog.MorePosts.query({id:id}, function(data) {
    //  $scope.posts.push.apply($scope.posts, data);
    //});

    // Find existing Track
    $scope.findOne = function () {
      $scope.track = Tracks.get({
        trackId: $stateParams.trackId
      });
    };
  }
]);
