'use strict';
(function () {
  var housingType = document.querySelector('#housing-type');
  var mapFilters = document.querySelector('.map__filters');
  var housingPrice = document.querySelector('#housing-price');
  var housingRoom = document.querySelector('#housing-rooms');
  var housingGuests = document.querySelector('#housing-guests');

  var housingFeatures = document.querySelector('#housing-features');

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

  var filterCards = function (data) {
    var newArr = data.filter(function (it) {
      if (housingType.value === 'any') {
        return it.offer.type;
      }
      return it.offer.type === valueToAnotherValue[housingType.value];
    })
    .filter(function (it) {
      if (housingPrice.value === 'any') {
        return it.offer.price;
      } else
      if (housingPrice.value === 'middle') {
        return it.offer.price >= 10000 && it.offer.price <= 50000;
      } else
      if (housingPrice.value === 'low') {
        return it.offer.price <= 10000;
      } else
      if (housingPrice.value === 'high') {
        return it.offer.price >= 50000;
      }
      return it;
    })
    .filter(function (it) {
      if (housingRoom.value === 'any') {
        return it.offer.rooms || it.offer.rooms === 0;
      } else
      if (housingRoom.value === '1') {
        return it.offer.rooms === 1;
      } else
      if (housingRoom.value === '2') {
        return it.offer.rooms === 2;
      } else
      if (housingRoom.value === '3') {
        return it.offer.rooms === 3;
      }
      return it;
    })
    .filter(function (it) {
      if (housingGuests.value === 'any') {
        return it.offer.guests || it.offer.guests === 0;
      } else
      if (housingGuests.value === '1') {
        return it.offer.guests === 1;
      } else
      if (housingGuests.value === '2') {
        return it.offer.guests === 2;
      } else
      if (housingGuests.value === '0') {
        return it.offer.guests === 0;
      }
      return it;
    })
    .filter(function (it) {
      var inputChecked = housingFeatures.querySelectorAll('input:checked');
      return Array.from(inputChecked).every(function (item) {
        return it.offer.features.includes(item.value);
      });
    });
    return newArr.slice(0, 5);
  };

  window.filter = function () {
    removePins();
    window.renderPins(filterCards(window.dataCard));
  };

  mapFilters.addEventListener('change', window.filter);
})();
