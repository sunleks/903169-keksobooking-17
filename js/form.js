'use strict';
(function () {
  window.forms = {
    form: document.querySelector('.ad-form'),
    formFieldsets: document.querySelector('.ad-form').querySelectorAll('fieldset'),
    formMapFilters: document.querySelector('.map__filters')
  };

  var main = document.querySelector('main');

  var disabledElement = function (collection) {
    for (var i = 0; i <= collection.length - 1; i++) {
      collection[i].setAttribute('disabled', true);
    }
  };
  disabledElement(window.forms.formFieldsets);
  disabledElement(window.forms.formMapFilters);

  window.enabledElement = function (collection) {
    for (var i = 0; i < collection.length; i++) {
      collection[i].removeAttribute('disabled', true);
    }
  };

  var selectType = document.querySelector('#type');
  var selectPrice = document.querySelector('#price');
  var getHousePrice = function () {
    switch (selectType.value) {
      case 'bungalo':
        return 0;
      case 'flat':
        return 1000;
      case 'house':
        return 5000;
      case 'palace':
        return 10000;
      default:
        return 1000;
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

  var timein = document.querySelector('#timein');
  var timeout = document.querySelector('#timeout');

  timein.addEventListener('change', function () {
    timeout.value = timein.value;
  });

  timeout.addEventListener('change', function () {
    timein.value = timeout.value;
  });

  var roomNumber = document.querySelector('#room_number');
  var capacityOption = document.querySelectorAll('#capacity option');
  var capacity = document.querySelector('#capacity');

  roomNumber.addEventListener('change', function () {
    capacityOption.forEach(function (it) {
      it.disabled = true;
    });

    countRoom[roomNumber.value].forEach(function (it) {
      capacity.querySelector('option' + '[value="' + it + '"]').disabled = false;
      capacity.value = it;
    });
  });

  var countRoom = {
    1: [1],
    2: [1, 2],
    3: [1, 2, 3],
    100: [0]
  };

  var buttonSubmit = document.querySelector('.ad-form');

  var send = function (evt) {
    evt.preventDefault();
    if (document.querySelector('#address')) {
      document.querySelector('#address').disabled = false;
    }
    window.upload(new FormData(buttonSubmit), function () {
      addBlockSuccess();
      window.deactivateForm();
    }, window.onErrorHandler, window.URLPOST);
  };

  var addBlockSuccess = function () {
    var success = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
    main.appendChild(success);
    closeBlockSuccess();
  };

  var closeBlockSuccess = function () {
    var blockSuccess = document.querySelector('.success');

    var does = function () {
      blockSuccess.remove();
      blockSuccess.removeEventListener('click', does);
    };

    var onSuccessEsc = function (evt) {
      evt.preventDefault();
      if (evt.keyCode === 27) {
        blockSuccess.remove();
      }
      document.removeEventListener('keydown', onSuccessEsc);
    };

    blockSuccess.addEventListener('click', does);
    document.addEventListener('keydown', onSuccessEsc);
  };

  var buttonReset = document.querySelector('.ad-form__reset');
  buttonReset.addEventListener('click', function (evt) {
    evt.preventDefault();
    window.deactivateForm();
  });

  buttonSubmit.addEventListener('submit', send);
})();
