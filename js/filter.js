'use strict';
(function () {
  var housingType = document.querySelector('#housing-type');

  var valueToAnotherValue = {
    house: 'house',
    flat: 'flat',
    palace: 'palace',
    bungalo: 'bungalo'
  };

  var removePins = function () {
    var mapPinsItems = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    mapPinsItems.forEach(function (it) {
      it.remove();
    });
  };

  var filterHousingType = function (data) {
    var newArr = data.slice().filter(function (it) {
      if (housingType.value === 'any') {
        return it.offer.type;
      }
      return it.offer.type === valueToAnotherValue[housingType.value];
    }).slice(0, 5);
    return newArr;
  };

  window.filter = function (data) {
    document.addEventListener('change', function () {
      removePins();
      var newArr = filterHousingType(data);

      for (var i = 0; i < newArr.length; i++) {
        window.mapPins.appendChild(window.createPin(newArr[i]));
      }
    });
  };

})();
