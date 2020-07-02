'use strict';

(function () {
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var mapFiltersContainer = document.querySelector('.map__filters-container');
  var popupPhotos = cardTemplate.querySelector('.popup__photos');
  var popupPhoto = popupPhotos.querySelector('.popup__photo');

  // заполнение объявления
  var renderCard = function (hotel) {
    var cardNode = cardTemplate.cloneNode(true);
    cardNode.querySelector('.popup__avatar').src = hotel.author.avatar;
    cardNode.querySelector('.popup__title').textContent = hotel.offer.title;
    cardNode.querySelector('.popup__text--address').textContent = hotel.offer.address;
    cardNode.querySelector('.popup__text--price').textContent = hotel.offer.price + '₽/ночь';

    var typeHouse = hotel.offer.type;
    if (typeHouse === 'flat') {
      cardNode.querySelector('.popup__type').textContent = 'Квартира';
    } else if (typeHouse === 'bungalo') {
      cardNode.querySelector('.popup__type').textContent = 'Бунгало';
    } else if (typeHouse === 'house') {
      cardNode.querySelector('.popup__type').textContent = 'Дом';
    } else {
      cardNode.querySelector('.popup__type').textContent = 'Дворец';
    }

    cardNode.querySelector('.popup__text--capacity').textContent = hotel.offer.rooms + ' комнаты для ' + hotel.offer.guests + ' гостей';
    cardNode.querySelector('.popup__text--time').textContent = 'Заезд после ' + hotel.offer.checkin + ', выезд до ' + hotel.offer.checkout;
    cardNode.querySelector('.popup__description').textContent = hotel.offer.description;
    cardNode.querySelector('.popup__photo').remove();

    var popupPhotoContainer = cardNode.querySelector('.popup__photos');

    for (var i = 0; i < hotel.offer.photos.length; i++) {
      var newImg = popupPhoto.cloneNode(true);
      newImg.src = hotel.offer.photos[i];
      popupPhotoContainer.appendChild(newImg);
    }

    var popupFeatures = cardNode.querySelector('.popup__features');

    for (var j = 0; j < popupFeatures.childElementCount; j++) {
      popupFeatures.children[j].classList.add('hidden');
    }

    for (var k = 0; k < hotel.offer.features.length; k++) {
      var feature = hotel.offer.features[k];
      var featureNode = cardNode.querySelector('.popup__feature--' + feature);
      featureNode.classList.remove('hidden');
    }

    mapFiltersContainer.prepend(cardNode);

    var popupClose = document.querySelector('.map .popup__close');

    popupClose.addEventListener('mousedown', function (evt) {
      if (evt.which === 1) {
        closePopup();
      }
    });

    popupClose.addEventListener('keydown', function (evt) {
      if (evt.key === 'Enter') {
        closePopup();
      }
    });

    document.addEventListener('keydown', onPopupEscPress);
  };

  var adForm = document.querySelector('.ad-form');
  var allFieldset = adForm.querySelectorAll('fieldset');

  var fieldsetDissablet = function () {
    for (var i = 0; i < allFieldset.length; i++) {
      allFieldset[i].setAttribute('disabled', 'disabled');
    }
  };

  var closePopup = function () {
    var popupCard = document.querySelector('.map .map__card');
    document.removeEventListener('keydown', onPopupEscPress);
    popupCard.remove();
  };

  var openPopup = function (index) {
    var popupCard = document.querySelector('.map .map__card');
    if (popupCard) {
      closePopup();
    }
    renderCard(index);
  };

  var onPopupEscPress = function (evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      closePopup();
    }
  };

  fieldsetDissablet();

  window.card = {
    renderCard: renderCard,
    openPopup: openPopup,
  };
})();
