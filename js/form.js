'use strict';
(function () {
  var CountRoom = {
    1: [1],
    2: [1, 2],
    3: [1, 2, 3],
    100: [0]
  };
  var form = document.querySelector('.ad-form');
  var formFieldsets = document.querySelector('.ad-form').querySelectorAll('fieldset');
  var formMapFilters = document.querySelector('.map__filters');

  var ESC = 27;

  var main = document.querySelector('main');
  var selectType = document.querySelector('#type');
  var selectPrice = document.querySelector('#price');
  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');
  var roomNumber = document.querySelector('#room_number');
  var capacityOption = document.querySelectorAll('#capacity option');
  var capacity = document.querySelector('#capacity');

  var HousePrice = {
    BUNGALO: 0,
    FLAT: 1000,
    HOUSE: 5000,
    PALACE: 10000,
    DEFAULT: 1000
  };

  var disabledElement = function (collection) {
    for (var i = 0; i <= collection.length - 1; i++) {
      collection[i].setAttribute('disabled', true);
    }
  };
  disabledElement(formFieldsets);
  disabledElement(formMapFilters);

  var enabledElement = function (collection) {
    for (var i = 0; i < collection.length; i++) {
      collection[i].removeAttribute('disabled', true);
    }
  };

  var getHousePrice = function () {
    switch (selectType.value) {
      case 'bungalo':
        return HousePrice.BUNGALO;
      case 'flat':
        return HousePrice.FLAT;
      case 'house':
        return HousePrice.HOUSE;
      case 'palace':
        return HousePrice.PALACE;
      default:
        return HousePrice.DEFAULT;
    }
  };

  var minPrice = getHousePrice();
  selectPrice.setAttribute('min', minPrice);
  selectPrice.setAttribute('placeholder', minPrice);

  selectType.addEventListener('change', function () {
    minPrice = getHousePrice();
    selectPrice.setAttribute('min', minPrice);
    selectPrice.setAttribute('placeholder', minPrice);
  });

  timeIn.addEventListener('change', function () {
    timeOut.value = timeIn.value;
  });

  timeOut.addEventListener('change', function () {
    timeIn.value = timeOut.value;
  });


  var setCapacityOption = function () {
    for (var i = 0; i < capacityOption.length; i++) {
      capacityOption[i].disabled = true;
      capacityOption[2].selected = true;
      capacityOption[2].disabled = false;
    }
  };
  setCapacityOption();

  var setDefaultParam = function () {
    selectPrice.min = HousePrice.FLAT;
    selectPrice.placeholder = HousePrice.FLAT;
    setCapacityOption();
  };

  roomNumber.addEventListener('change', function () {
    capacityOption.forEach(function (item) {
      item.disabled = true;
    });

    CountRoom[roomNumber.value].forEach(function (item) {
      capacity.querySelector('option' + '[value="' + item + '"]').disabled = false;
      capacity.value = item;
    });
  });

  var onSend = function (evt) {
    evt.preventDefault();
    document.querySelector('#address').disabled = false;
    window.data.upload(new FormData(form), function () {
      addBlockSuccess();
      window.map.deactivateForm();
    }, window.pin.error, window.data.URLPOST);
  };

  var addBlockSuccess = function () {
    var success = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
    main.appendChild(success);
    closeBlockSuccess();
  };

  var closeBlockSuccess = function () {
    var blockSuccess = document.querySelector('.success');

    var onCloseSuccess = function () {
      blockSuccess.remove();
      blockSuccess.removeEventListener('click', onCloseSuccess);
    };

    var onSuccessEsc = function (evt) {
      evt.preventDefault();
      if (evt.keyCode === ESC) {
        blockSuccess.remove();
      }
      document.removeEventListener('keydown', onSuccessEsc);
    };

    blockSuccess.addEventListener('click', onCloseSuccess);
    document.addEventListener('keydown', onSuccessEsc);
  };

  var buttonReset = document.querySelector('.ad-form__reset');
  buttonReset.addEventListener('click', function (evt) {
    evt.preventDefault();
    window.map.deactivateForm();
  });

  form.addEventListener('submit', onSend);

  window.forms = {
    elementForm: form,
    fieldsets: formFieldsets,
    mapFilters: formMapFilters,
    enabledElement: enabledElement,
    setDefaultParam: setDefaultParam
  };
})();
