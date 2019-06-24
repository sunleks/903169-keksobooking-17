'use strict';
(function () {
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