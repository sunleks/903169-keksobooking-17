'use strict';
(function () {
  window.housingType = document.querySelector('#housing-type');

  var valueToAnotherValue = {
    house: 'house',
    flat: 'flat',
    palace: 'palace',
    bungalo: 'bungalo'
  };

  window.removePins = function () {
    var mapPinsItems = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    mapPinsItems.forEach(function (it) {
      it.remove();
    });
  };

  window.filterHousingType = function (data) {
    var newArr = data.slice().filter(function (it) {
      if (window.housingType.value === 'any') {
        return it.offer.type;
      }
      return it.offer.type === valueToAnotherValue[window.housingType.value];
    }).slice(0, 5);
    return newArr;
  };
})();
