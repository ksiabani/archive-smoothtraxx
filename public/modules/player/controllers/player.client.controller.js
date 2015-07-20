'use strict';

angular.module('core').controller('PlayerController',
    ['$scope', '$sce', '$timeout', 'Player', 'Shared', function ($scope, $sce, $timeout, Player, Shared) {

      $scope.showPlayer = Shared.getShowPlayer();
      $scope.state = null;
      $scope.API = null;
      $scope.currentVideo = 0;

      // if player is shown, start playing
      //$scope.$watch('showPlayer.show', function (newValue, oldValue) {
      //  if (newValue !== oldValue) {
      //    $scope.play();
      //  }
      //});

      $scope.$on('initPlayer', function() {
        $scope.play();
      });

      $scope.onPlayerReady = function (API) {
        $scope.API = API;
      };

      $scope.onCompleteVideo = function () {
        $scope.isCompleted = true;
        //$scope.index++;
        $scope.currentVideo++;
        if ($scope.currentVideo >= $scope.videos.length)
          $scope.currentVideo = 0;
        $scope.setVideo($scope.currentVideo);
      };

      $scope.setVideo = function (index) {
          $scope.API.stop();
          $scope.currentVideo = index;
          $scope.config.sources = $scope.videos[index].sources;
          $timeout($scope.API.play.bind($scope.API), 100);
      };

      $scope.config = {
        preload: 'preload',
        autoPlay: false,
        sources: '[]'
      };

      //category
      //mode
      //genre
      //label
      //start_with

      $scope.play = function () {
        //$scope.index = 0; //Todo: Do I need this?
        $scope.playerParams = Shared.getPlayerParams();
        $scope.videos = [];
        // Get playlist tracks according to parameters and use them to build array for videogular to consume
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
                  }],
                  title: track.title,
                  artist: track.artist,
                  filename: track.filename_128
                });
              });
              // If user requested a track (hit play on track) load this track first
              if($scope.playerParams.options.start_with) {
              //  // Prepare object to push
              //  var startWithVideo = {
              //    sources: [{
              //      src: $sce.trustAsResourceUrl('https://s3-eu-west-1.amazonaws.com/smx2015/RaiNAS_1/RaiNAS/music/live/2015/' + $scope.playerParams.options.start_with),
              //      type: 'audio/mpeg'
              //    }],
              //    title: $scope.playerParams.options.title,
              //    artist: $scope.playerParams.options.artist
              //  };
                $scope.currentVideo = $scope.videos.map(function(e) { return e.filename; }).indexOf($scope.playerParams.options.start_with);
                //console.log(pos);
                //$scope.videos.unshift($scope.videos.slice(pos, 1));
                //$scope.videos.splice(pos+1, 1);
                //splice(new_index, 0, this.splice(old_index, 1)[0]);
                //$scope.videos.splice(0, 0, $scope.videos.splice(pos, 1)[0]);
              }

              //pos = myArray.map(function(e) { return e.hello; }).indexOf('stevie');



              //var array = [2, 5, 9];
              //var index = array.indexOf(5);
              //if (index > -1) {
              //  array.splice(index, 1);
              //}


              $scope.API.stop();
              $scope.currentVideo = $scope.currentVideo++ || 0;
              $scope.config.sources = $scope.videos[$scope.currentVideo].sources;
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
//$scope.vide0s = [
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



