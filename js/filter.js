'use strict';
(function () {
  var housingType = document.querySelector('#housing-type');
  var mapFilters = document.querySelector('.map__filters');
  var housingPrice = document.querySelector('#housing-price');
  var housingRoom = document.querySelector('#housing-rooms');
  var housingGuests = document.querySelector('#housing-guests');

  var housingFeatures = document.querySelectorAll('#housing-features input');

  window.removePins = function () {
    var mapPinsItems = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    mapPinsItems.forEach(function (it) {
      it.remove();
    });
  };

  var getHousingType = function (element) {
    return housingType.value === 'any' ? true : element.offer.type === housingType.value;
  };

  var getHousingPrice = function (element) {
    switch (housingPrice.value) {
      case 'middle':
        return element.offer.price >= 10000 && element.offer.price <= 50000;
      case 'low':
        return element.offer.price >= 10000;
      case 'high':
        return element.offer.price >= 50000;
      default:
        return true;
    }
  };

  var getHousingRooms = function (element) {
    return housingRoom.value === 'any' ? true : element.offer.rooms === parseInt(housingRoom.value, 10);
  };

  var getHousingGuest = function (element) {
    return housingGuests.value === 'any' ? true : element.offer.guests === parseInt(housingGuests.value, 10);
  };

  var getHousingFeatures = function (element) {
    var checkedFeaturesOptions = Array.from(housingFeatures).filter(function (el) {
      return el.checked;
    }).map(function (el) {
      return el.value;
    });
    return checkedFeaturesOptions.every(function (val) {
      return element.offer.features.indexOf(val) !== -1;
    });
  };

  var getAllFilters = function (data) {
    return data.filter(function (el) {
      return getHousingType(el) &&
             getHousingPrice(el) &&
             getHousingRooms(el) &&
             getHousingGuest(el) &&
             getHousingFeatures(el);
    });
  };

  window.filter = function () {
    window.removePins();
    window.renderPins(getAllFilters(window.dataCard));
  };

  var debounce = window.debounce(function () {
    window.filter();
  });

  mapFilters.addEventListener('change', debounce);
})();
