'use strict';

(function () {
  var URL_LOAD = 'https://js.dump.academy/keksobooking/data';
  var URL_SAVE = 'https://js.dump.academy/keksobooking';
  var METHOD_LOAD = 'GET';
  var METHOD_SAVE = 'POST';
  var TIMEOUT_MS = 10000;
  var XHR_OK_STATUS = 200;
  var RESPONSE_TYPE = 'json';
  var LOAD_ERROR_MESSAGE = 'Не удалось загрузить объявления. Попробуйте перезагрузить страницу.';

  var errorMsgTemplate = document.querySelector('#error').content.querySelector('.error');

  function load(onSuccess) {
    var xhr = createRequest(METHOD_LOAD, URL_LOAD, onSuccess, window.utils.showTextMessage, LOAD_ERROR_MESSAGE);
    xhr.send();
  }

  function save(data, onSuccess) {
    var xhr = createRequest(METHOD_SAVE, URL_SAVE, onSuccess, window.utils.showElementMessage, errorMsgTemplate);
    xhr.send(data);
  }

  function createRequest(method, url, onSuccess, onError, errorMessage) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = RESPONSE_TYPE;
    xhr.timeout = TIMEOUT_MS;

    xhr.addEventListener('load', function () {
      if (xhr.status === XHR_OK_STATUS) {
        onSuccess(xhr.response);
      } else {
        onError(errorMessage);
      }
    });

    xhr.addEventListener('error', function () {
      onError(errorMessage);
    });

    xhr.addEventListener('timeout', function () {
      onError(errorMessage);
    });

    xhr.open(method, url);
    return xhr;
  }

  window.backend = {
    load: load,
    save: save
  };

})();
