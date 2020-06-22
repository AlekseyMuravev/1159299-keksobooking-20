'use strict';

(function () {
  var HEADER = ['Привет', 'Добрый день', 'Добро пожаловать', 'Здорова', 'Добрый вечер', 'Хай', 'Здравствуйте', 'Доброе утро'];
  var TYPE_HOTEL = ['palace', 'flat', 'house', 'bungalo'];
  var TIME_CHEC = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var DESCRIPTION = ['Хороший отель', 'Чисты отель', 'Дорогой отель', 'Рядом с городом', 'Рядом с морем', 'Рядом с парком', 'Отель с аквапарком', 'Отель с кинотеатром'];
  var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var WIDTH_MAP = document.querySelector('.map').offsetWidth;
  var WIDTH_MAP_PIN = document.querySelector('.map__pin').offsetWidth;
  var HEIGHT_MAP_PIN = document.querySelector('.map__pin').offsetHeight;

  var advertisements = [];

  // массив объявлений
  var createAdvertisements = function () {
    for (var i = 0; i < 8; i++) {
      advertisements.push(createAdvertisement(i));
    }
  };

  // случайное число из диапазона
  var getRandomArbitrary = function (min, max) {
    return Math.random() * (max - min) + min;
  };

  // создаем объявление
  var createAdvertisement = function (index) {
    var advertisement = {};
    var autor = {};
    var offer = {};
    var location = {};
    advertisement.autor = autor;
    autor.avatar = arayAutor(index);

    advertisement.location = location;

    location.x = Math.round(getRandomArbitrary(0 + WIDTH_MAP_PIN / 2, WIDTH_MAP - WIDTH_MAP_PIN / 2));
    location.y = Math.round(getRandomArbitrary(130 + HEIGHT_MAP_PIN, 630));

    advertisement.offer = offer;

    offer.title = HEADER[index];
    offer.address = location.x + ', ' + location.y;
    offer.price = (Math.round(getRandomArbitrary(1000, 5000) / 10)) * 10;
    offer.type = TYPE_HOTEL[Math.round(getRandomArbitrary(0, TYPE_HOTEL.length - 1))];
    offer.rooms = Math.round(getRandomArbitrary(1, 5));
    offer.guests = offer.rooms * 2;
    offer.checkin = TIME_CHEC[Math.round(getRandomArbitrary(0, TIME_CHEC.length - 1))];
    offer.checkout = TIME_CHEC[Math.round(getRandomArbitrary(0, TIME_CHEC.length - 1))];
    offer.features = shuffle(FEATURES).slice(Math.round(getRandomArbitrary(0, FEATURES.length - 1)));
    offer.description = DESCRIPTION[Math.round(getRandomArbitrary(0, DESCRIPTION.length - 1))];
    offer.photos = shuffle(PHOTOS).slice(Math.round(getRandomArbitrary(0, PHOTOS.length - 1)));

    return advertisement;
  };

  // функция перемешивания массива
  function shuffle(array) {
    var currentIndex = array.length;
    var temporaryValue;
    var randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

  // число для фотографии
  var arayAutor = function (index) {
    return 'img/avatars/user0' + (index + 1) + '.png';
  };

  createAdvertisements();

  window.data = {
    advertisements: advertisements,
    HEIGHT_MAP_PIN: HEIGHT_MAP_PIN,
    WIDTH_MAP_PIN: WIDTH_MAP_PIN,
  };
})();
