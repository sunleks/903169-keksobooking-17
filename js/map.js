'use strict';
(function () {
  var PIN_WIDTH = 65;
  var PIN_HEIGHT = 65;
  var pinMain = document.querySelector('.map__pin--main');
  var address = document.querySelector('#address');
  var active = false;

  var map = document.querySelector('.map');
  var mapPins = document.querySelector('.map__pins');

  var STARTCOORDS_VALUE = {
    x: 600,
    y: 375
  };

  var STARTCOORDS_PIN = {
    x: 570,
    y: 375
  };

  address.value = parseInt(pinMain.style.left, 10) + ', ' + parseInt(pinMain.style.top, 10);

  var activetePage = function (data) {
    window.dataCard = data;
    window.pin.renderPins(data);
    window.forms.enabledElement(window.forms.formMapFilters);
  };

  var activeteScreen = function () {
    map.classList.remove('map--faded');
    window.forms.form.classList.remove('ad-form--disabled');
    window.forms.enabledElement(window.forms.formFieldsets);
    pinMain.removeEventListener('mousedown', initializationApp);
  };

  var initializationApp = function () {
    if (!active) {
      activeteScreen();
      window.data.load(activetePage, window.pin.onErrorHandler, window.data.URLGET);

      active = true;
    }
  };

  address.value = STARTCOORDS_VALUE.x + ', ' + STARTCOORDS_VALUE.y;

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

  var deactivateForm = function () {
    window.forms.form.reset();
    window.forms.formFieldsets.forEach(function (it) {
      it.disabled = true;
    });

    setAddressCoords();
    window.forms.form.classList.add('ad-form--disabled');

    window.forms.formMapFilters.reset();
    window.filter.filter();
    checkCard();
    checkPins();
    pinMain.style.top = STARTCOORDS_PIN.y + 'px';
    pinMain.style.left = STARTCOORDS_PIN.x + 'px';

    map.classList.add('map--faded');
    Array.from(document.querySelector('.map__filters').children).filter(function (it) {
      it.disabled = true;
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
      Array.from(document.querySelectorAll('.map__pin:not(.map__pin--main)')).filter(function (it) {
        it.remove();
      });
    }
  };

  var setAddressCoords = function () {
    document.querySelector('#address').value = STARTCOORDS_VALUE.x + ', ' + STARTCOORDS_VALUE.y;
  };

  window.map = {
    mapPins: mapPins,
    deactivateForm: deactivateForm
  };
})();
