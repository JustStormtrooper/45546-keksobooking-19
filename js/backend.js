'use strict';

(function () {
  var URL_LOAD = 'https://js.dump.academy/keksobooking/data';

  function load(onLoad) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = 10000;

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
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

  function showLoadErrorMessage(errorMsg) {
    window.form.setElementsState(document.querySelector('.map__filters'), false);
    var errorElement = document.createElement('div');
    errorElement.style = 'width:100%; padding: 10px 0; text-align: center;';
    errorElement.style.fontSize = '20px';
    errorElement.style.color = '#f44336';
    errorElement.style.backgroundColor = 'rgba(255, 255, 255, 0.6)';
    errorElement.textContent = errorMsg;
    document.querySelector('.map__pins').insertAdjacentElement('afterend', errorElement);
  }

  window.backend = {
    load: load
  };

})();
