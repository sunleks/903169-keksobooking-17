'use strict';
(function () {
  var URLGET = 'https://js.dump.academy/keksobooking/data';
  var URLPOST = 'https://js.dump.academy/keksobooking';
  var SERVERSTATUS = 200;
  var TIMEOUT = 5000;

  var MessageText = {
    ERROR_LOAD: 'Произошла неизвестная ошибка. Пожалуйста, обновите страницу.',
    ERROR_SERVER: 'Произошла ошибка соединения. Пожалуйста, обновите страницу.',
    ERROR_TIMEOUT: 'Сервер долго не отвечает. Пожалуйста, обновите страницу.'
  };

  var load = function (onSucces, onError, URL) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === SERVERSTATUS) {
        onSucces(xhr.response);
      } else {
        onError(MessageText.ERROR_LOAD);
      }
    });

    xhr.addEventListener('error', function () {
      onError(MessageText.ERROR_SERVER);
    });
    xhr.addEventListener('timeout', function () {
      onError(MessageText.ERROR_TIMEOUT);
    });

    xhr.timeout = TIMEOUT;

    xhr.open('GET', URL);
    xhr.send();
  };

  var upload = function (data, onSuccess, onError, URL) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {

      if (xhr.status === SERVERSTATUS) {
        onSuccess(xhr.response);
      } else {
        onError(MessageText.ERROR_LOAD);
      }
    });

    xhr.addEventListener('error', function () {
      onError(MessageText.ERROR_SERVER);
    });
    xhr.addEventListener('timeout', function () {
      onError(MessageText.ERROR_TIMEOUT);
    });

    xhr.open('POST', URL);
    xhr.send(data);
  };

  window.data = {
    URLGET: URLGET,
    URLPOST: URLPOST,
    load: load,
    upload: upload
  };
})();
