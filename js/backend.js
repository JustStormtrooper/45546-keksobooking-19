'use strict';

(function () {
  var URL_LOAD = 'https://js.dump.academy/keksobooking/data';
  var URL_SAVE = 'https://js.dump.academy/keksobooking';
  var TIMEOUT_MS = 10000;
  var XHR_OK_STATUS = 200;

  var successMsgTemplate = document.querySelector('#success').content.querySelector('.success');
  var errorMsgTemplate = document.querySelector('#error').content.querySelector('.error');
  var mainSectionElement = document.querySelector('main');


  function load(onLoad) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = TIMEOUT_MS;

    xhr.addEventListener('load', function () {
      if (xhr.status === XHR_OK_STATUS) {
        onLoad(xhr.response);
      } else {
        showLoadErrorMessage('Не удалось загрузить объявления (статус ответа: ' + xhr.status + ').');
      }
    });

    xhr.addEventListener('error', function () {
      showLoadErrorMessage('Не удалось загрузить объявления. Пожалуйста, проверьте подключение к сети.');
    });

    xhr.addEventListener('timeout', function () {
      showLoadErrorMessage('Не удалось загрузить объявления. Превышено время ожидания. Пожалуйста, проверьте скорость интернет соединения.');
    });

    xhr.open('GET', URL_LOAD);
    xhr.send();
  }

  function save(data, onLoad) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = TIMEOUT_MS;

    xhr.addEventListener('load', function () {
      if (xhr.status === XHR_OK_STATUS) {
        onLoad(xhr.response);
        showSaveMessage(successMsgTemplate);
      } else {
        showSaveMessage(errorMsgTemplate);
      }
    });

    xhr.addEventListener('error', function () {
      showSaveMessage(errorMsgTemplate);
    });

    xhr.addEventListener('timeout', function () {
      showSaveMessage(errorMsgTemplate);
    });

    xhr.open('POST', URL_SAVE);
    xhr.send(data);
  }

  function showLoadErrorMessage(errorMsg) {
    window.utils.setElementsState(document.querySelector('.map__filters'), false);
    var errorElement = document.createElement('div');
    errorElement.style = 'width:100%; padding: 10px 0; text-align: center;';
    errorElement.style.fontSize = '20px';
    errorElement.style.color = '#f44336';
    errorElement.style.backgroundColor = 'rgba(255, 255, 255, 0.6)';
    errorElement.textContent = errorMsg;
    document.querySelector('.map__filters').insertAdjacentElement('afterend', errorElement);
  }

  function showSaveMessage(messageTemplate) {
    var messageElement = messageTemplate.cloneNode(true);
    addSaveMessageListeners();
    var closeButtonElement = messageElement.querySelector('.error__button');
    if (closeButtonElement !== null) {
      closeButtonElement.addEventListener('click', closeSaveMessage);
    }
    mainSectionElement.appendChild(messageElement);
  }

  function addSaveMessageListeners() {
    document.addEventListener('keydown', onEscCloseSaveMessage);
    document.addEventListener('click', closeSaveMessage);
  }

  function closeSaveMessage() {
    mainSectionElement.removeChild(mainSectionElement.lastChild);
    document.removeEventListener('keydown', onEscCloseSaveMessage);
    document.removeEventListener('click', closeSaveMessage);
  }

  function onEscCloseSaveMessage(evt) {
    window.utils.onEscPress(evt, closeSaveMessage);
  }

  window.backend = {
    load: load,
    save: save
  };

})();
