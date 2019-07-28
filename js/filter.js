'use strict';
(function () {
  var housingType = document.querySelector('#housing-type');
  var mapFilters = document.querySelector('.map__filters');
  var housingPrice = document.querySelector('#housing-price');
  var housingRoom = document.querySelector('#housing-rooms');
  var housingGuests = document.querySelector('#housing-guests');

  var housingFeatures = document.querySelectorAll('#housing-features input');

  var PRICEVALUE = {
    low: 10000,
    high: 50000
  };

  var removePins = function () {
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
        return element.offer.price >= PRICEVALUE.low && element.offer.price <= PRICEVALUE.high;
      case 'low':
        return element.offer.price >= PRICEVALUE.low;
      case 'high':
        return element.offer.price >= PRICEVALUE.high;
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

  var filter = function () {
    removePins();
    window.pin.renderPins(getAllFilters(window.dataCard));
  };

  var debounceHandler = window.debounce(function () {
    filter();
  });

  mapFilters.addEventListener('change', debounceHandler);

  window.filter = {
    filter: filter
  };
})();
