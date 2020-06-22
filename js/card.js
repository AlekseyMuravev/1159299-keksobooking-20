'use strict';

(function () {
  var popupTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var mapFiltersContainer = document.querySelector('.map__filters-container');
  var popupPhotos = popupTemplate.querySelector('.popup__photos');
  var popupPhoto = popupPhotos.querySelector('.popup__photo');

  // заполнение объявления
  var fillingAdvertisement = function (hotel) {
    var hotels = popupTemplate.cloneNode(true);
    hotels.querySelector('.popup__avatar').src = hotel.autor.avatar;
    hotels.querySelector('.popup__title').textContent = hotel.offer.title;
    hotels.querySelector('.popup__text--address').textContent = hotel.offer.address;
    hotels.querySelector('.popup__text--price').textContent = hotel.offer.price + '₽/ночь';

    var typeHouse = hotel.offer.type;
    if (typeHouse === 'flat') {
      hotels.querySelector('.popup__type').textContent = 'Квартира';
    } else if (typeHouse === 'bungalo') {
      hotels.querySelector('.popup__type').textContent = 'Бунгало';
    } else if (typeHouse === 'house') {
      hotels.querySelector('.popup__type').textContent = 'Дом';
    } else {
      hotels.querySelector('.popup__type').textContent = 'Дворец';
    }

    hotels.querySelector('.popup__text--capacity').textContent = hotel.offer.rooms + ' комнаты для ' + hotel.offer.guests + ' гостей';
    hotels.querySelector('.popup__text--time').textContent = 'Заезд после ' + hotel.offer.checkin + ', выезд до ' + hotel.offer.checkout;
    hotels.querySelector('.popup__description').textContent = hotel.offer.description;
    hotels.querySelector('.popup__photo').remove();

    var popupPhotoContainer = hotels.querySelector('.popup__photos');

    for (var i = 0; i < hotel.offer.photos.length; i++) {
      var newImg = popupPhoto.cloneNode(true);
      newImg.src = hotel.offer.photos[i];
      popupPhotoContainer.appendChild(newImg);
    }

    var popupFeatures = hotels.querySelector('.popup__features');

    for (var j = 0; j < popupFeatures.childElementCount; j++) {
      popupFeatures.children[j].classList.add('hidden');
    }

    for (var k = 0; k < hotel.offer.features.length; k++) {
      var feature = hotel.offer.features[k];
      var featureNode = hotels.querySelector('.popup__feature--' + feature);
      featureNode.classList.remove('hidden');
    }

    mapFiltersContainer.prepend(hotels);
  };

  fillingAdvertisement(window.data.advertisements[0]);

  var adForm = document.querySelector('.ad-form');
  var allFieldset = adForm.querySelectorAll('fieldset');

  var fieldsetDissablet = function () {
    for (var i = 0; i < allFieldset.length; i++) {
      allFieldset[i].setAttribute('disabled', 'disabled');
    }
  };

  fieldsetDissablet();
  window.card = {
    fillingAdvertisement: fillingAdvertisement,
  };
})();
