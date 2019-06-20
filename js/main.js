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
for (var i = 0; i < data.length; i++) {
  fragment.appendChild(createPin(data[i]));
}

var renderPins = function (node, elements) {
  node.appendChild(elements);
};

pinMain.addEventListener('click', function () {
  map.classList.remove('map--faded');
  form.classList.remove('ad-form--disabled');
  enabledElement(formFieldsets);
  renderPins(mapPins, fragment);
});

address.value = parseInt(pinMain.style.left, 10) + ', ' + parseInt(pinMain.style.top, 10);

pinMain.addEventListener('mouseup', function () {
  address.value = parseInt(pinMain.style.left, 10) + ', ' + parseInt(pinMain.style.top, 10);
});

var validType = document.querySelector('#type');
var validPrice = document.querySelector('#price');
var giveDataAttribute = function (value, min, placeholder) {
  if (validType.value === value) {
    validPrice.min = min;
    validPrice.placeholder = placeholder;
  }
};

giveDataAttribute('flat', 1000, 1000);

validType.addEventListener('change', function () {
  giveDataAttribute('bungalo', 0, 0);
  giveDataAttribute('flat', 1000, 1000);
  giveDataAttribute('house', 5000, 5000);
  giveDataAttribute('palace', 10000, 10000);
});

var timein = document.querySelector('#timein');
var timeout = document.querySelector('#timeout');
var giveDataTimein = function (value) {
  if (timein.value === value) {
    timeout.value = timein.value;
  }
};
var giveDataTimeout = function (value) {
  if (timeout.value === value) {
    timein.value = timeout.value;
  }
};

timein.addEventListener('change', function () {
  giveDataTimein('12:00');
  giveDataTimein('13:00');
  giveDataTimein('14:00');
});

timeout.addEventListener('change', function () {
  giveDataTimeout('12:00');
  giveDataTimeout('13:00');
  giveDataTimeout('14:00');
});
