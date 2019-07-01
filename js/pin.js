'use strict';
(function () {
  window.createPin = function (indicators) {
    var pin = document.querySelector('#pin').content.querySelector('.map__pin');
    var housingType = document.querySelector('#housing-type');

    var valueToAnotherValue = {
      house: 'house',
      flat: 'flat', 
      palace: 'palace', 
      bungalo: 'bungalo',
      any: 'any'
    };

    housingType.addEventListener('change', function () {
      console.log(housingType.value);

      var newArr = indicators.filter(function (it) {
        return it.offer.type === valueToAnotherValue[housingType.value];
      }).slice(0,5);

      for (var i = 0; i < newArr.length; i++) {
        var element = pin.cloneNode(true);
        element.style.left = newArr[i].location.x + 'px';
        element.style.top = newArr[i].location.y + 'px';
        element.querySelector('img').src = newArr[i].author.avatar;
        element.querySelector('img').alt = newArr[i].offer.title;
        
        window.mapPins.appendChild(element);
      }
    })
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
