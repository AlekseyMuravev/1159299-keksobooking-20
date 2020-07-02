'use strict';

(function () {
  var WIDTH_MAP = document.querySelector('.map').offsetWidth;
  var WIDTH_MAP_PIN = document.querySelector('.map__pin').offsetWidth;
  var HEIGHT_MAP_PIN = document.querySelector('.map__pin').offsetHeight;
  var HTML = document.querySelector('html').offsetWidth;
  var MAP_PIN_MAIN = document.querySelector('.map__pin--main');

  var mapPinMainX = MAP_PIN_MAIN.style.left;
  var mapPinMainY = MAP_PIN_MAIN.style.top;

  var advertisements = [];

  var successHandler = function (Arr) {
    for (var i = 0; i < Arr.length; i++) {
      advertisements.push(Arr[i]);
    }

    window.card.renderCard(advertisements[0]);
    window.pin.renderPins(advertisements);
  };

  var errorHandler = function () {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.data = {
    HEIGHT_MAP_PIN: HEIGHT_MAP_PIN,
    WIDTH_MAP_PIN: WIDTH_MAP_PIN,
    WIDTH_MAP: WIDTH_MAP,
    HTML: HTML,
    mapPinMainX: mapPinMainX,
    mapPinMainY: mapPinMainY,
    successHandler: successHandler,
    errorHandler: errorHandler,
  };
})();
