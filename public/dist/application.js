'use strict';

// Init the application configuration module for AngularJS application
var ApplicationConfiguration = (function () {
  // Init module configuration options
  var applicationModuleName = 'groovity-library';
  var applicationModuleVendorDependencies = ['ngResource', 'ngCookies', 'ngAnimate', 'ngTouch', 'ngSanitize', 'ui.router', 'ui.bootstrap', 'ui.utils', 'com.2fdevs.videogular', 'infinite-scroll'];

  // Add a new vertical module
  var registerModule = function (moduleName, dependencies) {
    // Create angular module
    angular.module(moduleName, dependencies || []);

    // Add the module to the AngularJS configuration file
    angular.module(applicationModuleName).requires.push(moduleName);
  };

  return {
    applicationModuleName: applicationModuleName,
    applicationModuleVendorDependencies: applicationModuleVendorDependencies,
    registerModule: registerModule
  };
})();

'use strict';

//Start by defining the main module and adding the module dependencies
angular.module(ApplicationConfiguration.applicationModuleName, ApplicationConfiguration.applicationModuleVendorDependencies);

// Setting HTML5 Location Mode
angular.module(ApplicationConfiguration.applicationModuleName).config(['$locationProvider',
	function($locationProvider) {
		$locationProvider.hashPrefix('!');
	}
]);

//Then define the init function for starting up the application
angular.element(document).ready(function() {
	//Fixing facebook bug with redirect
	if (window.location.hash === '#_=_') window.location.hash = '#!';

	//Then init the app
	angular.bootstrap(document, [ApplicationConfiguration.applicationModuleName]);
});
'use strict';

// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('channels');
'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('core');
'use strict';

// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('player');

'use strict';

// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('tracks');
'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('users');
'use strict';

//Setting up route
angular.module('channels').config(['$stateProvider',
	function($stateProvider) {
		// Channels state routing
		$stateProvider.
		state('listChannels', {
			url: '/channels',
			templateUrl: 'modules/channels/views/list-channels.client.view.html'
		}).
		state('createChannel', {
			url: '/channels/create',
			templateUrl: 'modules/channels/views/create-channel.client.view.html'
		}).
		state('viewChannel', {
			url: '/channels/:channelId',
			templateUrl: 'modules/channels/views/view-channel.client.view.html'
		}).
		state('editChannel', {
			url: '/channels/:channelId/edit',
			templateUrl: 'modules/channels/views/edit-channel.client.view.html'
		});
	}
]);
'use strict';

