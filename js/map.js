'use strict';
(function () {
  var PIN_WIDTH = 65;
  var PIN_HEIGHT = 80;
  var PIN_WIDTH_REAL = PIN_WIDTH / 2 - 0.5;
  var pinMain = document.querySelector('.map__pin--main');
  var address = document.querySelector('#address');
  var active = false;

  var map = document.querySelector('.map');
  var mapPins = document.querySelector('.map__pins');

  var StartCoordsValue = {
    X: 600,
    Y: 375
  };

  var StartCoordsPin = {
    X: 570,
    Y: 375
  };

  var PageCoords = {
    MIN_X: 0,
    MIN_Y: 50,
    MAX_Y: 550,
    MAX_X: mapPins.clientWidth - PIN_WIDTH
  };

  address.value = parseInt(pinMain.style.left, 10) + ', ' + parseInt(pinMain.style.top, 10);

  var activetePage = function (data) {
    window.dataCard = data;
    window.pin.render(data.slice(window.filter.PinsNumber.MIN, window.filter.PinsNumber.MAX));
    window.forms.enabledElement(window.forms.mapFilters);
  };

  var activeteScreen = function () {
    map.classList.remove('map--faded');
    window.forms.elementForm.classList.remove('ad-form--disabled');
    window.forms.enabledElement(window.forms.fieldsets);
  };

  var initializationApp = function () {
    if (!active) {
      activeteScreen();
      window.data.load(activetePage, window.pin.error, window.data.URLGET);

      active = true;
    }
  };

  address.value = StartCoordsValue.X + ', ' + StartCoordsValue.Y;

  pinMain.addEventListener('mousedown', function (evt) {

    initializationApp();

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

      if ((pinMain.offsetLeft - shift.x) < PageCoords.MIN_X) {
        pinMain.style.left = PageCoords.MIN_X + 'px';
      } else if ((pinMain.offsetLeft - shift.x) > PageCoords.MAX_X) {
        pinMain.style.left = (PageCoords.MAX_X) + 'px';
      }

      if ((pinMain.offsetTop - shift.y) < PageCoords.MIN_Y) {
        pinMain.style.top = PageCoords.MIN_Y + 'px';
      } else if ((pinMain.offsetTop - shift.y) > PageCoords.MAX_Y) {
        pinMain.style.top = PageCoords.MAX_Y + 'px';
      }

      var coordsAddres = {
        x: parseInt(pinMain.style.left, 10) + PIN_WIDTH_REAL,
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

  var deactivateForm = function () {
    document.querySelector('#address').disabled = true;
    window.forms.elementForm.reset();
    window.forms.fieldsets.forEach(function (item) {
      item.disabled = true;
    });

    setAddressCoords();
    window.forms.elementForm.classList.add('ad-form--disabled');

    window.forms.mapFilters.reset();
    window.forms.setDefaultParam();
    window.filter.setFilter();
    checkCard();
    checkPins();
    pinMain.style.top = StartCoordsPin.Y + 'px';
    pinMain.style.left = StartCoordsPin.X + 'px';

    map.classList.add('map--faded');
    Array.from(document.querySelector('.map__filters').children).filter(function (item) {
      item.disabled = true;
    });
    active = false;
  };

  var checkCard = function () {
    if (document.querySelector('.map__card')) {
      document.querySelector('.map__card').remove();
    }
  };

  var checkPins = function () {
    if (document.querySelectorAll('.map__pin:not(.map__pin--main)')) {
      Array.from(document.querySelectorAll('.map__pin:not(.map__pin--main)')).filter(function (item) {
        item.remove();
      });
    }
  };

  var setAddressCoords = function () {
    document.querySelector('#address').value = StartCoordsValue.X + ', ' + StartCoordsValue.Y;
  };

  window.map = {
    elements: mapPins,
    deactivateForm: deactivateForm
  };
})();
