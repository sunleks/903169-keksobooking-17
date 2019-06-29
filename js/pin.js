'use strict';
(function () {
  var createPin = function (indicators) {
    var pin = document.querySelector('#pin').content.querySelector('.map__pin');
    var element = pin.cloneNode(true);
    element.style.left = indicators.location.x + 'px';
    element.style.top = indicators.location.y + 'px';
    element.querySelector('img').src = indicators.author.avatar;
    element.querySelector('img').alt = indicators.offer.title;
    return element;
  };

  window.createPins = function (dataAjax) {
    for (var i = 0; i < dataAjax.length; i++) {
      window.mapPins.appendChild(createPin(dataAjax[i]));
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
