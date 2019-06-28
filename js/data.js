'use strict';
(function () {
  var URL = 'https://js.dump.academy/keksobooking/data';

  window.load = function (onSucces, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType= 'json';

    xhr.addEventListener ('load', function () {
      if (xhr.status === 200) {
        onSucces(xhr.response);
      } else {
        onError();
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.open('GET', URL);
    xhr.send();
  }
})();