// Channels controller
angular.module('channels').controller('ChannelsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Channels',
	function($scope, $stateParams, $location, Authentication, Channels) {
		$scope.authentication = Authentication;

		// Create new Channel
		$scope.create = function() {
			// Create new Channel object
			var channel = new Channels ({
				name: this.name
			});

			// Redirect after save
			channel.$save(function(response) {
				$location.path('channels/' + response._id);

				// Clear form fields
				$scope.name = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Channel
		$scope.remove = function(channel) {
			if ( channel ) { 
				channel.$remove();

				for (var i in $scope.channels) {
					if ($scope.channels [i] === channel) {
						$scope.channels.splice(i, 1);
					}
				}
			} else {
				$scope.channel.$remove(function() {
					$location.path('channels');
				});
			}
		};

		// Update existing Channel
		$scope.update = function() {
			var channel = $scope.channel;

			channel.$update(function() {
				$location.path('channels/' + channel._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Channels
		$scope.find = function() {
			$scope.channels = Channels.query();
		};

		// Find existing Channel
		$scope.findOne = function() {
			$scope.channel = Channels.get({ 
				channelId: $stateParams.channelId
			});
		};
	}
]);
'use strict';

//Channels service used to communicate Channels REST endpoints
angular.module('channels').factory('Channels', ['$resource',
	function($resource) {
		return $resource('channels/:channelId', { channelId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);
'use strict';

// Setting up route
angular.module('core').config(['$stateProvider', '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider) {
    // Redirect to home view when route not found
    $urlRouterProvider.otherwise('/');

    // Home state routing
    $stateProvider.
        state('home', {
          url: '/',
          templateUrl: 'modules/core/views/home.client.view.html'
        }).
        state('music', {
          url: '/music',
          templateUrl: 'modules/core/views/music.client.view.html'
        }).
        state('radio', {
          url: '/radio',
          templateUrl: 'modules/core/views/radio.client.view.html'
        }).
        state('viewRadio', {
          url: '/radio/:radioId',
          templateUrl: 'modules/core/views/view-radio.client.view.html'
        });
  }
]);

'use strict';

angular.module('core').controller('HeaderController', ['$scope', 'Authentication', 'Menus',
	function($scope, Authentication, Menus) {
		$scope.authentication = Authentication;
		$scope.isCollapsed = false;
		$scope.menu = Menus.getMenu('topbar');

		$scope.toggleCollapsibleMenu = function() {
			$scope.isCollapsed = !$scope.isCollapsed;
		};

		// Collapsing the menu after navigation
		$scope.$on('$stateChangeSuccess', function() {
			$scope.isCollapsed = false;
		});
	}
]);
'use strict';


angular.module('core').controller('HomeController', ['$scope', 'Authentication',
	function($scope, Authentication) {
		// This provides Authentication context.
		$scope.authentication = Authentication;
	}
]);

'use strict';

//Menu service used for managing  menus
angular.module('core').service('Menus', [

	function() {
		// Define a set of default roles
		this.defaultRoles = ['*'];

		// Define the menus object
		this.menus = {};

		// A private function for rendering decision 
		var shouldRender = function(user) {
			if (user) {
				if (!!~this.roles.indexOf('*')) {
					return true;
				} else {
					for (var userRoleIndex in user.roles) {
						for (var roleIndex in this.roles) {
							if (this.roles[roleIndex] === user.roles[userRoleIndex]) {
								return true;
							}
						}
					}
				}
			} else {
				return this.isPublic;
			}

			return false;
		};

		// Validate menu existance
		this.validateMenuExistance = function(menuId) {
			if (menuId && menuId.length) {
				if (this.menus[menuId]) {
					return true;
				} else {
					throw new Error('Menu does not exists');
				}
			} else {
				throw new Error('MenuId was not provided');
			}

			return false;
		};

		// Get the menu object by menu id
		this.getMenu = function(menuId) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Return the menu object
			return this.menus[menuId];
		};

		// Add new menu object by menu id
		this.addMenu = function(menuId, isPublic, roles) {
			// Create the new menu
			this.menus[menuId] = {
				isPublic: isPublic || false,
				roles: roles || this.defaultRoles,
				items: [],
				shouldRender: shouldRender
			};

			// Return the menu object
			return this.menus[menuId];
		};

		// Remove existing menu object by menu id
		this.removeMenu = function(menuId) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Return the menu object
			delete this.menus[menuId];
		};

		// Add menu item object
		this.addMenuItem = function(menuId, menuItemTitle, menuItemURL, menuItemType, menuItemUIRoute, isPublic, roles, position) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Push new menu item
			this.menus[menuId].items.push({
				title: menuItemTitle,
				link: menuItemURL,
				menuItemType: menuItemType || 'item',
				menuItemClass: menuItemType,
				uiRoute: menuItemUIRoute || ('/' + menuItemURL),
				isPublic: ((isPublic === null || typeof isPublic === 'undefined') ? this.menus[menuId].isPublic : isPublic),
				roles: ((roles === null || typeof roles === 'undefined') ? this.menus[menuId].roles : roles),
				position: position || 0,
				items: [],
				shouldRender: shouldRender
			});

			// Return the menu object
			return this.menus[menuId];
		};

		// Add submenu item object
		this.addSubMenuItem = function(menuId, rootMenuItemURL, menuItemTitle, menuItemURL, menuItemUIRoute, isPublic, roles, position) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Search for menu item
			for (var itemIndex in this.menus[menuId].items) {
				if (this.menus[menuId].items[itemIndex].link === rootMenuItemURL) {
					// Push new submenu item
					this.menus[menuId].items[itemIndex].items.push({
						title: menuItemTitle,
						link: menuItemURL,
						uiRoute: menuItemUIRoute || ('/' + menuItemURL),
						isPublic: ((isPublic === null || typeof isPublic === 'undefined') ? this.menus[menuId].items[itemIndex].isPublic : isPublic),
						roles: ((roles === null || typeof roles === 'undefined') ? this.menus[menuId].items[itemIndex].roles : roles),
						position: position || 0,
						shouldRender: shouldRender
					});
				}
			}

			// Return the menu object
			return this.menus[menuId];
		};

		// Remove existing menu object by menu id
		this.removeMenuItem = function(menuId, menuItemURL) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Search for menu item to remove
			for (var itemIndex in this.menus[menuId].items) {
				if (this.menus[menuId].items[itemIndex].link === menuItemURL) {
					this.menus[menuId].items.splice(itemIndex, 1);
				}
			}

			// Return the menu object
			return this.menus[menuId];
		};

		// Remove existing menu object by menu id
		this.removeSubMenuItem = function(menuId, submenuItemURL) {
			// Validate that the menu exists
			this.validateMenuExistance(menuId);

			// Search for menu item to remove
			for (var itemIndex in this.menus[menuId].items) {
				for (var subitemIndex in this.menus[menuId].items[itemIndex].items) {
					if (this.menus[menuId].items[itemIndex].items[subitemIndex].link === submenuItemURL) {
						this.menus[menuId].items[itemIndex].items.splice(subitemIndex, 1);
					}
				}
			}

			// Return the menu object
			return this.menus[menuId];
		};

		//Adding the topbar menu
		this.addMenu('topbar');
	}
]);
'use strict';

// A service to share objects between controllers
// http://stackoverflow.com/questions/12008908/how-can-i-pass-variables-between-controllers
angular.module('core').service('Shared', [
  function () {
    var showPlayer = {
      show: false
    };
    var playerParams = {
      options: ''
    };

    return {
      getShowPlayer: function () {
        return showPlayer;
      },
      setShowPlayer: function (boolean) {
        showPlayer.show = boolean;
        return showPlayer;
      },
      getPlayerParams: function () {
        return playerParams;
      },
      setPlayerParams: function (options) {
        playerParams.options = options;
        return playerParams;
      }
    };
  }
]);

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

      $scope.play = function () {
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
                  filename: track.filename_128,
                  id: track._id
                });
              });
              // If user requested a track (hit play on track) go to that track
              // http://stackoverflow.com/questions/8668174/indexof-method-in-an-object-array
              if($scope.playerParams.options.start_with) {
                $scope.currentVideo = $scope.videos.map(function(e) { return e.filename; }).indexOf($scope.playerParams.options.start_with);
              }

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




'use strict';

//Player service used to communicate Tracks REST endpoints
angular.module('player').factory('Player', ['$resource',
  function($resource) {
    return $resource('playlist', {}, {});
  }
]);

'use strict';

// Configuring the Articles module
angular.module('tracks').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Tracks', 'tracks', 'dropdown', '/tracks(/create)?');
		Menus.addSubMenuItem('topbar', 'tracks', 'List Tracks', 'tracks');
		Menus.addSubMenuItem('topbar', 'tracks', 'New Track', 'tracks/create');
	}
]);
'use strict';

