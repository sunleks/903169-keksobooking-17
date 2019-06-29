'use strict';
(function () {
  window.createPin = function (indicators) {
    var pin = document.querySelector('#pin').content.querySelector('.map__pin');
    for (var i = 0; i < indicators.length; i++) {
      var element = pin.cloneNode(true);
      element.style.left = indicators[i].location.x + 'px';
      element.style.top = indicators[i].location.y + 'px';
      element.querySelector('img').src = indicators[i].author.avatar;
      element.querySelector('img').alt = indicators[i].offer.title;

      window.mapPins.appendChild(element);
    }
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
