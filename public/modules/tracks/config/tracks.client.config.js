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