//Setting up route
angular.module('tracks').config(['$stateProvider',
	function($stateProvider) {
		// Tracks state routing
		$stateProvider.
		state('listTracks', {
			url: '/tracks',
			templateUrl: 'modules/tracks/views/list-tracks.client.view.html'
		}).
		state('createTrack', {
			url: '/tracks/create',
			templateUrl: 'modules/tracks/views/create-track.client.view.html'
		}).
		state('viewTrack', {
			url: '/tracks/:trackId',
			templateUrl: 'modules/tracks/views/view-track.client.view.html'
		}).
		state('editTrack', {
			url: '/tracks/:trackId/edit',
			templateUrl: 'modules/tracks/views/edit-track.client.view.html'
		});
	}
]);
'use strict';

// Tracks controller
angular.module('tracks').controller('TracksController', ['$scope', '$rootScope', '$stateParams', '$location', 'Authentication', 'Tracks', '$sce', '$timeout', 'Shared', '$log', '$window',
    function ($scope, $rootScope, $stateParams, $location, Authentication, Tracks, $sce, $timeout, Shared, $log, $window) {

        $scope.authentication = Authentication;
        $scope.queryLimit = 10;
        $scope.tracksGenre = '';
        $scope.tracksCategory = 'latest';
        $scope.dropdown = {
            title: 'Choose Genre'
        };
        //$scope.mfb = {
        //    state: 'closed'
        //};

        //$scope.log = function(text) {
        //    console.log(text);
        //};

        //splash modal
        //$scope.openSplash = function (details) {
        //    $splash.open({
        //        title: details.title,
        //        artist: details.artist,
        //        label: details.label
        //    });
        //};

        $scope.goBack = function() {
            $window.history.back();
        };

        $scope.genres = [
            'House',
            'Soulful House',
            'Deep House',
            'Afro House',
            'Nu Disco / Indie Dance',
            'Jackin House',
            'Tech House',
            'Techno',
            'Classic House',
            'Soul / Funk / Disco',
            'Lounge / Chill Out',
            'Afro / Latin / Brazilian',
            'Broken Beat / Nu-Jazz',
            'Progressive House',
            'Electro House',
            'Minimal',
            'Electronica',
            'Leftfield',
            'R&B / Hip Hop',
            'DJ Tools',
            'Acapella',
            'Beats'
        ];

        $scope.play = function (options) {
            Shared.setShowPlayer(true);
            options.category = $scope.tracksCategory;
            options.mode = options.mode || 'shuffle';
            options.genre = $scope.tracksGenre;
            Shared.setPlayerParams(options);
            $rootScope.$broadcast('initPlayer');
        };

        //load tracks category
        $scope.loadTracksCategory = function (category) {
            $scope.tracksCategory = category;
            console.log($scope.tracksCategory);
            $scope.find();
        };

        //load tracks genre
        $scope.loadTracksGenre = function (genre) {
            $scope.dropdown.title = genre;
            $scope.tracksGenre = genre === 'All genres' ? '' : genre;
            $scope.find();
        };

        // Dropdown
        // http://stackoverflow.com/questions/28050980/how-can-i-modify-an-angularjs-bootstrap-dropdown-select-so-that-it-does-not-us
        //$scope.ddItems = [
        //    {id: 0, name: 'Soulful House'},
        //    {id: 1, name: 'Deep House'},
        //    {id: 2, name: 'Afro House'},
        //    {id: 3, name: 'All genres'}
        //];

        //$scope.ddItem = null;
        //$scope.ddCallback = function (item) {
        //    $scope.tracksGenre = item.name === 'all genres' ? '' : item.name;
        //    $scope.find();
        //};

        //// Tabs
        //$scope.listTabs = [
        //    {title: 'Trending', icon: 'line-chart', category: ''},
        //    {title: 'Just Added', icon: 'calendar-o', category: ''},
        //    {title: 'Queue', icon: 'clock-o', category: 'queue'},
        //    {title: 'Unheard', icon: 'headphones', category: ''}
        //];
        //
        //$scope.listTabsCallback = function (tabCategory) {
        //    $scope.tracksCategory = tabCategory;
        //    $scope.find();
        //};
        //
        //// View track tabs
        //$scope.viewTabs = [
        //    {title: 'More from ', icon: 'user', category: 'artist'},
        //    {title: 'More on ', icon: 'user-secret', category: 'label'}
        //];
        //
        //$scope.listTabsCallback = function (tabCategory) {
        //    $scope.tracksCategory = tabCategory;
        //    $scope.find();
        //};

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

        // Find a list of Tracks
        $scope.find = function () {
            $scope.queryPage = 1;
            $scope.tracks = Tracks.query({
                    page: $scope.queryPage,
                    limit: $scope.queryLimit,
                    category: $scope.tracksCategory,
                    genre: $scope.tracksGenre
                });
        };

        // Used with infinite scrolling
        // http://stackoverflow.com/questions/20047354/angularjs-push-array-of-data-retrieved-from-a-resource-service-in-another-array
        $scope.findMore = function () {
            $scope.busy = true;
            $scope.queryPage += 1;
            Tracks.query({
                    page: $scope.queryPage,
                    limit: $scope.queryLimit,
                    category: $scope.tracksCategory,
                    genre: $scope.tracksGenre
                },
                function (data) {
                    $scope.tracks.push.apply($scope.tracks, data);
                    $scope.busy = false;
                });
        };

        // Find existing Track
        $scope.findOne = function () {
            $scope.track = Tracks.get({
                trackId: $stateParams.trackId
            });
        };
    }
]);

