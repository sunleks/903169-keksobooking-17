'use strict';
(function () {
  window.createPin = function (indicators) {
    var pin = document.querySelector('#pin').content.querySelector('.map__pin');
    var housingType = document.querySelector('#housing-type');

    var valueToAnotherValue = {
      house: 'house',
      flat: 'flat', 
      palace: 'palace', 
      bungalo: 'bungalo'
    };


    for (var i = 0; i < indicators.slice(0, 5).length; i++) {
      var element = pin.cloneNode(true);
      element.style.left = indicators[i].location.x + 'px';
      element.style.top = indicators[i].location.y + 'px';
      element.querySelector('img').src = indicators[i].author.avatar;
      element.querySelector('img').alt = indicators[i].offer.title;
      
      window.mapPins.appendChild(element);
    }
    

    housingType.addEventListener('change', function () {
      removePins();
      var newArr = indicators.slice().filter(function (it) {
        if (housingType.value === 'any') {
          return it.offer.type;
        };
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

  var removePins = function () {
    var mapPinsItems = document.querySelectorAll('.map__pins button');
    mapPinsItems.forEach(function (it) {
      it.remove();
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
