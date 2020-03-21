'use strict';

(function () {
  var ESCAPE = 'Escape';
  var DEBOUNCE_INTERVAL = 500;

  var lastTimeout;
  var mainSectionElement = document.querySelector('main');

  function setElementsState(formElement, formItemState) {
    Array.from(formElement.children).forEach(function (it) {
      it.disabled = !formItemState;
    });
  }

  function onEscPress(evt, evtFunction) {
    if (evt.key === ESCAPE) {
      evtFunction();
    }
  }

  function debounce(cb) {
    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }
    lastTimeout = window.setTimeout(cb, DEBOUNCE_INTERVAL);
  }

  function showTextMessage(errorMsg) {
    setElementsState(document.querySelector('.map__filters'), false);
    var errorElement = document.createElement('div');
    errorElement.style.width = '100%';
    errorElement.style.padding = '10px 0';
    errorElement.style.textAlign = 'center';
    errorElement.style.fontSize = '20px';
    errorElement.style.color = '#f44336';
    errorElement.style.backgroundColor = 'rgba(255, 255, 255, 0.6)';
    errorElement.textContent = errorMsg;
    document.querySelector('.map__filters').insertAdjacentElement('afterend', errorElement);
  }

  function showElementMessage(messageTemplate) {
    var messageElement = messageTemplate.cloneNode(true);
    addElementMessageListeners();
    var closeButtonElement = messageElement.querySelector('.error__button');
    if (closeButtonElement !== null) {
      closeButtonElement.addEventListener('click', onCloseButtonClick);
    }
    mainSectionElement.appendChild(messageElement);
  }

  function addElementMessageListeners() {
    document.addEventListener('keydown', onDocumentKeydown);
    document.addEventListener('click', onDocumentClick);
  }

  function closeElementMessage() {
    mainSectionElement.removeChild(mainSectionElement.lastChild);
    document.removeEventListener('keydown', onDocumentKeydown);
    document.removeEventListener('click', onDocumentClick);
  }

  function onDocumentKeydown(evt) {
    onEscPress(evt, closeElementMessage);
  }

  function onCloseButtonClick() {
    closeElementMessage();
  }

  function onDocumentClick() {
    closeElementMessage();
  }

  window.utils = {
    setElementsState: setElementsState,
    onEscPress: onEscPress,
    debounce: debounce,
    showElementMessage: showElementMessage,
    showTextMessage: showTextMessage
  };

})();
