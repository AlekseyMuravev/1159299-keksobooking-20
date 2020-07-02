'use strict';

(function () {
  var pinTemplate = document.querySelector('#pin').content;
  var mapPins = document.querySelector('.map__pins');

  var renderPins = function (advertisements) {
    for (var i = 0; i < advertisements.length; i++) {
      var advertisement = advertisements[i];
      renderPin(advertisement);
    }
  };

  var renderPin = function (advertisement) {
    var pinNode = pinTemplate.cloneNode(true);
    var pinButton = pinNode.querySelector('.map__pin');

    pinButton.style.left = advertisement.location.x + 'px';
    pinButton.style.top = advertisement.location.y + 'px';

    var pinImg = pinNode.querySelector('img');

    pinImg.src = advertisement.author.avatar;
    pinImg.alt = advertisement.offer.title;

    pinButton.addEventListener('mousedown', function (evt) {
      clickOnMapPin(advertisement, evt);
    });

    pinButton.addEventListener('keydown', function (evt) {
      clickOnMapPin(advertisement, evt);
    });

    mapPins.appendChild(pinNode);
  };

  function clickOnMapPin(advertisement, evt) {
    if (evt.which === 1 || evt.key === 'Enter') {
      window.card.openPopup(advertisement);
    }
  }

  window.pin = {
    renderPins: renderPins,
  };
})();
