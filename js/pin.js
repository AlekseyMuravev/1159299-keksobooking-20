'use strict';

(function () {
  var pinTemplate = document.querySelector('#pin').content;
  var mapPins = document.querySelector('.map__pins');

  // функция для рендеринга меток на карте
  var fillinkPinMap = function (pinMap) {
    var pinsMap = pinTemplate.cloneNode(true);
    pinsMap.querySelector('.map__pin').style.left = pinMap.location.x + 'px';
    pinsMap.querySelector('.map__pin').style.top = pinMap.location.y + 'px';
    pinsMap.querySelector('img').src = pinMap.autor.avatar;
    pinsMap.querySelector('img').alt = pinMap.offer.title;
    mapPins.appendChild(pinsMap);
  };

  for (var i = 0; i < window.data.advertisements.length; i++) {
    fillinkPinMap(window.data.advertisements[i]);
  }

  var mapPinAll = mapPins.querySelectorAll('.map__pin');
  for (var j = 1; j < mapPinAll.length; j++) {
    mapPinAll[j].classList.add('hidden');
  }
})();
