'use strict';

angular.module('core').controller('PlayerController',
    ['$scope', '$sce', '$timeout', 'Player', 'Shared', function ($scope, $sce, $timeout, Player, Shared) {

      $scope.showPlayer = Shared.getShowPlayer();
      $scope.state = null;
      $scope.API = null;
      $scope.currentVideo = 0;

      // if player is shown, start playing
      $scope.$watch('showPlayer.show', function (newValue, oldValue) {
        if (newValue !== oldValue) {
          $scope.play(3);
        }
      });

      $scope.onPlayerReady = function (API) {
        $scope.API = API;
      };

      $scope.onCompleteVideo = function () {
        $scope.isCompleted = true;
        $scope.currentVideo++;
        if ($scope.currentVideo >= $scope.videos.length)
          $scope.currentVideo = 0;
        $scope.setVideo($scope.currentVideo);
      };

      $scope.config = {
        preload: 'none',
        autoPlay: false,
        sources: '[]'
      };

      //category
      //mode
      //genre
      //label
      //start_with

      $scope.play = function (index) {
        $scope.playerParams = Shared.getPlayerParams();
        $scope.videos = [];
        Player.query({
              category: $scope.playerParams.options.category,
              mode: $scope.playerParams.options.mode,
              genre: $scope.playerParams.options.genre,
              start_with: $scope.playerParams.options.start_with
            })
            .$promise.then(function (tracks) {
              angular.forEach(tracks, function (track) {
                $scope.videos.push({
                  sources: [{
                    src: $sce.trustAsResourceUrl('https://s3-eu-west-1.amazonaws.com/smx2015/RaiNAS_1/RaiNAS/music/live/2015/' + track.filename_128),
                    type: 'audio/mpeg'
                  }]
                });
              });
              $scope.API.stop();
              $scope.currentVideo = index;
              $scope.config.sources = $scope.videos[index].sources;
              $timeout($scope.API.play.bind($scope.API), 100);
            });
      };


    }]
);


// Videogular
//$scope.state = null;
//$scope.API = null;
//$scope.currentVideo = 0;
//
//$scope.onPlayerReady = function (API) {
//    $scope.API = API;
//};
//
//$scope.onCompleteVideo = function () {
//    $scope.isCompleted = true;
//    $scope.currentVideo++;
//    if ($scope.currentVideo >= $scope.videos.length)
//        $scope.currentVideo = 0;
//    $scope.setVideo($scope.currentVideo);
//};
//
////$scope.loadPlayer = function() {
////    $scope.videos = Tracks.query({
////        page: $scope.queryPage,
////        limit: $scope.queryLimit,
////        category: $scope.tracksCategory,
////        genre: $scope.tracksGenre
////    });
////};
//
//$scope.videos = [
//    {
//        sources: [
//            {
//                src: $sce.trustAsResourceUrl('https://s3-eu-west-1.amazonaws.com/smx2015/RaiNAS_1/RaiNAS/music/live/2015/011e98c858d622c23c50141c4ad644ae.mp3'),
//                type: 'audio/mpeg'
//            }
//        ]
//    },
//    {
//        sources: [
//            {
//                src: $sce.trustAsResourceUrl('https://s3-eu-west-1.amazonaws.com/smx2015/RaiNAS_1/RaiNAS/music/live/2015/019c2ba9136e6091626b611b3608347b.mp3'),
//                type: 'audio/mpeg'
//            }
//        ]
//    }
//
//];
//
//$scope.config = {
//    preload: 'none',
//    autoPlay: true,
//    sources: $scope.videos[0].sources
//};
//
//$scope.setVideo = function (index) {
//    $scope.API.stop();
//    $scope.currentVideo = index;
//    $scope.config.sources = $scope.videos[index].sources;
//    $timeout($scope.API.play.bind($scope.API), 100);
//};



