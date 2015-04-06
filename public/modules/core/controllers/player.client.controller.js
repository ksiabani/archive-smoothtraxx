'use strict';

angular.module('core').controller('PlayerController', ['$sce',
        function ($sce) {
            this.config = {
                sources: [
                    {src: $sce.trustAsResourceUrl("http://static.videogular.com/assets/audios/videogular.mp3"), type: "audio/mpeg"},
                    {src: $sce.trustAsResourceUrl("http://static.videogular.com/assets/audios/videogular.ogg"), type: "audio/ogg"}
                ],
                theme: "lib/videogular-themes-default/videogular.css"
            };
    }]
);

//
//'use strict';
//
//angular.module('core').controller('HeaderController', ['$scope', 'Authentication', 'Menus',
//    function($scope, Authentication, Menus) {
//        $scope.authentication = Authentication;
//        $scope.isCollapsed = false;
//        $scope.menu = Menus.getMenu('topbar');
//
//        $scope.toggleCollapsibleMenu = function() {
//            $scope.isCollapsed = !$scope.isCollapsed;
//        };
//
//        // Collapsing the menu after navigation
//        $scope.$on('$stateChangeSuccess', function() {
//            $scope.isCollapsed = false;
//        });
//    }
//]);
