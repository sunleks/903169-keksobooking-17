'use strict';
(function () {
  var pinMain = document.querySelector('.map__pin--main');
  var address = document.querySelector('#address');

  address.value = parseInt(pinMain.style.left, 10) + ', ' + parseInt(pinMain.style.top, 10);

  var map = document.querySelector('.map');
  window.mapPins = document.querySelector('.map__pins');

  var activePage = function (data) {
    window.dataCard = data;
    window.renderPins(data);
  };

  var activeScreen = function () {
    map.classList.remove('map--faded');
    window.forms.form.classList.remove('ad-form--disabled');
    window.enabledElement(window.forms.formFieldsets);
    window.enabledElement(window.forms.formMapFilters);
    pinMain.removeEventListener('mousedown', initializationApp);
  };

  var initializationApp = function () {
    activeScreen();
    window.load(activePage, window.onErrorHandler);
  };

  pinMain.addEventListener('mousedown', initializationApp);

  pinMain.addEventListener('mousedown', function (evt) {

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
})();
