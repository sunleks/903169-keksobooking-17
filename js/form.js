'use strict';
(function () {
window.forms = {
    form: document.querySelector('.ad-form'),
    formFieldsets: document.querySelector('.ad-form').querySelectorAll('fieldset')
};

var disabledElement = function (collection) {
  for (var i = 0; i <= collection.length - 1; i++) {
    collection[i].setAttribute('disabled', true);
  }
};
disabledElement(window.forms.formFieldsets);

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
})();