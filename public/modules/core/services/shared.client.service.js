'use strict';

// A service to share objects between controllers
// http://stackoverflow.com/questions/12008908/how-can-i-pass-variables-between-controllers
angular.module('core').service('Shared', [
  function () {
    var showPlayer = {
      show: false
    };
    var playerParams = {
      category: '',
      genre: ''
    };

    return {
      getShowPlayer: function () {
        return showPlayer;
      },
      setShowPlayer: function () {
        showPlayer.show = true;
        return showPlayer;
      },
      getPlayerParams: function () {
        return playerParams;
      },
      setPlayerParams: function (category, genre) {
        playerParams.category = category;
        playerParams.genre =  genre;
        return playerParams;
      }
    };
  }
]);
