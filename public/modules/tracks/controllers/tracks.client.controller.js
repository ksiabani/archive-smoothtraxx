'use strict';

// Tracks controller
angular.module('tracks').controller('TracksController', ['$scope', '$stateParams', '$location', 'Authentication', 'Tracks', '$window',
    function ($scope, $stateParams, $location, Authentication, Tracks, $window) {

        $scope.tabs = [
            { title:' Trending', content:'Dynamic content 1', icon: 'fa-line-chart', tracks_category: 'popular'},
            { title:' Just Added', content:'Dynamic content 2',icon: 'fa-calendar-o',  tracks_category: 'na'},
            { title:' Queue', content:'Dynamic content 3', icon: 'fa-clock-o', tracks_category: 'queue'},
            { title:' Unheard', content:'Dynamic content 4', icon: 'fa-headphones', tracks_category: 'unheard'}
        ];

        $scope.active = function() {
            return $scope.tabs.filter(function(tab){
                return tab.active;
            })[0];
        };

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
            //var tracksCategory = this.active().tracks_category;
            console.log(
                this.tabs.filter(function(tab){
                    return tab.active
                })
            );
            //var tracksCategory = 'queue';
            //var tracksGenre = 'Soulful';
            //$scope.queryPage = 1;
            //$scope.queryLimit = 10;
            //$scope.tracks = Tracks.query({page: $scope.queryPage, limit: $scope.queryLimit, category: tracksCategory, genre: tracksGenre});
        };


        //{
        //    "results":[
        //    {
        //        "id":"460",
        //        "name":"Widget 1",
        //        "loc":"Shed"
        //    },{
        //        "id":"461",
        //        "name":"Widget 2",
        //        "loc":"Kitchen"
        //    }]
        //}
        //
        //var valuesWith460 = obj.results.filter(function(val) {
        //    return val.id === "460";
        //});



        $scope.findMore = function (tracksCategory, tracksGenre) {
            $scope.busy = true;
            $scope.queryPage += 1;
            Tracks.query({page: $scope.queryPage, limit: $scope.queryLimit, category: tracksCategory, genre: tracksGenre},
                function (data) {
                    $scope.tracks.push.apply($scope.tracks, data);
                    $scope.busy = false;
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
