'use strict'

function getRandomInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var pin = document.querySelector('#pin').content.querySelector('.map__pin');
var imgPin =  pin.querySelector('img');

var mapPins = document.querySelector('.map__pins')


  var arrayObj = {
    "author": {
      "avatar": 'img/avatars/user0.png'
      },
    "offer": {
      "type": ['palace', 'flat', 'house', 'bungalo']
      },
    "location": {
      "x": '',/*getRandomInRange(0, 600)*/
      "y": ''/*getRandomInRange(130, 160)*/
      }
  };

for (var i = 1; i <= 8; i++) {
  var pinsElement = pin.cloneNode(true);

  /*Присваиваиваем раномное число координатам х и y*/
  arrayObj.location.x = getRandomInRange(0, 600);
  arrayObj.location.y = getRandomInRange(130, 160);
  /*Добавляем рандомному числу px*/
  pinsElement.style.left = arrayObj.location.x + 'px';
  pinsElement.style.top = arrayObj.location.y + 'px';

  var pinsElementImgPin = imgPin.cloneNode(true);

  /*Перебираем аватары пользователей*/
  arrayObj.author.avatar = 'img/avatars/user0' + i + '.png';
  pinsElementImgPin.src = arrayObj.author.avatar;

  console.log(pinsElementImgPin.src);
  /*Создаём переменную, которая будет брать раномные числа из диапазона от 0 до 3 и присваиваем alt
  рандомное значение*/
  var rand = getRandomInRange(0, arrayObj.offer.type.length - 1);
  pinsElementImgPin.alt = arrayObj.offer.type[rand];


  mapPins.appendChild(pinsElement);
  mapPins.appendChild(pinsElementImgPin);
};

