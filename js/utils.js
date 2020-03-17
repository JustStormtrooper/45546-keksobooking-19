'use strict';

(function () {
  var ESCAPE = 'Escape';

  function setElementsState(formElement, formItemState) {
    var formChildren = formElement.children;
    for (var i = 0; i < formChildren.length; i++) {
      formChildren[i].disabled = !formItemState;
    }
  }

  function onEscPress(evt, evtFunction) {
    if (evt.key === ESCAPE) {
      evtFunction();
    }
  }

  window.utils = {
    setElementsState: setElementsState,
    onEscPress: onEscPress
  };

})();
