'use strict';

angular.module('core').controller('PlayerController',
    ['$scope', '$sce', '$timeout','Tracks', 'Shared', function ($scope, $sce, $timeout, Tracks, Shared) {

      $scope.showPlayer = Shared.getShowPlayer();
      //console.log('Player says', $scope.showPlayer.show);

      //var controller = this;
      $scope.state = null;
      $scope.API = null;
      $scope.currentVideo = 0;

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

      $scope.play = function() {
        //$scope.showPlayer = true;
        Shared.togglePlayer();
        Tracks.query().$promise.then(function(tracks){
          //console.log(data[0].source);
          $scope.videos = tracks.map(function (track) {
            var obj = {};
            obj.url = 'https://s3-eu-west-1.amazonaws.com/smx2015/RaiNAS_1/RaiNAS/music/live/2015/' + track.filename_128;
            obj.artist = track.artist;
            obj.title = track.title;
            return obj;
          });
        });
      };



      //$scope.videos = [
      //  {
      //    sources: [
      //      {
      //        src: $sce.trustAsResourceUrl('https://s3-eu-west-1.amazonaws.com/smx2015/RaiNAS_1/RaiNAS/music/live/2015/011e98c858d622c23c50141c4ad644ae.mp3'),
      //        type: 'audio/mpeg'
      //      }
      //    ]
      //  },
      //  {
      //    sources: [
      //      {
      //        src: $sce.trustAsResourceUrl('https://s3-eu-west-1.amazonaws.com/smx2015/RaiNAS_1/RaiNAS/music/live/2015/019c2ba9136e6091626b611b3608347b.mp3'),
      //        type: 'audio/mpeg'
      //      }
      //    ]
      //  }
      //
      //];

      //[
      //  {
      //    "sources":[
      //      {
      //        "src":"$sce.trustAsResourceUrl('https://s3-eu-west-1.amazonaws.com/smx2015/RaiNAS_1/RaiNAS/music/live/2015/3d61a59a2b90876f593dca56fb62149f.mp3')",
      //        "type":"audio/mpeg"
      //      }
      //    ]
      //  }
      //]

      $scope.config = {
        preload: 'none',
        autoPlay: true,
        //sources: $scope.videos[0].url
      };

      $scope.setVideo = function (index) {
        $scope.API.stop();
        $scope.currentVideo = index;
        $scope.config.sources = $scope.videos[index].sources;
        $timeout($scope.API.play.bind($scope.API), 100);
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



