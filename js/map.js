'use strict';

(function () {
  var map = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var mapPinMain = document.querySelector('.map__pin--main');
  var allFieldset = adForm.querySelectorAll('fieldset');
  var ADDRESS = document.querySelector('input[name=address]');

  var addressFromMainPin = function () {
    var pinMainTop = parseInt(mapPinMain.style.top, 10) + window.data.HEIGHT_MAP_PIN + 16;
    var pinMainLeft = Math.round(parseInt(mapPinMain.style.left, 10) + window.data.WIDTH_MAP_PIN / 2 - 2);
    var addressFromPin = pinMainLeft + 'px' + ', ' + pinMainTop + 'px';
    ADDRESS.value = addressFromPin;
  };

  // разблокировка карты
  var unlockMap = function (evt) {
    if (evt.which === 1 || evt.key === 'Enter') {
      window.load.loadData(window.data.successHandler, window.data.errorHandler);
      map.classList.remove('map--faded');
      adForm.classList.remove('ad-form--disabled');

      for (var i = 0; i < allFieldset.length; i++) {
        allFieldset[i].removeAttribute('disabled');
      }

      addressFromMainPin();

      mapPinMain.removeEventListener('mousedown', unlockMap);
      mapPinMain.removeEventListener('keydown', unlockMap);
    }
  };

  mapPinMain.addEventListener('mousedown', unlockMap);
  mapPinMain.addEventListener('keydown', unlockMap);

  // перемещение метки мышкой
  var marginsMap = (window.data.HTML - window.data.WIDTH_MAP) / 2;
  var maxMove = {
    left: 0,
    right: window.data.WIDTH_MAP,
    top: 130,
    bottom: 630,
  };

  mapPinMain.addEventListener('mousedown', function (evt) {
    if (evt.which === 1) {
      evt.preventDefault();

      var startCoords = {
        x: evt.pageX,
        y: evt.pageY,
      };

      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();

        startCoords = {
          x: moveEvt.pageX,
          y: moveEvt.pageY,
        };

        var coodrdsPinLeft = maxMove.left + marginsMap;
        var coodrdsPinRight = maxMove.right + marginsMap;

        if (startCoords.x >= coodrdsPinLeft && startCoords.x <= coodrdsPinRight) {

          mapPinMain.style.left = startCoords.x - marginsMap - window.data.WIDTH_MAP_PIN / 2 + 'px';
        }

        var coodrdsPinTop = maxMove.top;
        var coodrdsPinBottom = maxMove.bottom;

        if (startCoords.y >= coodrdsPinTop && startCoords.y <= coodrdsPinBottom) {
          mapPinMain.style.top = startCoords.y - window.data.HEIGHT_MAP_PIN / 2 + 'px';
        }
      };

      var onMouseUp = function (moveEvt) {
        moveEvt.preventDefault();

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);

        addressFromMainPin();
      };
    }
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
