'use strict';

(function () {
  var map = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var mapPinMain = document.querySelector('.map__pin--main');
  var popupCard = document.querySelector('.map__card');
  var allFieldset = adForm.querySelectorAll('fieldset');

  // разблокировка карты
  var activeForm = function () {
    map.classList.remove('map--faded');
    for (var i = 0; i < allFieldset.length; i++) {
      allFieldset[i].removeAttribute('disabled');
    }

    window.load.loadData(window.pin.successHandler, window.pin.errorHandler);
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

  // открытие/закрытие попапа
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

  // popupClose.addEventListener('click', function () {
  //   closePopup();
  // });

  var openPopup = function (index) {
    if (popupCard) {
      closePopup();
      window.card.fillingAdvertisement(index);
    } else {
      window.card.fillingAdvertisement(index);
    }
  };

  // делегирование клика по кнопкам и открывает попап
  function clickOnMapPins(evt) {
    var styleLeft = evt.target.style.left;
    var styleTop = evt.target.style.top;

    for (var i = 0; i < window.data.advertisements.length; i++) {
      if (window.data.advertisements[i].offer.title === evt.target.alt || window.data.advertisements[i].location.x + 'px' + ', ' + window.data.advertisements[i].location.y + 'px' === styleLeft + ', ' + styleTop) {
        openPopup(window.data.advertisements[i]);
        popupClose = document.querySelector('.popup__close');
        popupCard = document.querySelector('.map__card');
        popupClose.addEventListener('click', function () {
          closePopup();
        });
        document.addEventListener('keydown', onPopupEscPress);
      }
    }
  }

  var mapPins = document.querySelector('.map__pins');
  var popupClose = document.querySelector('.popup__close');

  mapPins.addEventListener('mousedown', function (evt) {
    var button = evt.target.closest('button');
    if (button) {
      if (evt.which === 1) {
        clickOnMapPins(evt);
      }
    }
  });

  mapPins.addEventListener('keydown', function (evt) {
    var button = evt.target.closest('button');
    if (button) {
      if (evt.key === 'Enter') {
        clickOnMapPins(evt);
      }
    }
  });

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
        }

        if (startCoords.y >= coodrdsPin.top && startCoords.y <= coodrdsPin.bottom) {
          mapPinMain.style.top = startCoords.y - window.data.HEIGHT_MAP_PIN / 2 + 'px';
        }
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
