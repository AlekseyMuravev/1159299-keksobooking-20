'use strict';

(function () {
  var pinTemplate = document.querySelector('#pin').content;
  var mapPins = document.querySelector('.map__pins');

  // функция для рендеринга меток на карте
  var fillinkPinMap = function (pinMap) {
    var pinsMap = pinTemplate.cloneNode(true);
    pinsMap.querySelector('.map__pin').style.left = pinMap.location.x + 'px';
    pinsMap.querySelector('.map__pin').style.top = pinMap.location.y + 'px';
    pinsMap.querySelector('img').src = pinMap.author.avatar;
    pinsMap.querySelector('img').alt = pinMap.offer.title;
    mapPins.appendChild(pinsMap);
  };

  for (var i = 0; i < window.data.advertisements.length; i++) {
    fillinkPinMap(window.data.advertisements[i]);
  }

  // var successHandler = function (pinsMap) {
  //   var fragment = document.createDocumentFragment();

  //   mapPins.appendChild(fragment);
  //   for (var i = 0; i < pinsMap.length; i++) {
  //     if (pinsMap[i].author.avatar.includes('img/avatars/user0')) {
  //       fillinkPinMap(pinsMap[i])
  //     }
  //   }
  // };

  // var errorHandler = function (errorMessage) {
  //   var node = document.createElement('div');
  //   node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
  //   node.style.position = 'absolute';
  //   node.style.left = 0;
  //   node.style.right = 0;
  //   node.style.fontSize = '30px';

  //   node.textContent = errorMessage;
  //   document.body.insertAdjacentElement('afterbegin', node);
  // };

  // window.pin = {
  //   successHandler: successHandler,
  //   errorHandler: errorHandler,
  // }

  // window.load.loadData(window.pin.successHandler, window.pin.errorHandler);

  // window.load.loadData(successHandler, errorHandler);

  var mapPinAll = document.querySelectorAll('.map__pin');



  for (var i = 1; i < mapPinAll.length; i++) {
    mapPinAll[i].classList.add('hidden');
  }
})();