'use strict';

angular.module('tracks').directive('dropdown', [
  function () {
    return {
      restrict: 'E',
      require: '^ngModel',
      scope: {
        ngModel: '=', // selection
        items: '=',   // items to select from
        callback: '&' // callback
      },
      link: function (scope, element, attrs) {
        element.on('click', function (event) {
          event.preventDefault();
        });

        scope.default = 'Choose genre';
        scope.isButton = 'isButton' in attrs;

        // selection changed handler
        scope.select = function (item) {
          scope.ngModel = item;
          if (scope.callback) {
            scope.callback({item: item});
          }
        };
      },
      templateUrl: 'modules/tracks/views/templates/dropdown.client.view.html'
    };
  }
]);

'use strict';

angular.module('tracks').directive('trackCard', [
	function() {
		return {
            templateUrl: 'modules/tracks/views/templates/track-card.client.view.html'
		};
	}
]);

//angular.module('library').directive('trackCard', [
//	function() {
//		return {
//			template: '<div></div>',
//			restrict: 'E',
//			link: function postLink(scope, element, attrs) {
//				// Track card directive logic
//				// ...
//
//				element.text('this is the trackCard directive');
//			}
//		};
//	}
//]);


'use strict';

//Tracks service used to communicate Tracks REST endpoints
angular.module('tracks').factory('Tracks', ['$resource',
	function($resource) {
		return $resource('tracks/:trackId', { trackId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);

'use strict';

// Config HTTP Error Handling
angular.module('users').config(['$httpProvider',
	function($httpProvider) {
		// Set the httpProvider "not authorized" interceptor
		$httpProvider.interceptors.push(['$q', '$location', 'Authentication',
			function($q, $location, Authentication) {
				return {
					responseError: function(rejection) {
						switch (rejection.status) {
							case 401:
								// Deauthenticate the global user
								Authentication.user = null;

								// Redirect to signin page
								$location.path('signin');
								break;
							case 403:
								// Add unauthorized behaviour 
								break;
						}

						return $q.reject(rejection);
					}
				};
			}
		]);
	}
]);
'use strict';

// Setting up route
angular.module('users').config(['$stateProvider',
	function($stateProvider) {
		// Users state routing
		$stateProvider.
		state('profile', {
			url: '/settings/profile',
			templateUrl: 'modules/users/views/settings/edit-profile.client.view.html'
		}).
		state('password', {
			url: '/settings/password',
			templateUrl: 'modules/users/views/settings/change-password.client.view.html'
		}).
		state('accounts', {
			url: '/settings/accounts',
			templateUrl: 'modules/users/views/settings/social-accounts.client.view.html'
		}).
		state('signup', {
			url: '/signup',
			templateUrl: 'modules/users/views/authentication/signup.client.view.html'
		}).
		state('signin', {
			url: '/signin',
			templateUrl: 'modules/users/views/authentication/signin.client.view.html'
		}).
		state('forgot', {
			url: '/password/forgot',
			templateUrl: 'modules/users/views/password/forgot-password.client.view.html'
		}).
		state('reset-invalid', {
			url: '/password/reset/invalid',
			templateUrl: 'modules/users/views/password/reset-password-invalid.client.view.html'
		}).
		state('reset-success', {
			url: '/password/reset/success',
			templateUrl: 'modules/users/views/password/reset-password-success.client.view.html'
		}).
		state('reset', {
			url: '/password/reset/:token',
			templateUrl: 'modules/users/views/password/reset-password.client.view.html'
		});
	}
]);
'use strict';

angular.module('users').controller('AuthenticationController', ['$scope', '$http', '$location', 'Authentication',
	function($scope, $http, $location, Authentication) {
		$scope.authentication = Authentication;

		// If user is signed in then redirect back home
		if ($scope.authentication.user) $location.path('/');

		$scope.signup = function() {
			$http.post('/auth/signup', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user model
				$scope.authentication.user = response;

				// And redirect to the index page
				$location.path('/');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		$scope.signin = function() {
			$http.post('/auth/signin', $scope.credentials).success(function(response) {
				// If successful we assign the response to the global user model
				$scope.authentication.user = response;

				// And redirect to the index page
				$location.path('/');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);
'use strict';

angular.module('users').controller('PasswordController', ['$scope', '$stateParams', '$http', '$location', 'Authentication',
	function($scope, $stateParams, $http, $location, Authentication) {
		$scope.authentication = Authentication;

		//If user is signed in then redirect back home
		if ($scope.authentication.user) $location.path('/');

		// Submit forgotten password account id
		$scope.askForPasswordReset = function() {
			$scope.success = $scope.error = null;

			$http.post('/auth/forgot', $scope.credentials).success(function(response) {
				// Show user success message and clear form
				$scope.credentials = null;
				$scope.success = response.message;

			}).error(function(response) {
				// Show user error message and clear form
				$scope.credentials = null;
				$scope.error = response.message;
			});
		};

		// Change user password
		$scope.resetUserPassword = function() {
			$scope.success = $scope.error = null;

			$http.post('/auth/reset/' + $stateParams.token, $scope.passwordDetails).success(function(response) {
				// If successful show success message and clear form
				$scope.passwordDetails = null;

				// Attach user profile
				Authentication.user = response;

				// And redirect to the index page
				$location.path('/password/reset/success');
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);
'use strict';

angular.module('users').controller('SettingsController', ['$scope', '$http', '$location', 'Users', 'Authentication',
	function($scope, $http, $location, Users, Authentication) {
		$scope.user = Authentication.user;

		// If user is not signed in then redirect back home
		if (!$scope.user) $location.path('/');

		// Check if there are additional accounts 
		$scope.hasConnectedAdditionalSocialAccounts = function(provider) {
			for (var i in $scope.user.additionalProvidersData) {
				return true;
			}

			return false;
		};

		// Check if provider is already in use with current user
		$scope.isConnectedSocialAccount = function(provider) {
			return $scope.user.provider === provider || ($scope.user.additionalProvidersData && $scope.user.additionalProvidersData[provider]);
		};

		// Remove a user social account
		$scope.removeUserSocialAccount = function(provider) {
			$scope.success = $scope.error = null;

			$http.delete('/users/accounts', {
				params: {
					provider: provider
				}
			}).success(function(response) {
				// If successful show success message and clear form
				$scope.success = true;
				$scope.user = Authentication.user = response;
			}).error(function(response) {
				$scope.error = response.message;
			});
		};

		// Update a user profile
		$scope.updateUserProfile = function(isValid) {
			if (isValid) {
				$scope.success = $scope.error = null;
				var user = new Users($scope.user);

				user.$update(function(response) {
					$scope.success = true;
					Authentication.user = response;
				}, function(response) {
					$scope.error = response.data.message;
				});
			} else {
				$scope.submitted = true;
			}
		};

		// Change user password
		$scope.changeUserPassword = function() {
			$scope.success = $scope.error = null;

			$http.post('/users/password', $scope.passwordDetails).success(function(response) {
				// If successful show success message and clear form
				$scope.success = true;
				$scope.passwordDetails = null;
			}).error(function(response) {
				$scope.error = response.message;
			});
		};
	}
]);
'use strict';

// Authentication service for user variables
angular.module('users').factory('Authentication', [
	function() {
		var _this = this;

		_this._data = {
			user: window.user
		};

		return _this._data;
	}
]);
'use strict';

// Users service used for communicating with the users REST endpoint
angular.module('users').factory('Users', ['$resource',
	function($resource) {
		return $resource('users', {}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);