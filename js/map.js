'use strict';

(function () {
  var map = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var mapPins = document.querySelector('.map__pins');
  var mapPinMain = document.querySelector('.map__pin--main');
  var mapPinAll = mapPins.querySelectorAll('.map__pin');
  var popupCard = document.querySelector('.map__card');
  var allFieldset = adForm.querySelectorAll('fieldset');
  popupCard.classList.add('hidden');

  // разблокировка карты
  var activeForm = function () {
    map.classList.remove('map--faded');
    for (var i = 0; i < allFieldset.length; i++) {
      allFieldset[i].removeAttribute('disabled');
    }
    adForm.classList.remove('ad-form--disabled');
    for (var j = 1; j < mapPinAll.length; j++) {
      mapPinAll[j].classList.remove('hidden');
    }
    if (popupCard.classList.contains('hidden')) {
      popupCard.classList.remove('hidden');
    }
  };

  // разблокировка карты мышкой
  mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    if (evt.which === 1) {
      activeForm();
    }
  });

  // // разблокировка карты клавиатурой
  mapPinMain.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      activeForm();
    }
  });

  var popupClose = document.querySelector('.popup__close');

  var onPopupEscPress = function (evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      closePopup();
    }
  };

  document.addEventListener('keydown', onPopupEscPress);

  var closePopup = function () {
    document.removeEventListener('keydown', onPopupEscPress);
    popupCard.remove();
  };

  popupClose.addEventListener('click', function () {
    closePopup();
  });

  var openPopup = function (index) {
    if (popupCard) {
      closePopup();
      window.card.fillingAdvertisement(window.data.advertisements[index]);
    } else {
      window.card.fillingAdvertisement(window.data.advertisements[index]);
    }
  };
  var mapFiltersContainer = document.querySelector('.map__filters-container');

  // откртыие попапа мышкой
  var openPopupMouse = function (element, index) {
    element.addEventListener('mousedown', function (evt) {
      evt.preventDefault();
      popupCard = mapFiltersContainer.querySelector('.map__card');

      if (evt.which === 1) {
        openPopup(index);
      }

      popupClose = document.querySelector('.popup__close');
      popupCard = mapFiltersContainer.querySelector('.map__card');

      document.addEventListener('keydown', onPopupEscPress);
      popupClose.addEventListener('click', function () {
        closePopup();
      });
    });
  };

  // откртыие попапа Enter
  var openPopupKey = function (element, index) {
    element.addEventListener('keydown', function (evt) {
      popupCard = mapFiltersContainer.querySelector('.map__card');

      if (evt.key === 'Enter') {
        openPopup(index);
      }

      popupClose = document.querySelector('.popup__close');
      popupCard = mapFiltersContainer.querySelector('.map__card');

      document.addEventListener('keydown', onPopupEscPress);
      popupClose.addEventListener('click', function () {
        closePopup();
      });
    });
  };

  for (var i = 1; i < mapPinAll.length; i++) {
    openPopupMouse(mapPinAll[i], i - 1);
    openPopupKey(mapPinAll[i], i - 1);
  }

  // перемещение клавной метки мышкой
  var marginsMap = (window.data.HTML - window.data.WIDTH_MAP) / 2;
  var coodrdsPin = {
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

        if (startCoords.x >= coodrdsPin.left + marginsMap && startCoords.x <= coodrdsPin.right + marginsMap) {
          mapPinMain.style.left = startCoords.x - marginsMap - window.data.WIDTH_MAP_PIN / 2 + 'px';
        };

        if (startCoords.y >= coodrdsPin.top && startCoords.y <= coodrdsPin.bottom) {
          mapPinMain.style.top = startCoords.y - window.data.HEIGHT_MAP_PIN / 2 + 'px';
        };
      };

      var onMouseUp = function (moveEvt) {
        moveEvt.preventDefault();

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);

        var address = document.querySelector('input[name=address]');
        var pinMainTop = parseInt(mapPinMain.style.top, 10) + window.data.HEIGHT_MAP_PIN + 16;
        var pinMainLeft = Math.round(parseInt(mapPinMain.style.left, 10) + window.data.WIDTH_MAP_PIN / 2 - 2);
        var addressFromPin = pinMainLeft + 'px' + ', ' + pinMainTop + 'px';
        address.value = addressFromPin;
      };
    }
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
