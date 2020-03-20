'use strict';

(function () {
  var ESCAPE = 'Escape';
  var DEBOUNCE_INTERVAL = 500;

  var lastTimeout;

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

  window.utils = {
    setElementsState: setElementsState,
    onEscPress: onEscPress,
    debounce: debounce
  };

})();
