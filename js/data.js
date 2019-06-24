'use strict';
(function () {
  var pin = document.querySelector('#pin').content.querySelector('.map__pin');

  function getRandomInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  var MOCK = {
    'author': {
      'avatar': 'img/avatars/user0.png'
    },
    'offer': {
      'type': ['palace', 'flat', 'house', 'bungalo']
    },
    'location': {
      'x': '',
      'y': ''
    },
    'header': {
      'name': ['лучшеее', 'замечательное', 'пойдёт', 'горящее предложение']
    }
  };

  var getDataMass = function () {
    var arr = [];
    for (var i = 0; i < 8; i++) {
      arr [i] = {
        'author': {
          'avatar': 'img/avatars/user0' + (i + 1) + '.png'
        },
        'offer': {
          'type': MOCK.offer.type[getRandomInRange(0, MOCK.offer.type.length - 1)]
        },
        'location': {
          'x': getRandomInRange(0, 1150),
          'y': getRandomInRange(130, 630)
        },
        'header': {
          'name': MOCK.header.name[getRandomInRange(0, MOCK.header.name.length - 1)]
        }
      };
    }
    return arr;
  };

  window.data = getDataMass();

  window.createPin = function (indicators) {
    var element = pin.cloneNode(true);
    element.style.left = indicators.location.x + 'px';
    element.style.top = indicators.location.y + 'px';
    element.querySelector('img').src = indicators.author.avatar;
    element.querySelector('img').alt = indicators.header.name;
    return element;
  };
})();
