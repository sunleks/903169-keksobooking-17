'use strict'

function getRandomInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var pin = document.querySelector('#pin').content.querySelector('.map__pin');
var imgPin =  pin.querySelector('img');

var pins = document.querySelector('.map__pins')


  var arrayObj = [
    {
    "author": {
      "avatar": 'img/avatars/user0' + i + '.png'
      }
    },
    {
    "offer": {
      "type": ['palace', 'flat', 'house', 'bungalo']
      }
    },
    {
    "location": {
      "x": getRandomInRange(0, 600),
      "y": getRandomInRange(130, 160)
      }
    }
  ];

for (var i = 0; i <= 8; i++) {
  var pinsElement = pin.cloneNode(true);
  pinsElement.style.left = arrayObj[2].location.x;
  pinsElement.style.top = arrayObj[2].location.y;

  var pinsElementImgPin = imgPin.cloneNode(true);
  pinsElementImgPin.src = arrayObj[0].author.avatar;
  console.log(pinsElementImgPin.src);


  pins.appendChild(pinsElement);
  pins.appendChild(pinsElementImgPin);
};

