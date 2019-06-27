'use strict';
(function () {
  window.pin = document.querySelector('#pin').content.querySelector('.map__pin');

  var createPin = function (indicators) {
    var element = window.pin.cloneNode(true);
    element.style.left = indicators.location.x + 'px';
    element.style.top = indicators.location.y + 'px';
    element.querySelector('img').src = indicators.author.avatar;
    element.querySelector('img').alt = indicators.header.name;
    return element;
  };

  window.fragment = document.createDocumentFragment();
  var createPins = function () {
    for (var i = 0; i < window.data.length; i++) {
      window.fragment.appendChild(createPin(window.data[i]));
    }
  };
  createPins();

  window.renderPins = function (node, elements) {
    node.appendChild(elements);
  };
})();
