'use strict';

(function () {
  // валидация формы
  var adForm = document.querySelector('.ad-form');
  var roomNumber = adForm.querySelector('select[name=rooms]');
  var capacity = adForm.querySelector('select[name=capacity]');
  var capacityValue = parseInt(capacity.value, 10);
  var roomNumberValue = parseInt(roomNumber.value, 10);

  // сравнение значений комнат и гостей
  var capacityFromRooms = function (roomValue, capacitysValue) {
    if (capacitysValue > roomValue) {
      capacity.setCustomValidity('колличество гостей больше, чем комнат');
    } else if (capacitysValue === 0 && roomValue !== 100) {
      capacity.setCustomValidity('колличество гостей больше, чем комнат');
    } else if (capacitysValue !== 0 && roomValue === 100) {
      capacity.setCustomValidity('колличество гостей больше, чем комнат');
    } else {
      capacity.setCustomValidity('');
    }
  };

  capacityFromRooms(roomNumberValue, capacityValue);

  capacity.addEventListener('change', function () {
    capacityValue = parseInt(capacity.value, 10);
    roomNumberValue = parseInt(roomNumber.value, 10);

    capacityFromRooms(roomNumberValue, capacityValue);
  });

  roomNumber.addEventListener('change', function () {
    capacityValue = parseInt(capacity.value, 10);
    roomNumberValue = parseInt(roomNumber.value, 10);

    capacityFromRooms(roomNumberValue, capacityValue);
  });

  var typeHotel = adForm.querySelector('select[name=type]');
  var price = adForm.querySelector('input[name=price]');

  // минимальная цена за жилье
  var valuePricefromTypeHotel = function () {
    if (typeHotel.value === 'bungalo') {
      price.value = 0;
    } else if (typeHotel.value === 'flat') {
      price.value = 1000;
    } else if (typeHotel.value === 'house') {
      price.value = 5000;
    } else {
      price.value = 10000;
    }
  };

  // оповещение при нарушении цены за жилье
  var validityPrice = function () {
    if (typeHotel.value === 'flat' && price.value < 1000) {
      price.setCustomValidity('минимальная цена 1000');
    } else if (typeHotel.value === 'house' && price.value < 5000) {
      price.setCustomValidity('минимальная цена 5000');
    } else if (typeHotel.value === 'palace' && price.value < 10000) {
      price.setCustomValidity('минимальная цена 10000');
    } else if (price.value > 1000000) {
      price.setCustomValidity('максимальная цена 100000');
    } else {
      price.setCustomValidity('');
    }
  };

  valuePricefromTypeHotel();

  typeHotel.addEventListener('change', function () {
    valuePricefromTypeHotel();
    validityPrice();
  });

  price.addEventListener('input', function () {
    validityPrice();
  });

  var timeIn = adForm.querySelector('select[name=timein]');
  var timeOut = adForm.querySelector('select[name=timeout]');
  var fieldsetTime = adForm.querySelector('.ad-form__element--time');

  // время заезда - выезда
  var filterTime = function (evt) {
    timeOut.value = evt.target.value;
    timeIn.value = evt.target.value;
  };

  fieldsetTime.addEventListener('change', filterTime);
})();
