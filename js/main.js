'use strict'

var pin = document.querySelector('#pin').content.querySelector('.map__pin');
var mapPins = document.querySelector('.map__pins')

function getRandomInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var MOCK = {
  "author": {
    "avatar": 'img/avatars/user0.png'
  },
  "offer": {
    "type": ['palace', 'flat', 'house', 'bungalo']
  },
  "location": {
    "x": '',
    "y": ''
  },
  "header": {
    "name": ['лучшеее жильё', 'замечательное жильё', 'пойдёт', 'горящее предложение']
  }
};

var getDataMass = function () {
  var arr = [];
  for (var i = 0; i < 8; i++) {
    arr [i] = {
      "author": {
        "avatar": 'img/avatars/user0' + parseInt(i + 1) + '.png'
      },
      "offer": {
        "type": MOCK.offer.type[getRandomInRange(0, MOCK.offer.type.length - 1)]
      },
      "location": {
        "x": getRandomInRange(0, 1150),
        "y": getRandomInRange(130, 630)
      },
      "header": {
        "name": MOCK.header.name[getRandomInRange(0, MOCK.header.name.length - 1)]
      }
    }
  }
  return arr;
};


var data = getDataMass();
console.log(data);

for (var i = 0; i < data.length; i++) {
  var element = pin.cloneNode(true);
  element.style.left = data[i].location.x + 'px';
  element.style.top = data[i].location.y + 'px';
  element.querySelector('img').src = data[i].author.avatar;
  element.querySelector('img').alt = data[i].header.name;
  mapPins.appendChild(element);
}
