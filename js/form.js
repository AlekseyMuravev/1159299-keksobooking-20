'use strict';

(function () {
  var form = document.querySelector('.ad-form');
  var roomNumber = form.querySelector('select[name=rooms]');
  var capacity = form.querySelector('select[name=capacity]');
  var capacityValue = parseInt(capacity.value, 10);
  var roomNumberValue = parseInt(roomNumber.value, 10);

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

  var typeHotel = form.querySelector('select[name=type]');
  var price = form.querySelector('input[name=price]');

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

  var timeIn = form.querySelector('select[name=timein]');
  var timeOut = form.querySelector('select[name=timeout]');
  var fieldsetTime = form.querySelector('.ad-form__element--time');

  var filterTime = function (evt) {
    timeOut.value = evt.target.value;
    timeIn.value = evt.target.value;
  };

  fieldsetTime.addEventListener('change', filterTime);

  var successTemplate = document.querySelector('#success').content
    .querySelector('.success__message');
  var main = document.querySelector('main');

  var renderSuccessMessage = function () {
    var message = successTemplate.cloneNode();
    main.appendChild(message);

    document.addEventListener('keydown', removeMessage);
    document.addEventListener('mousedown', removeMessage);
  };

  var errorTemplate = document.querySelector('#success').content
    .querySelector('.success__message');

  var renderErrorMessage = function () {
    var message = errorTemplate.cloneNode();
    main.appendChild(message);

    // document.addEventListener('keydown', removeMessage);
    // document.addEventListener('mousedown', removeMessage);
  };

  form.addEventListener('submit', function (evt) {
    window.uploadData(new FormData(form), successHandler, errorHandler)
    evt.preventDefault();
  });

  var successHandler = function () {
    window.map.lockMap();
    form.reset();
    renderSuccessMessage();
  };

  var errorHandler = function () {
    renderErrorMessage();
  };

  var removeMessage = function (evt) {
    var successMessage = document.querySelector('.success__message');
    if (evt.key === 'Escape' || evt.which === 1) {
      var target = evt.target;
      if (successMessage.style.left !== target) {
        successMessage.remove();
      }
      document.removeEventListener('keydown', removeMessage);
      document.removeEventListener('mousedown', removeMessage);
    }
  };
})();


