'use strict';

angular.module('core').controller('PlayerController',
    ['$scope', '$sce', '$timeout', 'Player', function ($scope, $sce, $timeout, Player) {
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


        console.log(Player.query());



        //Player.query().$promise.then(function (data) {
        //  var log = [];
        //  angular.forEach(data, function(value) {
        //    console.log(value);
        //    this.push(value);
        //  }, log);
        //  //console.log(log);
        //});
      };


      //var User = $resource('/user/:userId', {userId:'@id'});
      //User.get({userId:123})
      //    .$promise.then(function(user) {
      //      $scope.user = user;
      //    });

      //app.controller('MyCtrl', function($scope, JsonResource) {
      //  // No direct assignment here, resolve first, then assign
      //  JsonResource.query().$promise.then(function(data) {
      //    $scope.events = data;
      //  });
      //});



      //TestAPI.query({}, function (value, responseHeaders) {
      //  console.log(responseHeaders());
      //}, function (response) {
      //  console.log(response);
      //});

      //$scope.find = function() {
      //  $scope.articles = Articles.query();
      //};


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



      //$scope.config = {
      //  preload: 'none',
      //  autoPlay: true,
      //  sources: $scope.videos[0].sources
      //};

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



