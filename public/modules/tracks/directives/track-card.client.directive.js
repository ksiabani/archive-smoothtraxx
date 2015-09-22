'use strict';

angular.module('tracks').directive('trackCard', [
	function() {
		return {
            templateUrl: 'modules/tracks/views/templates/track-card.client.view.html'
		};
	}
]);
