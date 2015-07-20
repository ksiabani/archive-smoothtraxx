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
