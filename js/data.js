'use strict';

(function () {
  var WIDTH_MAP = document.querySelector('.map').offsetWidth;
  var WIDTH_MAP_PIN = document.querySelector('.map__pin').offsetWidth;
  var HEIGHT_MAP_PIN = document.querySelector('.map__pin').offsetHeight;
  var HTML = document.querySelector('html').offsetWidth;

  var advertisements = [];

  var successHandlerArrr = function (Arr) {
    for (var i = 0; i < Arr.length; i++) {
      if (Arr[i].author.avatar.includes('img/avatars/user0')) {
        advertisements.push(Arr[0]);
      }
    }
  };

  var errorHandlerArrr = function () {
    // var node = document.createElement('div');
    // node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    // node.style.position = 'absolute';
    // node.style.left = 0;
    // node.style.right = 0;
    // node.style.fontSize = '30px';

    // node.textContent = errorMessage;
    // document.body.insertAdjacentElement('afterbegin', node);
  };

  window.load.loadData(successHandlerArrr, errorHandlerArrr);

  window.data = {
    advertisements: advertisements,
    HEIGHT_MAP_PIN: HEIGHT_MAP_PIN,
    WIDTH_MAP_PIN: WIDTH_MAP_PIN,
    WIDTH_MAP: WIDTH_MAP,
    HTML: HTML,
  };
})();
