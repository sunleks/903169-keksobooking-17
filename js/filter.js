'use strict';
(function () {
  var housingType = document.querySelector('#housing-type');
  var mapFilters = document.querySelector('.map__filters');
  var housingPrice = document.querySelector('#housing-price');
  var housingRoom = document.querySelector('#housing-rooms');
  var housingGuests = document.querySelector('#housing-guests');

  var housingFeatures = document.querySelectorAll('#housing-features input');
  var flag = -1;

  var PriceValue = {
    LOW: 10000,
    HIGH: 50000
  };

  var PinsNumber = {
    MIN: 0,
    MAX: 5
  };

  var removePins = function () {
    var mapPinsItems = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    mapPinsItems.forEach(function (item) {
      item.remove();
    });
  };

  var getHousingType = function (element) {
    return housingType.value === 'any' ? true : element.offer.type === housingType.value;
  };

  var getHousingPrice = function (element) {
    switch (housingPrice.value) {
      case 'middle':
        return element.offer.price >= PriceValue.LOW && element.offer.price <= PriceValue.HIGH;
      case 'low':
        return element.offer.price >= PriceValue.LOW;
      case 'high':
        return element.offer.price >= PriceValue.HIGH;
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
      return element.offer.features.indexOf(val) !== flag;
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

  var setFilter = function () {
    removePins();
    window.pin.render(getAllFilters(window.dataCard.slice(PinsNumber.MIN, PinsNumber.MAX)));
  };

  var onDebounce = window.debounce(function () {
    setFilter();
  });

  mapFilters.addEventListener('change', onDebounce);

  window.filter = {
    setFilter: setFilter,
    PinsNumber: PinsNumber
  };
})();
