'use strict';

var pin = document.querySelector('#pin').content.querySelector('.map__pin');
var mapPins = document.querySelector('.map__pins');

function getRandomInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var map = document.querySelector('.map');

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

var data = getDataMass();

var createPin = function (indicators) {
  var element = pin.cloneNode(true);
  element.style.left = indicators.location.x + 'px';
  element.style.top = indicators.location.y + 'px';
  element.querySelector('img').src = indicators.author.avatar;
  element.querySelector('img').alt = indicators.header.name;
  return element;
};

var pinMain = document.querySelector('.map__pin--main');
var form = document.querySelector('.ad-form');
var address = document.querySelector('#address');
var formFieldsets = form.querySelectorAll('fieldset');

var disabledElement = function (collection) {
  for (var i = 0; i <= collection.length - 1; i++) {
    collection[i].setAttribute('disabled', true);
  }
};
disabledElement(formFieldsets);

var enabledElement = function (collection) {
  for (var i = 0; i < collection.length; i++) {
    collection[i].removeAttribute('disabled', true);
  }
};

var fragment = document.createDocumentFragment();
var createPins = function () {
  for (var i = 0; i < data.length; i++) {
    fragment.appendChild(createPin(data[i]));
  }
};
createPins();

var renderPins = function (node, elements) {
  node.appendChild(elements);
};

var selectType = document.querySelector('#type');
var selectPrice = document.querySelector('#price');
var getHousePrice = function () {
  switch (selectType.value) {
    case 'bungalo':
      return 0;
    case 'flat':
      return 1000;
    case 'house':
      return 5000;
    case 'palace':
      return 10000;
    default:
      return 1000;
  }
};

var minPrice = getHousePrice();
selectPrice.setAttribute('min', minPrice);
selectPrice.setAttribute('placeholder', minPrice);

selectType.addEventListener('change', function () {
  minPrice = getHousePrice();
  selectPrice.setAttribute('min', minPrice);
  selectPrice.setAttribute('placeholder', minPrice);
});

var timein = document.querySelector('#timein');
var timeout = document.querySelector('#timeout');

timein.addEventListener('change', function () {
  timeout.value = timein.value;
});

timeout.addEventListener('change', function () {
  timein.value = timeout.value;
});

address.value = parseInt(pinMain.style.left, 10) + ', ' + parseInt(pinMain.style.top, 10);

pinMain.addEventListener('mousedown', function (evt) {
  map.classList.remove('map--faded');
  form.classList.remove('ad-form--disabled');
  enabledElement(formFieldsets);
  renderPins(mapPins, fragment);

  var PIN_WIDTH = 65;
  var PIN_HEIGHT = 65;

  var startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  var onMouseMove = function (moveEvt) {
    var shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    pinMain.style.top = (pinMain.offsetTop - shift.y) + 'px';
    pinMain.style.left = (pinMain.offsetLeft - shift.x) + 'px';

    if ((pinMain.offsetLeft - shift.x) < 0) {
      pinMain.style.left = 0 + 'px';
    } else if ((pinMain.offsetLeft - shift.x) > mapPins.clientWidth - PIN_WIDTH) {
      pinMain.style.left = (mapPins.clientWidth - PIN_WIDTH) + 'px';
    }

    if ((pinMain.offsetTop - shift.y) < 130) {
      pinMain.style.top = 130 + 'px';
    } else if ((pinMain.offsetTop - shift.y) > 630) {
      pinMain.style.top = 630 + 'px';
    }

    var coordsAddres = {
      x: parseInt(pinMain.style.left, 10) + PIN_WIDTH / 2 - 0.5,
      y: parseInt(pinMain.style.top, 10) + PIN_HEIGHT
    };

    address.value = coordsAddres.x + ', ' + coordsAddres.y;
  };

  var onMouseUp = function () {
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };
  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});
