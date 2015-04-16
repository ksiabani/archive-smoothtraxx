'use strict';

angular.module('core').controller('PlayerController',
    ["$sce", "$timeout", function ($sce, $timeout) {
        var controller = this;
        controller.state = null;
        controller.API = null;
        controller.currentVideo = 0;

        controller.onPlayerReady = function(API) {
            controller.API = API;
        };

        controller.onCompleteVideo = function() {
            controller.isCompleted = true;
            controller.currentVideo++;
            if (controller.currentVideo >= controller.videos.length) controller.currentVideo = 0;

            controller.setVideo(controller.currentVideo);
        };

        controller.videos = [
            {
                sources: [
                    {src: $sce.trustAsResourceUrl("https://s3-eu-west-1.amazonaws.com/smx2015/RaiNAS_1/RaiNAS/music/live/2015/011e98c858d622c23c50141c4ad644ae.mp3"), type: "audio/mpeg"}
                ]
            },
            {
                sources: [
                    {src: $sce.trustAsResourceUrl("https://s3-eu-west-1.amazonaws.com/smx2015/RaiNAS_1/RaiNAS/music/live/2015/019c2ba9136e6091626b611b3608347b.mp3"), type: "audio/mpeg"}
                ]
            }

        ];

        controller.config = {
            preload: "none",
            autoPlay: true,
            sources: controller.videos[0].sources
        };

        controller.setVideo = function(index) {
            controller.API.stop();
            controller.currentVideo = index;
            controller.config.sources = controller.videos[index].sources;
            $timeout(controller.API.play.bind(controller.API), 100);
        };

    }]
);

