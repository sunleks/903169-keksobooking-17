'use strict';
(function () {
  var pinMain = document.querySelector('.map__pin--main');
  var address = document.querySelector('#address');
  var active = false;

  address.value = parseInt(pinMain.style.left, 10) + ', ' + parseInt(pinMain.style.top, 10);

  var map = document.querySelector('.map');
  window.mapPins = document.querySelector('.map__pins');

  var activePage = function (data) {
    window.dataCard = data;
    window.renderPins(data);
    window.enabledElement(window.forms.formMapFilters);
  };

  var activeScreen = function () {
    map.classList.remove('map--faded');
    window.forms.form.classList.remove('ad-form--disabled');
    window.enabledElement(window.forms.formFieldsets);
    pinMain.removeEventListener('mousedown', initializationApp);
  };

  var initializationApp = function () {
    if (!active) {
      activeScreen();
      window.load(activePage, window.onErrorHandler, window.URLGET);

      active = true;
    }
  };

  // pinMain.addEventListener('mousedown', initializationApp);

  address.value = 600 + ', ' + 375;

  pinMain.addEventListener('mousedown', function (evt) {

    initializationApp();

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
      } else if ((pinMain.offsetLeft - shift.x) > window.mapPins.clientWidth - PIN_WIDTH) {
        pinMain.style.left = (window.mapPins.clientWidth - PIN_WIDTH) + 'px';
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

  window.deactivateForm = function () {
    window.forms.form.reset();
    window.forms.formFieldsets.forEach(function (it) {
      it.disabled = true;
    });

    setAddressCoords();
    window.forms.form.classList.add('ad-form--disabled');

    window.forms.formMapFilters.reset();
    window.filter();
    checkCard();
    checkPins();
    pinMain.style.top = 375 + 'px';
    pinMain.style.left = 570 + 'px';

    document.querySelector('.map').classList.add('map--faded');
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
    document.querySelector('#address').value = 600 + ', ' + 375;
  };
})();
