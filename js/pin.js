'use strict';
(function () {
  window.createPin = function (indicators) {
    var pin = document.querySelector('#pin').content.querySelector('.map__pin');

    var addPins = function (data) {
      var newData = data.slice(0, 5);
      for (var i = 0; i < newData.length; i++) {
        var element = pin.cloneNode(true);
        element.style.left = newData[i].location.x + 'px';
        element.style.top = newData[i].location.y + 'px';
        element.querySelector('img').src = newData[i].author.avatar;
        element.querySelector('img').alt = newData[i].offer.title;

        window.mapPins.appendChild(element);
      }
    };
    addPins(indicators);

    document.addEventListener('change', function () {
      window.removePins();
      var newArr = window.filterHousingType(indicators);

      addPins(newArr);
    });
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
