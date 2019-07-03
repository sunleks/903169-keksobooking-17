'use strict';
(function () {
  var pin = document.querySelector('#pin').content.querySelector('.map__pin');

  window.createPin = function (data) {
    var element = pin.cloneNode(true);
    element.style.left = data.location.x + 'px';
    element.style.top = data.location.y + 'px';
    element.querySelector('img').src = data.author.avatar;
    element.querySelector('img').alt = data.offer.title;

    return element;
  };

  window.createPins = function (indicators) {
    for (var i = 0; i < indicators.slice(0, 5).length; i++) {
      window.mapPins.appendChild(window.createPin(indicators[i]));
    }
    window.filter(indicators);
  };

  window.onErrorHandler = function () {
    var mainBlock = document.querySelector('main');
    var error = document.querySelector('#error').content;
    error.cloneNode(true);
    mainBlock.appendChild(error.cloneNode(true));

    var errorButton = document.querySelector('.error__button');

    errorButton.addEventListener('click', function () {
      mainBlock.removeChild(document.querySelector('.error'));
      document.removeEventListener('keydown', onErrorEsc);
    });

    var onErrorEsc = function (evt) {
      if (evt.keyCode === 27) {
        mainBlock.removeChild(document.querySelector('.error'));
      }
      document.removeEventListener('keydown', onErrorEsc);
    };
    document.addEventListener('keydown', onErrorEsc);
  };
})();
